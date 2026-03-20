import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../src/data/portfolio.json');

const expandPortfolioMarkdown = () => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  data.portfolio.forEach(p => {
    if (p.slug === 'ecommerce-platform-retailmax') {
      p.longDescription = `### The Challenge\nRetailMax UK was dealing with an outdated online store that could not keep up with their rapidly expanding inventory. Their system was slow, leading to high cart abandonment, and their team wasted hours on manual inventory syncs.\n\n### Our Strategy\nWe completely replaced their monolithic architecture with a custom MERN stack application. This provided extreme speed and reliable scaling.\n\n- **Frontend:** Built a lightning-fast React interface optimized for mobile shopping.\n- **Backend:** Developed a robust Node.js API to handle thousands of concurrent requests.\n- **Payment & Security:** Integrated advanced Stripe security for frictionless checkouts.\n\n### The Results\nPost-launch, the new platform dramatically reduced load times.\n\n1. **150% Increase** in online sales within the first 6 months.\n2. **40% Reduction** in cart abandonment.\n3. Completely automated inventory syncing, saving 20+ hours a week.\n\nThis project perfectly highlights our deep expertise in eCommerce product listing and web development.`;
    }
    
    if (p.slug === 'amazon-marketplace-optimization-homegoods') {
      p.longDescription = `### The Stagnation\nHomeGoods Direct had fantastic products but their Amazon storefront was practically invisible. Their listings lacked engaging graphic design, their copywriting was unoptimized, and their PPC campaigns were draining their budget without generating returns.\n\n### 3S-SOFT Optimization Protocol\nWe took complete control of their Amazon presence and implemented our aggressive growth blueprint.\n\n- **SEO Copywriting:** We restructured all titles, bullet points, and descriptions utilizing high-volume Amazon product listing keywords.\n- **A+ Content:** Our digital marketing design team created bespoke visuals highlighting the premium quality of the products.\n- **PPC Management:** We optimized their ad spend, slashing wasted clicks and doubling down on targeted ASINs.\n\n### Incredible Outcomes\nThe results were immediate and aggressive. Within just 4 months, HomeGoods Direct saw a **300% increase** in monthly revenue.`;
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Portfolio descriptions converted to rich Markdown format!");
};

expandPortfolioMarkdown();
