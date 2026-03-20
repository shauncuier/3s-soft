import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../src/data/portfolio.json');

const updatePortfolioSeo = () => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  data.portfolio.forEach(p => {
    if (p.slug === 'ecommerce-platform-retailmax') {
      p.description = "A fully-featured, scalable online store built using MERN stack web development. Includes real-time inventory management, secure payment integration, and advanced analytics.";
      p.longDescription = "RetailMax UK needed a robust eCommerce product listing and management solution to handle their growing inventory. We developed a custom MERN stack application focusing on Extreme speed, SEO, and secure Stripe payment integration. Post-launch, the client saw a 150% increase in online sales and significantly improved customer retention rates.";
    }
    
    if (p.slug === 'restaurant-chain-website-tastybites') {
      p.description = "Multi-location restaurant website heavily utilizing WordPress customization, featuring WooCommerce online ordering and loyalty program integration.";
      p.longDescription = "For TastyBites Group, we developed a conversion-focused WordPress site leveraging deep WordPress customization. We integrated an advanced WooCommerce ordering system and an eCommerce-ready reservation platform that synchronizes with their in-restaurant management software.";
    }

    if (p.slug === 'fashion-brand-store-stylevogue') {
      p.longDescription = "StyleVogue London wanted to dominate the fashion niche. We implemented a high-end Shopify and eCommerce product listing platform featuring an Augmented Reality (AR) try-on tool using TensorFlow.js and a personalized recommendation engine. The project also relied on highly tailored graphic design to convert visitors.";
    }

    if (p.slug === 'amazon-marketplace-optimization-homegoods') {
      p.longDescription = "We completely transformed HomeGoods Direct's Amazon presence. By utilizing our aggressive digital marketing tactics, Amazon product listing optimization, customized graphic design for A+ content, and meticulous PPC campaign management, we tripled their monthly revenue on the platform within just 4 months.";
    }

    if (p.slug === 'seo-digital-marketing-greenenergy') {
      p.longDescription = "GreenEnergy Solutions required intensive SEO and digital marketing to compete for competitive green energy keywords. We implemented a profound SEO strategy alongside long-term content generation and white-hat lead generation techniques. Their organic footprint now completely dominates local search results.";
    }

    if (p.slug === 'social-media-campaign-luxe-beauty') {
      p.description = "Multi-platform social media marketing campaign with targeted lead generation, influencer partnerships, and aggressive paid advertising.";
      p.longDescription = "Luxe Beauty Co needed an aggressive social media marketing strategy to capture a younger audience on TikTok and Instagram. Complementing our digital marketing prowess, we curated viral video challenges and utilized deep virtual assistant support for community management to achieve millions of impressions and explosive follower growth.";
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Portfolio descriptions dynamically enriched for SEO!");
};

updatePortfolioSeo();
