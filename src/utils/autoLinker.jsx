import React from 'react';
import { Link } from 'react-router-dom';

const keywordsMap = [
  { keyword: "web development", link: "/services/web-development-mern" },
  { keyword: "mern stack", link: "/services/web-development-mern" },
  { keyword: "wordpress", link: "/services/wordpress-customization" },
  { keyword: "ecommerce", link: "/services/ecommerce-product-listing" },
  { keyword: "amazon", link: "/services/ecommerce-product-listing" },
  { keyword: "lead generation", link: "/services/lead-generation" },
  { keyword: "seo", link: "/services/digital-marketing-seo" },
  { keyword: "digital marketing", link: "/services/digital-marketing-seo" },
  { keyword: "virtual assistant", link: "/services/virtual-assistant" },
  { keyword: "graphic design", link: "/services/graphic-design" },
  { keyword: "social media", link: "/services/social-media-marketing" }
];

const sortedKeywords = keywordsMap.sort((a, b) => b.keyword.length - a.keyword.length);
const keywordsRegex = new RegExp(`\\b(${sortedKeywords.map(k => k.keyword).join('|')})\\b`, 'gi');

/**
 * Parses plain text and converts recognized keywords into React Router Links for SEO.
 * @param {string} text - The plain text string to parse.
 * @returns {React.ReactNode} - The rich text with active Links.
 */
export const withAutoLinks = (text) => {
  if (!text) return text;
  
  const keywordParts = text.split(keywordsRegex);
  if (keywordParts.length === 1) return text;

  return (
    <>
      {keywordParts.map((kPart, j) => {
        const match = sortedKeywords.find(k => k.keyword.toLowerCase() === kPart.toLowerCase());
        if (match) {
          return (
            <Link key={j} to={match.link} className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors">
              {kPart}
            </Link>
          );
        }
        return kPart;
      })}
    </>
  );
};
