import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://3s-soft.com";
const SITE_TITLE = "3S-SOFT";
const DEFAULT_IMAGE = `${SITE_URL}/favicon/android-chrome-512x512.png`;
const DEFAULT_DESCRIPTION =
  "Full-service digital agency specializing in MERN stack development, eCommerce solutions, and SEO.";

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
  image,
  imageAlt = `${SITE_TITLE} preview image`,
  type = "website",
  canonical,
  robots = "index, follow",
  noIndex = false,
  noFollow = false,
  fullTitle = false,
}) => {
  const location = useLocation();
  const finalTitle = buildTitle(title, fullTitle);
  const finalDescription = content || description || DEFAULT_DESCRIPTION;
  const finalCanonical = toAbsoluteUrl(canonical || location.pathname || "/");
  const finalImage = toAbsoluteUrl(image || DEFAULT_IMAGE);
  const finalRobots =
    noIndex || noFollow
      ? `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`
      : robots;

  return (
    <Helmet>
      {/* Search Engine Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="author" content={SITE_TITLE} />
      <meta name="robots" content={finalRobots} />
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
