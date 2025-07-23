import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";

const FounderInfo = () => {
    return (
        <section className="bg-base-100 text-white py-14 px-4 md:px-8 rounded-2xl shadow-lg">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <img
                    src="https://jashedulislamshaun.com/profile.jpg" // 🔁 Replace with real image
                    alt="Jashedul Islam Shaun"
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-md"
                />

                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <HiOutlineUserCircle className="text-primary text-3xl" />
                        Jashedul Islam Shaun
                    </h3>
                    <p className="text-gray-300 mt-2">
                        Founder & Lead Web Developer at <strong>3s-Soft</strong>. I specialize in modern web
                        development using <strong>MERN stack</strong>, <strong>WordPress customization</strong>,
                        and <strong>eCommerce automation</strong> including product listing on Amazon, eBay, Walmart,
                        and Etsy.
                    </p>
                    <p className="text-gray-400 mt-2">
                        With a background in Computer Science and Education, I bring both technical expertise and
                        communication skills to every project. I also provide services like lead generation,
                        virtual assistance, SEO, and digital marketing.
                    </p>
                    <div className="mt-4 space-x-3">
                        <a
                            href="https://jashedulislamshaun.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-primary rounded-full text-white hover:bg-primary/80 transition"
                        >
                            Portfolio Website
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jashedul-islam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-secondary rounded-full text-white hover:bg-secondary/80 transition"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderInfo;
