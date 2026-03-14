import React, { Suspense, lazy } from "react";
import Hero from "./Hero";
import ServicesSection from "./ServicesSection";
import PageTitle from "../../Components/PageTitle";
import DeferredSection from "../../Components/DeferredSection";

const FeaturesSection = lazy(() => import("./FeaturesSection"));
const PortfolioSection = lazy(() => import("./PortfolioSection"));
const WhyChooseUs = lazy(() => import("./WhyChooseUs"));
const Testimonials = lazy(() => import("./Testimonials"));

const SectionFallback = ({ className = "bg-gray-900" }) => (
  <div className={`${className} px-5 py-20`}>
    <div className="max-w-[1480px] mx-auto animate-pulse">
      <div className="h-4 w-40 rounded-full bg-white/10 mx-auto"></div>
      <div className="h-10 w-3/4 max-w-3xl rounded-xl bg-white/10 mx-auto mt-6"></div>
      <div className="h-5 w-2/3 max-w-2xl rounded-xl bg-white/10 mx-auto mt-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-56 rounded-3xl border border-white/10 bg-white/5"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <PageTitle
        title="Web Development, SEO, eCommerce & Virtual Assistant Services"
        content="3S-SOFT is a Bangladesh-based digital agency delivering MERN stack development, WordPress solutions, SEO services, eCommerce product listing, lead generation, graphic design, and virtual assistant support for global businesses."
        keywords={[
          "web development agency Bangladesh",
          "MERN stack development",
          "WordPress development services",
          "SEO services Bangladesh",
          "eCommerce product listing",
          "lead generation services",
          "virtual assistant services",
        ]}
      />
      <Hero />
      <ServicesSection />
      <DeferredSection fallback={<SectionFallback className="bg-gray-900" />}>
        <Suspense fallback={<SectionFallback className="bg-gray-900" />}>
          <PortfolioSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection fallback={<SectionFallback className="bg-[#111827]" />}>
        <Suspense fallback={<SectionFallback className="bg-[#111827]" />}>
          <FeaturesSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection fallback={<SectionFallback className="bg-gray-900" />}>
        <Suspense fallback={<SectionFallback className="bg-gray-900" />}>
          <Testimonials />
        </Suspense>
      </DeferredSection>
      <DeferredSection fallback={<SectionFallback className="bg-gray-900" />}>
        <Suspense fallback={<SectionFallback className="bg-gray-900" />}>
          <WhyChooseUs />
        </Suspense>
      </DeferredSection>
    </>
  );
};

export default Home;
