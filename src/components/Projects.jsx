"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
    {
        title: "CookBot AI App",
        description: "An AI-powered recipe chatbot that suggests dishes based on available ingredients and user health conditions (e.g., diabetes, allergies).",
        tech: ["Python", "Hugging Face", "Mistral 7B", "Full-stack"],
        links: { github: "http://github.com/rowhasan446/Cookbot", demo: "#" }, // Add actual links if available
    },
    {
        title: "Furniture Website",
        description: "Designed and developed an e-commerce website for a furniture business.",
        tech: ["Next.js", "JavaScript", "MongoDB", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Valexa-Furniture", demo: "www.valexafurniture.com" },
    },
    {
        title: "Bus Ticket Booking Website",
        description: "Developed a minimal yet user-friendly bus ticket booking website.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Bus-Ticket-Website", demo: "https://rowhasan446.github.io/Bus-Ticket-Website/" },
    },
    {
        title: "Travel Agency Website",
        description: "Developed a travel agency website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Travel-Website", demo: "https://rowhasan446.github.io/Travel-Website/" },
    },
    {
        title: "Biker Zone Website",
        description: "A biker zone website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend", "DaisyUI"],
        links: { github: "https://github.com/rowhasan446/Biker-Zone-DaisyUi-", demo: "https://rowhasan446.github.io/Biker-Zone-DaisyUi-/" },
    },
    {
        title: "Jacket Website (Landing Page)",
        description: "A jacket website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend", "DaisyUI"],
        links: { github: "https://github.com/rowhasan446/Jacket-Website-Responsive-landing-page-", demo: "https://rowhasan446.github.io/Jacket-Website-Responsive-landing-page-" },
    },
    {
        title: "Influencer Gear (Landing Page)",
        description: "An influencer gear website with a user-friendly interface and responsive design.",
        tech: ["HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Influencer-Gear", demo: "https://rowhasan446.github.io/Influencer-Gear/" },
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-6 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-16 text-center md:text-left"
                >
                    Selected Projects
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500"
                        >
                            <div className="p-8 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 text-xs font-medium bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors text-xl">
                                        <FaGithub />
                                    </a>
                                    <a href={project.links.demo} className="text-gray-400 hover:text-white transition-colors text-xl">
                                        <FaExternalLinkAlt />
                                    </a>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
