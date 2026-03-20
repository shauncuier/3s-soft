import React from "react";
import { withAutoLinks } from "../utils/autoLinker";

/**
 * Parses markdown-style text, replacing **bold**, `code`, and keywords via autoLinker
 */
const renderFormattedText = (text, disableLinks) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded font-mono text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{disableLinks ? part : withAutoLinks(part)}</React.Fragment>;
  });
};

/**
 * A shared component to render Markdown-style content across Blogs and Portfolio case studies.
 * Supports:
 * - paragraphs (blank lines)
 * - horizontal rules (---)
 * - images (![alt](url))
 * - h3 headings (### Heading)
 * - h4 headings (#### Heading)
 * - ordered lists (1. Item)
 * - unordered lists (- Item or * Item)
 * - inline **bold** and `code`
 */
const RichTextRenderer = ({ content, disableLinks = false }) => {
  if (!content) return null;

  return (
    <article className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
      {content.split("\n").map((paragraph, index) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return null;

        // Handle horizontal rules
        if (trimmed === "---") {
          return <hr key={index} className="my-10 border-white/10" />;
        }

        // Handle images: ![alt](url)
        const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
          return (
            <div
              key={index}
              className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={imgMatch[2]}
                alt={imgMatch[1]}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          );
        }

        // Handle headings
        const h3Match = trimmed.match(/^###\s+(.+)$/);
        if (h3Match) {
          return (
            <h3
              key={index}
              className="text-3xl font-bold text-white mt-12 mb-6 tracking-tight"
            >
              {renderFormattedText(h3Match[1], disableLinks)}
            </h3>
          );
        }

        const h4Match = trimmed.match(/^####\s+(.+)$/);
        if (h4Match) {
          return (
            <h4
              key={index}
              className="text-xl font-bold text-blue-400 mt-8 mb-4"
            >
              {renderFormattedText(h4Match[1], disableLinks)}
            </h4>
          );
        }

        // Handle ordered lists
        const listMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (listMatch) {
          return (
            <div key={index} className="flex gap-4 mb-4">
              <span className="bg-blue-500/20 text-blue-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm mt-0.5 border border-blue-500/30">
                {listMatch[1]}
              </span>
              <p className="flex-1 text-gray-300">
                {renderFormattedText(listMatch[2], disableLinks)}
              </p>
            </div>
          );
        }

        // Handle unordered lists (dash or asterisk)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={index} className="flex gap-4 mb-3 ml-2">
              <span className="text-blue-400 mt-1 text-lg leading-none">•</span>
              <p className="flex-1 text-gray-300">
                {renderFormattedText(trimmed.slice(2), disableLinks)}
              </p>
            </div>
          );
        }

        // Default paragraph
        return (
          <p key={index} className="mb-5 text-gray-400 text-lg leading-relaxed">
            {renderFormattedText(paragraph, disableLinks)}
          </p>
        );
      })}
    </article>
  );
};

export default RichTextRenderer;
