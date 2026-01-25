import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const PageTitle = ({ title, content, image, type = "website" }) => {
  const location = useLocation();
  const currentUrl = `https://3s-soft.com${location.pathname}`;
  const defaultImage = "https://3s-soft.com/favicon/android-chrome-512x512.png";
  const siteTitle = "3S-SOFT";

  return (
    <Helmet>
      {/* Search Engine Tags */}
      <title>{title ? `${siteTitle} | ${title}` : `${siteTitle} | Digital Excellence`}</title>
      <meta name="description" content={content || "Full-service digital agency specializing in MERN stack development, eCommerce solutions, and SEO."} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={content} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={content} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default PageTitle;
