import { Link } from "react-router";
import { services } from "../../Data/servicesData";
import { Helmet } from "react-helmet-async";
import SectionLabel from "../../Components/SectionLabel";
import Button from "../../Components/Button";
import PageTitle from "../../Components/PageTitle";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Agency Services",
    "provider": {
      "@type": "Organization",
      "name": "3S-SOFT",
      "url": "https://3s-soft.com/"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": services.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.description
        }
      }))
    }
  };

  return (
    <section className="bg-gray-900 transition-colors duration-300 px-4">
      <PageTitle
        title="Premium Digital Services | MERN Stack, SEO & eCommerce"
        content="Boost your business with 3S-SOFT's high-quality services: MERN stack web development, Amazon/eBay/Walmart product listing, SEO audits, and B2B lead generation."
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
        <div className="text-center mb-16">
          <SectionLabel label={"Our Core Services"} />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Professional Digital Solutions | MERN, SEO & eCommerce
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We provide scalable digital solutions tailored for startups, small
            businesses, and enterprises across multiple industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                to={`/services/${service.slug}`}
                key={index}
                className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden relative"
              >
                <div className="p-6 pb-0">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                <div className="p-6 pt-0 mb-8">
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Overlay/Cta */}
                <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700 flex items-center justify-between group-hover:bg-blue-600/10 transition-colors">
                  <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300">Learn More</span>
                  <FaArrowRight className="text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-16">
          <Button label={"Start Your Project Today"} to={"/contact"} />
        </div>
      </div>
    </section>
  );
};

export default Services;
