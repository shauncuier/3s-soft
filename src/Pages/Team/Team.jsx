import React from "react";
// import { Linkedin, Twitter, Github, ExternalLink, Dribbble, Facebook } from 'lucide-react';
import {
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiFacebook,
  FiLink,
  FiDribbble,
} from "react-icons/fi";
import teamData from "../../data/team.json";
import SectionLabel from "../../Components/SectionLabel";
import { Link } from "react-router";

const Team = () => {
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "linkedin":
        return FiLinkedin;
      case "twitter":
        return FiTwitter;
      case "github":
        return FiGithub;
      case "dribbble":
        return FiDribbble;
      case "facebook":
        return FiFacebook;
      default:
        return FiLink;
    }
  };

  return (
    <>
      <section className="bg-gray-900 transition-colors duration-300 px-4">
        <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionLabel label={"Meet Our Expert Team"} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              The Experts Behind Your Success
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of skilled professionals brings years of
              experience and passion to every project, ensuring exceptional
              results for our clients.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 sm:px-0">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden"
              >
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const IconComponent = getSocialIcon(platform);
                      return (
                        <a
                        target="_blank"
                          key={platform}
                          href={url}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <p className="text-blue-400 font-medium mb-3">
                    {member.position}
                  </p>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Work with Our Expert Team?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and see how our talented team can
                help bring your vision to life.
              </p>
              <Link
                to={"/contact"}
                className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
