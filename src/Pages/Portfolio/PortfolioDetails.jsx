import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import SectionLabel from "../../Components/SectionLabel";
import { FaExternalLinkAlt, FaArrowLeft, FaCheckCircle, FaTools } from "react-icons/fa";

const PortfolioDetails = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import("../../data/portfolio.json").then((data) => {
            const foundProject = data.portfolio.find((p) => p.slug === slug);
            setProject(foundProject);
            setLoading(false);
            window.scrollTo(0, 0);
        });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-5 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
                <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been moved.</p>
                <Link
                    to="/portfolio"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-semibold"
                >
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{project.seo?.title || `${project.title} | 3S-SOFT Portfolio`}</title>
                <meta name="description" content={project.seo?.description || project.description} />
                <meta property="og:title" content={project.seo?.title || project.title} />
                <meta property="og:description" content={project.seo?.description || project.description} />
                <meta property="og:image" content={project.image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="bg-gray-900 min-h-screen">
                {/* Project Hero */}
                <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-30 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-[1480px] mx-auto px-5 w-full">
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8 group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Link>
                        <SectionLabel label={project.category} />
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="text-xl text-blue-400 font-medium">{project.client}</span>
                            <span className="text-gray-500 text-xl">|</span>
                            <span className="text-xl text-green-400 font-medium">{project.results}</span>
                        </div>
                    </div>
                </section>

                {/* Project Details Content */}
                <section className="py-20 px-5">
                    <div className="max-w-[1480px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left Column: Description */}
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    {project.longDescription || project.description}
                                </p>
                            </div>

                            {project.scope && (
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Execution Scope</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.scope.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-gray-300">
                                                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action */}
                            <div className="pt-6">
                                <a
                                    href={project.link}
                                    onClick={(e) => {
                                        if (project.link === "#") {
                                            e.preventDefault();
                                        }
                                    }}
                                    target={project.link === "#" ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Visit Live Project
                                    <FaExternalLinkAlt />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="space-y-12">
                            {/* Technologies */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <FaTools className="text-blue-500 text-2xl" />
                                    <h3 className="text-xl font-bold text-white">Technologies Used</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded-xl border border-gray-600"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Client Info Card */}
                            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-3xl border border-blue-500/20">
                                <h3 className="text-white font-bold text-2xl mb-4">Ready for results like these?</h3>
                                <p className="text-blue-200/70 mb-8">
                                    Let's collaborate on your next project and build something extraordinary together.
                                </p>
                                <Link
                                    to="/contact"
                                    className="block w-full text-center py-4 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors"
                                >
                                    Start a Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PortfolioDetails;
