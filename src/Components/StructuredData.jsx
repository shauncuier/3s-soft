import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "3S-SOFT",
        "url": "https://3s-soft.netlify.app/",
        "logo": "https://3s-soft.netlify.app/favicon/android-chrome-512x512.png",
        "description": "3s-Soft is a full-service digital agency offering MERN stack web development, WordPress customization, eCommerce product listing, and SEO services.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chittagong",
            "addressCountry": "BD"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+8801835927634",
            "contactType": "customer service",
            "email": "info@3s-soft.com"
        },
        "sameAs": [
            "https://www.facebook.com/3s.soft.bd",
            "https://www.linkedin.com/company/3s-soft/",
            "https://www.instagram.com/3ssoft/"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "3S-SOFT",
        "url": "https://3s-soft.netlify.app/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://3s-soft.netlify.app/blogs?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
            <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        </Helmet>
    );
};

export default StructuredData;
