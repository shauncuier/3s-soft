import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://3s-soft.com";
const SITE_TITLE = "3S-SOFT";
const DEFAULT_IMAGE = `${SITE_URL}/favicon/android-chrome-512x512.png`;
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
const DEFAULT_DESCRIPTION =
  "3S-SOFT is a Bangladesh-based digital agency delivering MERN stack development, WordPress solutions, SEO services, eCommerce product listing, lead generation, graphic design, and virtual assistant support for global businesses.";
const DEFAULT_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
const STRICT_NOINDEX_ROBOTS =
  "noindex, nofollow, noarchive, nosnippet, max-image-preview:none, max-video-preview:0";

const toAbsoluteUrl = (pathOrUrl = "/") => {
  if (!pathOrUrl) {
    return `${SITE_URL}/`;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

const includesSiteTitle = (value = "") =>
  value.toLowerCase().includes(SITE_TITLE.toLowerCase());

const normalizeKeywords = (keywords) => {
  const values = Array.isArray(keywords)
    ? keywords
    : String(keywords || "").split(",");

  const uniqueValues = [];

  for (const rawValue of values) {
    const value = String(rawValue || "").replace(/\s+/g, " ").trim();

    if (!value) {
      continue;
    }

    if (!uniqueValues.some((item) => item.toLowerCase() === value.toLowerCase())) {
      uniqueValues.push(value);
    }
  }

  return uniqueValues.join(", ");
};

const buildTitle = (title, fullTitle = false) => {
  if (!title) {
    return `${SITE_TITLE} | Digital Excellence`;
  }

  const trimmedTitle = title.trim();

  if (fullTitle || includesSiteTitle(trimmedTitle)) {
    return trimmedTitle;
  }

  return `${trimmedTitle} | ${SITE_TITLE}`;
};

const PageTitle = ({
  title,
  content,
  description,
  keywords,
  image,
  imageAlt = `${SITE_TITLE} preview image`,
  type = "website",
  canonical,
  robots = DEFAULT_ROBOTS,
  googleBot,
  bingBot,
  noIndex = false,
  noFollow = false,
  fullTitle = false,
}) => {
  const location = useLocation();
  const finalTitle = buildTitle(title, fullTitle);
  const finalDescription = content || description || DEFAULT_DESCRIPTION;
  const finalKeywords = normalizeKeywords(keywords || DEFAULT_KEYWORDS);
  const finalCanonical = toAbsoluteUrl(canonical || location.pathname || "/");
  const finalImage = toAbsoluteUrl(image || DEFAULT_IMAGE);
  const finalRobots =
    noIndex || noFollow
      ? STRICT_NOINDEX_ROBOTS
      : robots;
  const finalGoogleBot = googleBot || finalRobots;
  const finalBingBot = bingBot || finalRobots;

  return (
    <Helmet>
      {/* Search Engine Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={SITE_TITLE} />
      <meta name="robots" content={finalRobots} />
      <meta name="googlebot" content={finalGoogleBot} />
      <meta name="bingbot" content={finalBingBot} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default PageTitle;
