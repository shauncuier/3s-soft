import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { services } from "../src/data/servicesData.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(__dirname, relativePath), "utf8"));
}

const blogs = readJson("../src/data/blogs.json");
const portfolioData = readJson("../src/data/portfolio.json");
const team = readJson("../src/data/team.json");
const portfolio = portfolioData.portfolio;

export const siteUrl = "https://3s-soft.com";
export const siteName = "3S-SOFT";
export const defaultImage = `${siteUrl}/favicon/android-chrome-512x512.png`;
export const buildDate = new Date().toISOString().slice(0, 10);
const DEFAULT_KEYWORDS = [
  "web development agency Bangladesh",
  "MERN stack development",
  "WordPress development services",
  "SEO services",
  "eCommerce product listing",
  "Amazon listing optimization",
  "lead generation services",
  "graphic design services",
  "virtual assistant services",
];
const DEFAULT_PUBLIC_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
const DEFAULT_PRIVATE_ROBOTS =
  "noindex, nofollow, noarchive, nosnippet, max-image-preview:none, max-video-preview:0";

function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function trimText(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function normalizeKeywords(values = []) {
  const entries = Array.isArray(values) ? values : String(values || "").split(",");
  const unique = [];

  for (const rawEntry of entries) {
    const entry = trimText(rawEntry);

    if (!entry) {
      continue;
    }

    if (!unique.some((value) => value.toLowerCase() === entry.toLowerCase())) {
      unique.push(entry);
    }
  }

  return unique;
}

function mergeKeywords(...groups) {
  const flattened = groups.flatMap((group) =>
    Array.isArray(group) ? group : String(group || "").split(",")
  );

  return normalizeKeywords(flattened).join(", ");
}

function stripMarkdown(value = "") {
  return trimText(
    String(value)
      .replace(/\*\*/g, "")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      .replace(/^- /gm, "")
  );
}

function formatInline(value = "") {
  return escapeHtml(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderRichText(content = "") {
  const lines = String(content).split("\n");
  const html = [];
  let listType = null;

  function closeList() {
    if (!listType) {
      return;
    }

    html.push(listType === "ol" ? "</ol>" : "</ul>");
    listType = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h2 class="mt-10 mb-4 text-2xl font-bold text-white">${formatInline(line.slice(4))}</h2>`);
      continue;
    }

    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2 class="mt-10 mb-4 text-3xl font-bold text-white">${formatInline(line.slice(3))}</h2>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (listType !== "ol") {
        closeList();
        html.push('<ol class="list-decimal space-y-3 pl-6 text-slate-300">');
        listType = "ol";
      }

      html.push(`<li>${formatInline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (listType !== "ul") {
        closeList();
        html.push('<ul class="list-disc space-y-3 pl-6 text-slate-300">');
        listType = "ul";
      }

      html.push(`<li>${formatInline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p class="text-lg leading-8 text-slate-300">${formatInline(line)}</p>`);
  }

  closeList();
  return html.join("");
}

function renderHeader() {
  const links = [
    ["/services", "Services"],
    ["/portfolio", "Portfolio"],
    ["/blogs", "Blogs"],
    ["/team", "Team"],
    ["/about-us", "About"],
    ["/contact", "Contact"],
  ]
    .map(
      ([href, label]) =>
        `<a class="text-sm font-medium text-slate-300 transition hover:text-white" href="${href}">${label}</a>`
    )
    .join("");

  return `
    <header class="border-b border-white/10 bg-slate-950/90">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">
        <a href="/" class="text-lg font-black tracking-[0.24em] text-white">${siteName}</a>
        <nav class="flex flex-wrap items-center gap-4">${links}</nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="border-t border-white/10 bg-slate-950/95">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>3S-SOFT builds web products, eCommerce systems, and growth programs for global clients.</p>
        <div class="flex flex-wrap gap-4">
          <a class="hover:text-white" href="/privacy-policy">Privacy Policy</a>
          <a class="hover:text-white" href="/terms-of-service">Terms of Service</a>
          <a class="hover:text-white" href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  `;
}

function renderBreadcrumbs(items = []) {
  if (items.length <= 1) {
    return "";
  }

  return `
    <nav aria-label="Breadcrumb" class="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
      ${items
        .map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return `<span class="text-white">${escapeHtml(item.label)}</span>`;
          }

          return `<a class="hover:text-white" href="${item.href}">${escapeHtml(item.label)}</a>`;
        })
        .join('<span class="text-slate-600">/</span>')}
    </nav>
  `;
}

function renderLayout({ title, description, body, breadcrumbs = [{ href: "/", label: "Home" }] }) {
  return `
    <div class="min-h-screen bg-slate-950 text-slate-100">
      ${renderHeader()}
      <main class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        ${renderBreadcrumbs(breadcrumbs)}
        <section class="mb-12 max-w-4xl">
          <p class="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">${siteName}</p>
          <h1 class="text-4xl font-black tracking-tight text-white md:text-6xl">${escapeHtml(title)}</h1>
          <p class="mt-6 text-lg leading-8 text-slate-300">${escapeHtml(description)}</p>
        </section>
        ${body}
      </main>
      ${renderFooter()}
    </div>
  `;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

function createRoute({
  path,
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  image = defaultImage,
  type = "website",
  robots = DEFAULT_PUBLIC_ROBOTS,
  googleBot,
  bingBot,
  schema = [],
  bodyHtml,
}) {
  const normalizedKeywords = mergeKeywords(keywords);
  const normalizedRobots = robots || DEFAULT_PUBLIC_ROBOTS;

  return {
    path,
    title,
    description,
    keywords: normalizedKeywords,
    image: image.startsWith("http") ? image : absoluteUrl(image),
    type,
    robots: normalizedRobots,
    googleBot: googleBot || normalizedRobots,
    bingBot: bingBot || normalizedRobots,
    canonical: absoluteUrl(path),
    lastModified: buildDate,
    schema,
    bodyHtml,
  };
}

function renderGrid(items, renderer, columns = "md:grid-cols-2") {
  return `<div class="grid gap-6 ${columns}">${items.map(renderer).join("")}</div>`;
}

function serviceCard(service) {
  return `
    <article class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 class="text-2xl font-bold text-white">
        <a href="/services/${service.slug}" class="hover:text-cyan-300">${escapeHtml(service.title)}</a>
      </h2>
      <p class="mt-4 text-slate-300">${escapeHtml(service.description)}</p>
      <ul class="mt-5 list-disc space-y-2 pl-6 text-slate-300">
        ${service.features.slice(0, 4).map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function blogCard(blog) {
  return `
    <article class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p class="text-sm text-cyan-300">${escapeHtml(blog.category)} • ${escapeHtml(blog.date)} • ${escapeHtml(blog.author)}</p>
      <h2 class="mt-3 text-2xl font-bold text-white">
        <a href="/blog/${blog.slug}" class="hover:text-cyan-300">${escapeHtml(blog.title)}</a>
      </h2>
      <p class="mt-4 text-slate-300">${escapeHtml(stripMarkdown(blog.details).slice(0, 220))}...</p>
    </article>
  `;
}

function portfolioCard(project) {
  return `
    <article class="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p class="text-sm text-cyan-300">${escapeHtml(project.category)} • ${escapeHtml(project.client)}</p>
      <h2 class="mt-3 text-2xl font-bold text-white">
        <a href="/portfolio/${project.slug}" class="hover:text-cyan-300">${escapeHtml(project.title)}</a>
      </h2>
      <p class="mt-4 text-slate-300">${escapeHtml(project.description)}</p>
      <p class="mt-5 text-sm font-semibold text-emerald-300">${escapeHtml(project.results)}</p>
    </article>
  `;
}

function renderHomeRoute() {
  return createRoute({
    path: "/",
    title: "3S-SOFT | Web Development, SEO, eCommerce & Virtual Assistant Services",
    description:
      "3S-SOFT is a Bangladesh-based digital agency delivering MERN stack web development, WordPress solutions, SEO services, eCommerce product listing, lead generation, graphic design, and virtual assistant support for global businesses.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "web development company",
      "SEO company Bangladesh",
      "WordPress website development",
      "digital agency Bangladesh",
      "eCommerce services",
      "virtual assistant company",
    ]),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: `${siteUrl}/`,
        logo: defaultImage,
        description:
          "3S-SOFT provides web engineering, eCommerce services, SEO, and virtual assistant support.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chittagong",
          addressCountry: "BD",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+8801835927634",
          email: "info@3s-soft.com",
        },
        sameAs: [
          "https://www.facebook.com/3s.soft.bd",
          "https://www.linkedin.com/company/3s-soft/",
          "https://www.instagram.com/3ssoft/",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: `${siteUrl}/`,
      },
    ],
    bodyHtml: renderLayout({
      title: "Web Development, SEO & eCommerce Services for Growing Brands",
      description:
        "3S-SOFT helps businesses launch faster websites, improve search visibility, optimize marketplace listings, and streamline digital operations across Bangladesh and global markets.",
      body: `
        <section class="grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Build</p>
            <p class="mt-3 text-slate-200">MERN stack web apps, WordPress websites, landing pages, dashboards, and digital products built for speed, usability, and conversion.</p>
          </div>
          <div class="rounded-3xl border border-purple-400/30 bg-purple-400/10 p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Grow</p>
            <p class="mt-3 text-slate-200">SEO, Amazon and eCommerce listing optimization, lead generation, and marketing campaigns tied to measurable traffic, leads, and sales.</p>
          </div>
          <div class="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Operate</p>
            <p class="mt-3 text-slate-200">Virtual assistants, research, data entry, and support workflows that keep growing businesses organized, responsive, and efficient.</p>
          </div>
        </section>
        <section class="mt-14">
          <div class="mb-8 flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Core Services</p>
              <h2 class="mt-3 text-3xl font-bold text-white">What 3S-SOFT delivers</h2>
            </div>
            <a href="/services" class="text-sm font-semibold text-cyan-300 hover:text-white">See all services</a>
          </div>
          ${renderGrid(services.slice(0, 4), serviceCard)}
        </section>
        <section class="mt-14">
          <div class="mb-8 flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Case Studies</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Selected delivery work</h2>
            </div>
            <a href="/portfolio" class="text-sm font-semibold text-cyan-300 hover:text-white">Browse portfolio</a>
          </div>
          ${renderGrid(portfolio.filter((item) => item.featured).slice(0, 4), portfolioCard)}
        </section>
        <section class="mt-14">
          <div class="mb-8 flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Insights</p>
              <h2 class="mt-3 text-3xl font-bold text-white">Recent thinking from the team</h2>
            </div>
            <a href="/blogs" class="text-sm font-semibold text-cyan-300 hover:text-white">Read all blogs</a>
          </div>
          ${renderGrid(blogs.slice(0, 4), blogCard)}
        </section>
      `,
    }),
  });
}

function renderServicesRoute() {
  return createRoute({
    path: "/services",
    title: "3S-SOFT Services | Web Development, SEO, eCommerce, Design & Virtual Support",
    description:
      "Explore 3S-SOFT services across MERN stack development, WordPress customization, product listing, SEO, lead generation, social media marketing, graphic design, and virtual assistant support.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "web development services",
      "SEO service company",
      "Amazon listing service",
      "social media marketing services",
      "graphic design company",
    ]),
    bodyHtml: renderLayout({
      title: "Digital services built to drive traffic, leads, and sales",
      description:
        "3S-SOFT combines web development, SEO, eCommerce operations, design, and virtual support under one delivery team. Each service page outlines the outcomes, workflows, and capabilities available to growing businesses.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
      ],
      body: renderGrid(services, serviceCard),
    }),
  });
}

function renderServiceRoutes() {
  return services.map((service) => {
    const breadcrumbs = [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: `/services/${service.slug}`, label: service.title },
    ];

    return createRoute({
      path: `/services/${service.slug}`,
      title: service.seoTitle,
      description: service.seoDescription,
      keywords: mergeKeywords(DEFAULT_KEYWORDS, [service.title, ...service.features.slice(0, 6)]),
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.title,
          areaServed: "Worldwide",
          provider: {
            "@type": "Organization",
            name: siteName,
            url: `${siteUrl}/`,
          },
        },
        breadcrumbSchema(breadcrumbs),
      ],
      bodyHtml: renderLayout({
        title: service.title,
        description: service.description,
        breadcrumbs,
        body: `
          <section class="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div class="space-y-8">
              <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 class="text-2xl font-bold text-white">Overview</h2>
                <p class="mt-4 text-lg leading-8 text-slate-300">${escapeHtml(service.fullContent)}</p>
              </article>
              <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 class="text-2xl font-bold text-white">Delivery Scope</h2>
                <ul class="mt-5 list-disc space-y-3 pl-6 text-slate-300">
                  ${service.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
                </ul>
              </article>
            </div>
            <aside class="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8">
              <h2 class="text-xl font-bold text-white">Need this service?</h2>
              <p class="mt-4 text-slate-200">Start with a free consultation to review scope, budget, delivery phases, and technical fit.</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <a href="/contact" class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Book a consultation</a>
                <a href="/services" class="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white">Compare services</a>
              </div>
            </aside>
          </section>
        `,
      }),
    });
  });
}

function renderBlogsRoute() {
  return createRoute({
    path: "/blogs",
    title: "3S-SOFT Blog | Digital Growth Insights, Web Dev, SEO, and eCommerce",
    description:
      "Explore expert articles on MERN stack development, SEO audits, Amazon selling, Shopify growth, and digital delivery strategy from the 3S-SOFT team.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "digital marketing blog",
      "SEO blog",
      "web development blog",
      "eCommerce growth blog",
      "MERN stack articles",
    ]),
    bodyHtml: renderLayout({
      title: "Digital strategy, engineering, and growth insights",
      description:
        "The 3S-SOFT blog covers practical lessons from delivery work across full-stack engineering, marketplace operations, SEO, and digital marketing.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/blogs", label: "Blogs" },
      ],
      body: renderGrid(blogs, blogCard),
    }),
  });
}

function renderBlogRoutes() {
  return blogs.map((blog) => {
    const breadcrumbs = [
      { href: "/", label: "Home" },
      { href: "/blogs", label: "Blogs" },
      { href: `/blog/${blog.slug}`, label: blog.title },
    ];

    return createRoute({
      path: `/blog/${blog.slug}`,
      title: `${blog.title} | 3S-SOFT`,
      description: stripMarkdown(blog.details).slice(0, 155),
      keywords: mergeKeywords(DEFAULT_KEYWORDS, [blog.category, ...blog.tags]),
      image: blog.imageUrl,
      type: "article",
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          author: {
            "@type": "Person",
            name: blog.author,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: defaultImage,
            },
          },
          image: absoluteUrl(blog.imageUrl),
          datePublished: blog.date,
          dateModified: blog.date,
          mainEntityOfPage: absoluteUrl(`/blog/${blog.slug}`),
          articleSection: blog.category,
          keywords: blog.tags.join(", "),
          description: stripMarkdown(blog.details).slice(0, 155),
        },
        breadcrumbSchema(breadcrumbs),
      ],
      bodyHtml: renderLayout({
        title: blog.title,
        description: stripMarkdown(blog.details).slice(0, 180),
        breadcrumbs,
        body: `
          <article class="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div class="flex flex-wrap gap-4 text-sm text-cyan-300">
              <span>${escapeHtml(blog.category)}</span>
              <span>${escapeHtml(blog.date)}</span>
              <span>${escapeHtml(blog.author)}</span>
            </div>
            <div class="mt-8 space-y-6">${renderRichText(blog.details)}</div>
            <div class="mt-10 border-t border-white/10 pt-6">
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Tags</p>
              <div class="mt-4 flex flex-wrap gap-3">
                ${blog.tags
                  .map(
                    (tag) =>
                      `<span class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">#${escapeHtml(tag)}</span>`
                  )
                  .join("")}
              </div>
            </div>
          </article>
        `,
      }),
    });
  });
}

function renderPortfolioRoute() {
  return createRoute({
    path: "/portfolio",
    title: "3S-SOFT Portfolio | Web Development, eCommerce, and Marketing Case Studies",
    description:
      "Review 3S-SOFT portfolio work across web engineering, marketplace optimization, design, and digital marketing campaigns delivered for global clients.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "web development portfolio",
      "SEO case studies",
      "eCommerce case studies",
      "digital marketing portfolio",
    ]),
    bodyHtml: renderLayout({
      title: "Case studies across product, growth, and operations",
      description:
        "This portfolio covers digital products, marketplace growth, SEO programs, and brand systems delivered for clients in web development, eCommerce, and marketing.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/portfolio", label: "Portfolio" },
      ],
      body: renderGrid(portfolio, portfolioCard),
    }),
  });
}

function renderPortfolioRoutes() {
  return portfolio.map((project) => {
    const breadcrumbs = [
      { href: "/", label: "Home" },
      { href: "/portfolio", label: "Portfolio" },
      { href: `/portfolio/${project.slug}`, label: project.title },
    ];

    return createRoute({
      path: `/portfolio/${project.slug}`,
      title: project.seo?.title || `${project.title} | 3S-SOFT Portfolio`,
      description: project.seo?.description || project.description,
      keywords: mergeKeywords(DEFAULT_KEYWORDS, [project.category, project.client, ...(project.technologies || [])]),
      image: project.image,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.longDescription || project.description,
          creator: {
            "@type": "Organization",
            name: siteName,
            url: `${siteUrl}/`,
          },
          image: absoluteUrl(project.image),
          keywords: [project.category, ...(project.technologies || [])].join(", "),
        },
        breadcrumbSchema(breadcrumbs),
      ],
      bodyHtml: renderLayout({
        title: project.title,
        description: project.description,
        breadcrumbs,
        body: `
          <section class="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div class="space-y-8">
              <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">${escapeHtml(project.client)} • ${escapeHtml(project.category)}</p>
                <h2 class="mt-4 text-2xl font-bold text-white">Project overview</h2>
                <p class="mt-4 text-lg leading-8 text-slate-300">${escapeHtml(project.longDescription || project.description)}</p>
              </article>
              <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 class="text-2xl font-bold text-white">Execution scope</h2>
                <ul class="mt-5 list-disc space-y-3 pl-6 text-slate-300">
                  ${(project.scope || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </article>
            </div>
            <aside class="space-y-6">
              <div class="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8">
                <p class="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Results</p>
                <p class="mt-4 text-lg text-slate-100">${escapeHtml(project.results)}</p>
              </div>
              <div class="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 class="text-xl font-bold text-white">Technologies used</h2>
                <div class="mt-5 flex flex-wrap gap-3">
                  ${(project.technologies || [])
                    .map(
                      (tech) =>
                        `<span class="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200">${escapeHtml(tech)}</span>`
                    )
                    .join("")}
                </div>
              </div>
            </aside>
          </section>
        `,
      }),
    });
  });
}

function renderAboutRoute() {
  return createRoute({
    path: "/about-us",
    title: "About 3S-SOFT | Web Development, SEO & eCommerce Growth Partner",
    description:
      "Learn how 3S-SOFT helps startups, eCommerce brands, and service businesses grow with web development, SEO, marketplace operations, design, and virtual assistant support.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "about 3S-SOFT",
      "digital agency Bangladesh",
      "web development team",
      "SEO agency Bangladesh",
    ]),
    bodyHtml: renderLayout({
      title: "A digital growth partner built around execution",
      description:
        "3S-SOFT is a Bangladesh-based digital agency helping startups, eCommerce brands, and service businesses grow through web development, SEO, marketplace operations, design, and virtual support.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/about-us", label: "About Us" },
      ],
      body: `
        <section class="grid gap-8 md:grid-cols-2">
          <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 class="text-2xl font-bold text-white">Who we are</h2>
            <p class="mt-4 text-lg leading-8 text-slate-300">3S-SOFT combines developers, designers, digital marketers, and virtual support specialists to help clients build stronger websites, improve visibility, and operate more efficiently online.</p>
          </article>
          <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 class="text-2xl font-bold text-white">Mission and vision</h2>
            <p class="mt-4 text-lg leading-8 text-slate-300">Our mission is to create measurable business value through web development, SEO, eCommerce support, and digital execution. Our vision is to become a trusted long-term growth partner for businesses serving local and global markets.</p>
          </article>
        </section>
        <section class="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 class="text-2xl font-bold text-white">What we offer</h2>
          <ul class="mt-5 grid gap-3 pl-6 text-slate-300 md:grid-cols-2">
            ${services.map((service) => `<li><a class="hover:text-white" href="/services/${service.slug}">${escapeHtml(service.title)}</a></li>`).join("")}
          </ul>
        </section>
      `,
    }),
  });
}

function renderTeamRoute() {
  return createRoute({
    path: "/team",
    title: "3S-SOFT Team | Full-Stack Developers, Designers, and Marketing Specialists",
    description:
      "Meet the 3S-SOFT team of engineers, designers, and marketing specialists who deliver web platforms, eCommerce execution, and growth programs for clients.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "full stack developers",
      "SEO specialists",
      "digital marketing team",
      "eCommerce specialists",
    ]),
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: `${siteUrl}/`,
        employee: team.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.position,
          description: trimText(member.bio),
        })),
      },
    ],
    bodyHtml: renderLayout({
      title: "The people behind the delivery work",
      description:
        "3S-SOFT brings together leadership, engineering, design, and marketing roles that support both product delivery and growth execution.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/team", label: "Team" },
      ],
      body: renderGrid(
        team,
        (member) => `
          <article class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 class="text-xl font-bold text-white">${escapeHtml(member.name)}</h2>
            <p class="mt-2 text-cyan-300">${escapeHtml(member.position)}</p>
            <p class="mt-4 text-slate-300">${escapeHtml(trimText(member.bio))}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              ${(member.skills || []).map((skill) => `<span class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">${escapeHtml(skill)}</span>`).join("")}
            </div>
          </article>
        `,
        "md:grid-cols-2 lg:grid-cols-3"
      ),
    }),
  });
}

function renderContactRoute() {
  return createRoute({
    path: "/contact",
    title: "Contact 3S-SOFT | Web Development, SEO & eCommerce Team",
    description:
      "Contact 3S-SOFT for websites, SEO services, marketplace product listing, digital marketing, design work, and virtual assistant support. Request a quote or consultation.",
    keywords: mergeKeywords(DEFAULT_KEYWORDS, [
      "contact web development company",
      "SEO consultation",
      "hire MERN stack developers",
      "Amazon listing support",
      "digital agency contact Bangladesh",
    ]),
    bodyHtml: renderLayout({
      title: "Talk to our web development, SEO, and eCommerce team",
      description:
        "Reach 3S-SOFT for project planning, service recommendations, and delivery support across websites, SEO, product listing, lead generation, design, and virtual assistant services.",
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
      ],
      body: `
        <section class="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 class="text-2xl font-bold text-white">Contact details</h2>
            <div class="mt-6 space-y-4 text-slate-300">
              <p><strong class="text-white">Email:</strong> <a class="text-cyan-300 hover:text-white" href="mailto:info@3s-soft.com">info@3s-soft.com</a></p>
              <p><strong class="text-white">Phone:</strong> <a class="text-cyan-300 hover:text-white" href="tel:+8801835927634">+880 1835 927634</a></p>
              <p><strong class="text-white">WhatsApp:</strong> <a class="text-cyan-300 hover:text-white" href="https://wa.me/8801835927634">Chat on WhatsApp</a></p>
              <p><strong class="text-white">Location:</strong> Chittagong, Bangladesh</p>
              <p><strong class="text-white">Website:</strong> <a class="text-cyan-300 hover:text-white" href="https://3s-soft.com/">https://3s-soft.com/</a></p>
            </div>
          </article>
          <article class="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 class="text-2xl font-bold text-white">What you can ask about</h2>
            <ul class="mt-5 list-disc space-y-3 pl-6 text-slate-300">
              ${services.map((service) => `<li>${escapeHtml(service.title)}</li>`).join("")}
            </ul>
          </article>
        </section>
      `,
    }),
  });
}

function renderSimpleRoute({ path, title, description, sections, robots = DEFAULT_PUBLIC_ROBOTS, keywords = DEFAULT_KEYWORDS }) {
  return createRoute({
    path,
    title,
    description,
    keywords,
    robots,
    bodyHtml: renderLayout({
      title: title.replace(" | 3S-SOFT", ""),
      description,
      breadcrumbs: [
        { href: "/", label: "Home" },
        { href: path, label: title.replace(" | 3S-SOFT", "") },
      ],
      body: `<div class="space-y-6">${sections
        .map(
          (section) => `
            <section class="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 class="text-2xl font-bold text-white">${escapeHtml(section.heading)}</h2>
              <div class="mt-4 space-y-4 text-lg leading-8 text-slate-300">
                ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              </div>
            </section>
          `
        )
        .join("")}</div>`,
    }),
  });
}

export function getSeoRoutes() {
  return [
    renderHomeRoute(),
    renderServicesRoute(),
    ...renderServiceRoutes(),
    renderBlogsRoute(),
    ...renderBlogRoutes(),
    renderPortfolioRoute(),
    ...renderPortfolioRoutes(),
    renderAboutRoute(),
    renderTeamRoute(),
    renderContactRoute(),
    renderSimpleRoute({
      path: "/privacy-policy",
      title: "Privacy Policy | 3S-SOFT",
      description:
        "Read how 3S-SOFT handles personal, technical, and compliance-related data for clients across global markets.",
      sections: [
        {
          heading: "Introduction",
          paragraphs: [
            "3S-SOFT protects personal and business information shared through our website and service engagements.",
            "We align our handling of data with international privacy expectations, including GDPR-aligned practices and applicable United States privacy requirements.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect contact details and project information that visitors voluntarily submit through forms or direct outreach.",
            "We also collect technical information such as browser, device, and page interaction data to improve security, performance, and service quality.",
          ],
        },
        {
          heading: "Data rights and contact",
          paragraphs: [
            "Depending on jurisdiction, users may have rights to access, correct, delete, or restrict the use of personal information.",
            "Privacy requests can be sent to info@3s-soft.com with the subject line Data Privacy Request.",
          ],
        },
      ],
    }),
    renderSimpleRoute({
      path: "/terms-of-service",
      title: "Terms of Service | 3S-SOFT",
      description:
        "Review the legal terms that govern your use of the 3S-SOFT website and service engagements.",
      sections: [
        {
          heading: "Use of services",
          paragraphs: [
            "By accessing the 3S-SOFT website or engaging our team, you agree to the terms that govern site usage, communications, and service delivery relationships.",
            "Project-specific scope, milestones, payment schedules, and handoff terms are finalized in individual client agreements.",
          ],
        },
        {
          heading: "Delivery and ownership",
          paragraphs: [
            "3S-SOFT provides web development, eCommerce operations, SEO, marketing, design, and virtual assistant services.",
            "Ownership of final deliverables transfers according to the applicable contract terms and payment milestones agreed with the client.",
          ],
        },
        {
          heading: "Liability and governing law",
          paragraphs: [
            "We do not guarantee outcomes that depend on third-party platforms or algorithms, including marketplace rankings and organic search positions.",
            "Unless otherwise specified in a written agreement, these terms are governed by the laws of Bangladesh.",
          ],
        },
      ],
    }),
    renderSimpleRoute({
      path: "/cookies",
      title: "Cookie Policy | 3S-SOFT",
      description:
        "Understand how 3S-SOFT uses cookies and analytics technologies to operate and improve the site.",
      sections: [
        {
          heading: "What cookies do",
          paragraphs: [
            "Cookies help websites remember preferences, maintain sessions, and measure how visitors interact with pages and features.",
            "3S-SOFT uses cookies and analytics technologies to support core site behavior and improve the browsing experience.",
          ],
        },
        {
          heading: "Cookie categories",
          paragraphs: [
            "Essential cookies support security and core functionality. Performance cookies help us understand usage patterns and diagnose issues.",
            "Functionality cookies may remember preferences that make repeat visits more efficient.",
          ],
        },
        {
          heading: "Managing preferences",
          paragraphs: [
            "Visitors can control cookies through browser settings and remove existing cookies from their devices.",
            "Questions about cookies or analytics usage can be sent to info@3s-soft.com.",
          ],
        },
      ],
    }),
    renderSimpleRoute({
      path: "/login",
      title: "Login | 3S-SOFT",
      description: "Access your 3S-SOFT account to manage private dashboard features.",
      robots: DEFAULT_PRIVATE_ROBOTS,
      sections: [
        {
          heading: "Private access",
          paragraphs: [
            "This area is reserved for existing users and is not intended for search indexing.",
            "Use your email and password or a connected provider to access private 3S-SOFT dashboard features.",
          ],
        },
      ],
    }),
    renderSimpleRoute({
      path: "/register",
      title: "Register | 3S-SOFT",
      description: "Create a 3S-SOFT account for private access to dashboard features.",
      robots: DEFAULT_PRIVATE_ROBOTS,
      sections: [
        {
          heading: "Private registration",
          paragraphs: [
            "Registration is available for private product and dashboard access only.",
            "Create an account to access private 3S-SOFT experiences and collaboration workflows.",
          ],
        },
      ],
    }),
  ];
}
