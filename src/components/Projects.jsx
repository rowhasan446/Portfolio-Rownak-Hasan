"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [

    {
    title: "Heart Disease Risk Checker",
    description: "Interactive web app that estimates heart disease risk using patient inputs (age, cholesterol, chest pain, etc.). Educational ML demo with live prediction.",
    tech: ["Python", "Streamlit", "scikit-learn", "Random Forest", "Pandas", "NumPy"],
    links: { 
        github: "https://github.com/rowhasan446/Heart-Disease-Checker-ML-Project-", 
        demo: "https://heartdiseasepredictior.streamlit.app/"   // ← replace with your actual Streamlit Cloud URL
    },
    image: "Heart.png"   // ← name your portfolio image file this way
},

    {
        title: "BashaChai - Home rental Service Website",
        description: "A comprehensive home rental service website that allows users to browse, book, and manage rental properties with ease.",
        tech: ["Nextjs", "HTML", "Tailwind CSS", "|Firebase", "MongoDB", "Full-stack"],
        links: { github: "https://github.com/rowhasan446/BashaChai", demo: "https://basha-chai.vercel.app/" },
        image: "/Basha .png"
    },
    {
        title: "Dental Patient Management and Record System",
        description: "A comprehensive dental patient management and record system that allows dentists to manage patient information, treatment records and write digital prescriptions. ",
        tech: ["Nextjs", "HTML", "Tailwind CSS", "Firebase", "MongoDB", "Full-stack"],
        links: { github: "https://github.com/rowhasan446/Dental-Patient-Management", demo: "https://robin-dental.vercel.app/" },
        image: "dental.png"
    },
    {
        title: "Tricode IT",
        description: "A website for a software company named Tricode IT.",
        tech: ["Nextjs", "HTML", "Tailwind CSS", "Firebase", "MongoDB", "Full-stack"],
        links: { github: "https://github.com/rowhasan446/TriCodeIT", demo: "https://tricode-it.vercel.app/" },
        image: "/Tricode.png"
    },
    {
        title: "TriDrop - E-commerce Website",
        description: "Designed and developed an e-commerce website for dropshipping business.",
        tech: ["Next.js", "JavaScript", "MongoDB", "Frontend"],
        links: { github: "https://github.com/rowhasan446/TriDrop", demo: "https://tri-drop.vercel.app/" },
        image: "tridrop.png"
    },
    {
        title: "CookBot AI App",
        description: "An AI-powered recipe chatbot that suggests dishes based on available ingredients and user health conditions (e.g., diabetes, allergies).",
        tech: ["Python", "Hugging Face", "Mistral 7B", "Full-stack"],
        links: { github: "http://github.com/rowhasan446/Cookbot", demo: "#" },
        image: "/cookbot.png"
    },
    {
        title: "Furniture Website",
        description: "Designed and developed an e-commerce website for a furniture business.",
        tech: ["Next.js", "JavaScript", "MongoDB", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Valexa-Furniture", demo: "https://www.valexafurniture.com/" },
        image: "valexa.png"
    },
    {
        title: "Bus Ticket Booking Website",
        description: "Developed a minimal yet user-friendly bus ticket booking website.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Bus-Ticket-Website", demo: "https://rowhasan446.github.io/Bus-Ticket-Website/" },
        image: "busticket.png"
    },
    {
        title: "Travel Agency Website",
        description: "Developed a travel agency website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Travel-Website", demo: "https://rowhasan446.github.io/Travel-Website/" },
        image: "travel.png"
    },
    {
        title: "Biker Zone Website",
        description: "A biker zone website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend", "DaisyUI"],
        links: { github: "https://github.com/rowhasan446/Biker-Zone-DaisyUi-", demo: "https://rowhasan446.github.io/Biker-Zone-DaisyUi-/" },
        image: "bike.png"
    },
    {
        title: "Alpha Clash Pro",
        description: "A webstie to practice your typing skill with fun gaming mode.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend", "DaisyUI"],
        links: { github: "https://github.com/rowhasan446/Alpha-Clash-Pro", demo: "https://rowhasan446.github.io/Alpha-Clash-Pro/" },
        image: "alphaclash.png"
    },
    {
        title: "Jacket Website",
        description: "A jacket website with a user-friendly interface and responsive design.",
        tech: ["JavaScript", "HTML", "CSS", "Frontend", "DaisyUI"],
        links: { github: "https://github.com/rowhasan446/Jacket-Website-Responsive-landing-page-", demo: "https://rowhasan446.github.io/Jacket-Website-Responsive-landing-page-" },
        image: "jacket.png"
    },
    {
        title: "Influencer Gear",
        description: "An influencer gear website with a user-friendly interface and responsive design.",
        tech: ["HTML", "CSS", "Frontend"],
        links: { github: "https://github.com/rowhasan446/Influencer-Gear", demo: "https://rowhasan446.github.io/Influencer-Gear/" },
        image: "influencer.png"
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-6 relative z-10">
            <div className="container mx-auto max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-16 text-center"
                >
                    <span className="text-cyan-400">Featured</span> Projects
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2 shadow-sm"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black text-white transition-all transform hover:scale-110">
                                        <FaGithub size={20} />
                                    </a>
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black text-white transition-all transform hover:scale-110">
                                        <FaExternalLinkAlt size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.slice(0, 4).map((t) => (
                                        <span key={t} className="px-2 py-1 text-xs font-medium bg-cyan-400/10 text-cyan-400 rounded-md border border-cyan-400/20">
                                            {t}
                                        </span>
                                    ))}
                                    {project.tech.length > 4 && (
                                        <span className="px-2 py-1 text-xs font-medium text-gray-400">
                                            +{project.tech.length - 4}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg font-medium text-sm hover:bg-cyan-300 transition-colors"
                                    >
                                        <FaExternalLinkAlt size={14} /> Live Demo
                                    </a>
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
                                    >
                                        <FaGithub size={16} /> View Code
                                    </a>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://github.com/rowhasan446"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 rounded-full font-medium"
                    >
                        View More on GitHub <FaGithub />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
