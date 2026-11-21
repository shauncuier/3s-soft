<?php
/**
 * Receives the audit and contact forms and emails them to the team through the site's own SMTP mailbox.
 * Settings (SMTP host, user, password, recipients) live in ~/config/lead-mailer.php, outside the public folder.
 * Answers JSON for the site script, or a plain thank-you page when the browser posted the form without JavaScript.
 */
declare(strict_types=1);
define('LEAD_MAILER', true);
require __DIR__ . '/lead-lib.php';

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function lead_reply(bool $json, int $status, array $payload): void
{
    http_response_code($status);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $ok = !empty($payload['ok']);
    $title = $ok ? 'Thanks, we have your request.' : 'We couldn’t send your request.';
    $text = $ok
        ? 'We will reply by email. If it is urgent, message us on WhatsApp: +880 1835 927634.'
        : 'Please go back, check the form and try again, or email info@3s-soft.com.';
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>3s-Soft</title></head>'
        . '<body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.6">'
        . '<h1>' . htmlspecialchars($title) . '</h1><p>' . htmlspecialchars($text) . '</p><p><a href="/">Back to 3s-soft.com</a></p></body></html>';
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    lead_reply($wantsJson, 405, ['ok' => false, 'error' => 'POST only']);
}

$configFile = getenv('LEAD_MAILER_CONFIG') ?: dirname(__DIR__, 2) . '/config/lead-mailer.php';
if (!is_file($configFile)) {
    error_log('lead.php: missing config ' . $configFile);
    lead_reply($wantsJson, 500, ['ok' => false, 'error' => 'Mail is not set up']);
}
$cfg = require $configFile;
$password = (string) ($cfg['password'] ?? '');
if ($password === '' || strpos($password, 'PUT-THE-') === 0) {
    error_log('lead.php: SMTP password not set in ' . $configFile);
    lead_reply($wantsJson, 500, ['ok' => false, 'error' => 'Mail is not set up']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, (array) ($cfg['allowed_origins'] ?? []), true)) {
    lead_reply($wantsJson, 403, ['ok' => false, 'error' => 'Forbidden']);
}

$ip = (!empty($cfg['trust_test_ip_header']) && !empty($_SERVER['HTTP_X_TEST_IP'])) ? (string) $_SERVER['HTTP_X_TEST_IP'] : (string) ($_SERVER['REMOTE_ADDR'] ?? '');
$kind = ($_POST['form_type'] ?? '') === 'contact' ? 'contact' : 'audit';

// Bots fill the hidden field: answer as if it worked, send nothing.
if (trim((string) ($_POST['company_website'] ?? '')) !== '') lead_reply($wantsJson, 200, ['ok' => true]);

$errors = lead_validate($kind, $_POST);
if ($errors) lead_reply($wantsJson, 422, ['ok' => false, 'errors' => $errors]);

if (!lead_rate_ok($cfg, $ip)) lead_reply($wantsJson, 429, ['ok' => false, 'error' => 'Too many requests. Please try again in a few minutes.']);

[$subject, $body] = lead_message($kind, $_POST, $ip);
try {
    smtp_send($cfg, lead_field($_POST, 'email'), $subject, $body);
} catch (Throwable $e) {
    error_log('lead.php: ' . $e->getMessage());
    lead_reply($wantsJson, 502, ['ok' => false, 'error' => 'Could not send']);
}
lead_reply($wantsJson, 200, ['ok' => true]);
