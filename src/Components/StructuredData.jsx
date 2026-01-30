import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "3S-SOFT",
        "url": "https://3s-soft.com/",
        "logo": "https://3s-soft.com/favicon/android-chrome-512x512.png",
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
        "url": "https://3s-soft.com/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://3s-soft.com/blogs?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const navigationSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Main Navigation",
        "itemListElement": [
            {
                "@type": "SiteNavigationElement",
                "position": 1,
                "name": "Home",
                "url": "https://3s-soft.com/"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 2,
                "name": "Services",
                "url": "https://3s-soft.com/services"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 3,
                "name": "Portfolio",
                "url": "https://3s-soft.com/portfolio"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 4,
                "name": "Blogs",
                "url": "https://3s-soft.com/blogs"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 5,
                "name": "Team",
                "url": "https://3s-soft.com/team"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 6,
                "name": "About Us",
                "url": "https://3s-soft.com/about-us"
            },
            {
                "@type": "SiteNavigationElement",
                "position": 7,
                "name": "Contact Us",
                "url": "https://3s-soft.com/contact"
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
            <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(navigationSchema)}</script>
        </Helmet>
    );
};

export default StructuredData;
