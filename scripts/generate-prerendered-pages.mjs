import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultImage, getSeoRoutes, siteName } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");
const templatePath = join(distDir, "index.html");
const template = readFileSync(templatePath, "utf8");
const routes = getSeoRoutes();

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function outputPathForRoute(routePath) {
  if (routePath === "/") {
    return templatePath;
  }

  return join(distDir, routePath.replace(/^\/+|\/+$/g, ""), "index.html");
}

function injectHead(templateHtml, route) {
  let html = templateHtml;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const keywords = escapeHtml(route.keywords || "");
  const canonical = escapeHtml(route.canonical);
  const robots = escapeHtml(route.robots || "index, follow");
  const googleBot = escapeHtml(route.googleBot || route.robots || "index, follow");
  const bingBot = escapeHtml(route.bingBot || route.robots || "index, follow");
  const image = escapeHtml(route.image || defaultImage);
  const type = escapeHtml(route.type || "website");
  const structuredData = (route.schema || [])
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join("\n");

  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/<meta name="title"[^>]*>/, `<meta name="title" content="${title}" />`],
    [/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`],
    [/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${keywords}" />`],
    [/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`],
    [/<meta name="googlebot"[^>]*>/, `<meta name="googlebot" content="${googleBot}" />`],
    [/<meta name="bingbot"[^>]*>/, `<meta name="bingbot" content="${bingBot}" />`],
    [/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`],
    [/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`],
    [/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`],
    [/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`],
    [/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`],
    [/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`],
    [/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${canonical}" />`],
    [/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}" />`],
    [/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}" />`],
    [/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}" />`],
  ];

  for (const [pattern, replacement] of replacements) {
    html = html.replace(pattern, replacement);
  }

  return html.replace(
    /<\/head>/,
    `  <meta property="og:site_name" content="${siteName}" />\n  ${structuredData}\n</head>`
  );
}

function getChangeFrequency(path) {
  if (path === "/") {
    return "weekly";
  }

  if (path === "/blogs") {
    return "daily";
  }

  if (path.startsWith("/blog/")) {
    return "monthly";
  }

  if (path === "/privacy-policy" || path === "/terms-of-service" || path === "/cookies") {
    return "yearly";
  }

  return "monthly";
}

function getPriority(path) {
  if (path === "/") {
    return "1.0";
  }

  if (path === "/blogs") {
    return "0.9";
  }

  if (
    path === "/services" ||
    path === "/portfolio" ||
    path === "/contact" ||
    path.startsWith("/services/") ||
    path.startsWith("/blog/") ||
    path.startsWith("/portfolio/")
  ) {
    return "0.8";
  }

  if (path === "/about-us" || path === "/team") {
    return "0.7";
  }

  if (path === "/privacy-policy" || path === "/terms-of-service" || path === "/cookies") {
    return "0.3";
  }

  return "0.5";
}

function buildSitemapXml(routeEntries) {
  const indexableRoutes = routeEntries.filter(
    (route) => !String(route.robots || "index, follow").toLowerCase().includes("noindex")
  );

  const urls = indexableRoutes
    .map(
      (route) => `  <url>\n    <loc>${escapeXml(route.canonical)}</loc>\n    <lastmod>${escapeXml(route.lastModified)}</lastmod>\n    <changefreq>${getChangeFrequency(route.path)}</changefreq>\n    <priority>${getPriority(route.path)}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

for (const route of routes) {
  const filePath = outputPathForRoute(route.path);
  mkdirSync(dirname(filePath), { recursive: true });

  const html = injectHead(template, route).replace(
    /<div id="root"><\/div>/,
    `<div id="seo-prerender">${route.bodyHtml}</div><div id="root"></div>`
  );

  writeFileSync(filePath, html, "utf8");
}

writeFileSync(join(distDir, "sitemap.xml"), buildSitemapXml(routes), "utf8");

console.log(`Generated ${routes.length} prerendered SEO pages and sitemap.`);
