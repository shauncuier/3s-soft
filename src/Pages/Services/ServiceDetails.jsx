import React from "react";
import { useParams, Link } from "react-router";
import { services } from "../../data/servicesData";
import PageTitle from "../../Components/PageTitle";
import SectionLabel from "../../Components/SectionLabel";
import Button from "../../Components/Button";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import NotFound from "../Error/NotFound";

const ServiceDetails = () => {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return <NotFound />;
    }

    const IconComponent = service.icon;

    const dynamicServiceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "3S-SOFT",
            "url": "https://3s-soft.com/"
        },
        "serviceType": service.title,
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": service.title,
            "itemListElement": service.features.map((f, i) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": f
                }
            }))
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen pt-24 pb-20 px-4">
            <PageTitle
                title={service.seoTitle}
                content={service.seoDescription}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(dynamicServiceSchema)}
                </script>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/services"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
                >
                    <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to All Services
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shrink-0 shadow-2xl shadow-blue-500/20`}>
                        <IconComponent className="h-10 w-10 md:h-16 md:w-16 text-white" />
                    </div>
                    <div>
                        <SectionLabel label="Service Details" />
                        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                            {service.description}
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {service.fullContent}
                            </p>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
                                    >
                                        <FaCheckCircle className="text-blue-500 mt-1 mr-3 shrink-0" />
                                        <span className="text-gray-200 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-4">Ready to get started?</h3>
                            <p className="text-gray-400 mb-8">
                                Take the next step towards digital excellence. Let's discuss how our {service.title} can help your business grow.
                            </p>
                            <div className="space-y-4">
                                <Button
                                    label="Contact Us Now"
                                    to="/contact"
                                    className="w-full justify-center"
                                />
                                <p className="text-center text-sm text-gray-500">
                                    Free consultation and project audit included.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
