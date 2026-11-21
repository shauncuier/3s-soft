<?php
/**
 * Helpers for lead.php: validation, the email text and a small SMTP client.
 * PHP 7.4+. Not a page: opening this file directly returns 404.
 */
if (!defined('LEAD_MAILER')) {
    http_response_code(404);
    exit;
}

const LEAD_LIMITS = ['storeUrl' => 500, 'marketplace' => 40, 'email' => 200, 'whatsapp' => 40, 'name' => 120, 'service' => 120, 'message' => 5000];
const LEAD_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** One field from the POST body: trimmed, length-capped, control characters removed (newlines kept only for the message). */
function lead_field(array $post, string $name): string
{
    $value = isset($post[$name]) && is_string($post[$name]) ? $post[$name] : '';
    $value = trim($value);
    $value = $name === 'message'
        ? preg_replace('/[^\P{C}\n\t]/u', '', str_replace("\r\n", "\n", $value))
        : preg_replace('/\p{C}/u', ' ', $value);
    $max = LEAD_LIMITS[$name] ?? 200;
    return mb_substr((string) $value, 0, $max);
}

function lead_is_url(string $value): bool
{
    $parts = parse_url($value);
    return $parts !== false && isset($parts['scheme'], $parts['host']) && in_array(strtolower($parts['scheme']), ['http', 'https'], true);
}

/** Same rules as src/lib/lead.ts. The raw email is checked before cleaning so a CR/LF in it is rejected, not silently fixed. */
function lead_validate(string $kind, array $post): array
{
    $errors = [];
    if ($kind === 'audit') {
        if (!lead_is_url(lead_field($post, 'storeUrl'))) $errors['storeUrl'] = 'Enter a full link to your store or a listing, starting with https://';
        if (lead_field($post, 'marketplace') === '') $errors['marketplace'] = 'Choose the marketplace you sell on.';
    } else {
        if (lead_field($post, 'name') === '') $errors['name'] = 'Enter your name.';
        if (mb_strlen(lead_field($post, 'message')) < 10) $errors['message'] = 'Tell us a little about what you need (at least 10 characters).';
    }
    $rawEmail = isset($post['email']) && is_string($post['email']) ? trim($post['email']) : '';
    if (!filter_var($rawEmail, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $rawEmail)) $errors['email'] = 'Enter a full email address, like name@shop.com.';
    return $errors;
}

/** Subject and plain-text body for the team inbox. */
function lead_message(string $kind, array $post, string $ip): array
{
    $subject = $kind === 'audit' ? 'Free listing audit request (3s-soft.com)' : 'New enquiry (3s-soft.com)';
    $labels = $kind === 'audit'
        ? ['storeUrl' => 'Store or listing URL', 'marketplace' => 'Marketplace', 'email' => 'Email', 'whatsapp' => 'WhatsApp']
        : ['name' => 'Name', 'email' => 'Email', 'whatsapp' => 'WhatsApp', 'service' => 'Service', 'message' => 'Message'];
    $lines = [];
    foreach ($labels as $key => $label) {
        $value = lead_field($post, $key);
        if ($value === '') continue;
        $lines[] = $key === 'message' ? "$label:\n$value" : "$label: $value";
    }
    if ($kind === 'audit') $lines[] = 'Products to audit: 5';
    $utm = [];
    foreach (LEAD_UTM as $key) {
        $value = lead_field($post, $key);
        if ($value !== '') $utm[] = "$key: $value";
    }
    if ($utm) $lines[] = "\nCampaign\n" . implode("\n", $utm);
    $lines[] = "\nSent from the " . ($kind === 'audit' ? 'free audit' : 'contact') . ' form on 3s-soft.com, ' . gmdate('Y-m-d H:i') . " UTC, IP $ip.";
    return [$subject, implode("\n", $lines)];
}

/** File-based rate limit per IP. Returns false when the address has used up its sends in the window. */
function lead_rate_ok(array $cfg, string $ip): bool
{
    $dir = $cfg['rate_dir'] ?? sys_get_temp_dir() . '/3s-lead-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return true; // never block real leads because of a storage problem
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $now = time();
    $window = (int) ($cfg['rate_window'] ?? 600);
    $hits = is_file($file) ? (json_decode((string) @file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($hits, function ($t) use ($now, $window) { return is_int($t) && $t > $now - $window; }));
    if (count($hits) >= (int) ($cfg['rate_max'] ?? 5)) return false;
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return true;
}

function lead_header_value(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

/** Sends one plain-text email over SMTP (SSL on 465, STARTTLS on 587, or plain for local tests). Throws on any failure. */
function smtp_send(array $cfg, string $replyTo, string $subject, string $body): void
{
    $secure = $cfg['secure'] ?? 'ssl';
    $host = $cfg['host'];
    $port = (int) $cfg['port'];
    $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host]]);
    $sock = @stream_socket_client($remote, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$sock) throw new RuntimeException("SMTP connect failed: $errstr");
    stream_set_timeout($sock, 15);

    $read = function () use ($sock): string {
        $data = '';
        while (($line = fgets($sock, 1024)) !== false) {
            $data .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $data;
    };
    // $step names the step for error messages. The line sent is never logged: during AUTH it holds
    // the encoded username and password.
    $cmd = function (string $line, array $ok, string $step) use ($sock, $read): string {
        if ($line !== '') fwrite($sock, $line . "\r\n");
        $reply = $read();
        if (!in_array((int) substr($reply, 0, 3), $ok, true)) throw new RuntimeException("SMTP error at $step: " . trim($reply));
        return $reply;
    };

    $self = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $cmd('', [220], 'greeting');
    $cmd("EHLO $self", [250], 'EHLO');
    if ($secure === 'starttls') {
        $cmd('STARTTLS', [220], 'STARTTLS');
        if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) throw new RuntimeException('STARTTLS failed');
        $cmd("EHLO $self", [250], 'EHLO after STARTTLS');
    }
    $cmd('AUTH LOGIN', [334], 'AUTH LOGIN');
    $cmd(base64_encode($cfg['username']), [334], 'AUTH username');
    $cmd(base64_encode($cfg['password']), [235], 'AUTH password');
    $from = $cfg['from_email'];
    $cmd("MAIL FROM:<$from>", [250], 'MAIL FROM');
    foreach ((array) $cfg['to'] as $to) $cmd('RCPT TO:<' . lead_header_value($to) . '>', [250, 251], 'RCPT TO');
    $cmd('DATA', [354], 'DATA');

    $domain = substr(strrchr($from, '@'), 1);
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . '=?UTF-8?B?' . base64_encode($cfg['from_name'] ?? '3s-Soft website') . "?= <$from>",
        'To: ' . implode(', ', array_map('lead_header_value', (array) $cfg['to'])),
        'Reply-To: ' . lead_header_value($replyTo),
        'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
        'Message-ID: <' . bin2hex(random_bytes(12)) . "@$domain>",
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    $message = implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($body), 76, "\r\n"));
    // A line that is only "." would end DATA early: dot-stuff it (base64 never produces one, but stay safe).
    $message = preg_replace('/^\./m', '..', $message);
    fwrite($sock, $message . "\r\n");
    $cmd('.', [250], 'end of message');
    @fwrite($sock, "QUIT\r\n");
    fclose($sock);
}
