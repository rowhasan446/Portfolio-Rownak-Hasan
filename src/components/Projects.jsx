"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [

    {
        title: "Quantum Machine Learning - AI/ML Project",
        description: "A research purpose big project about quantum machine learning that predicts diabetes. ",
        tech: ["Python", "TensorFlow", "Keras", "scikit-learn", "Random Forest", "Pandas", "NumPy"],
        links: {
            github: "https://github.com/rowhasan446/DiaLedger-with-QML",
            demo: "https://dialedger.vercel.app/"
        },
        image: "QML.png"
    },
    {
        title: "AB Leathers - Ecommerce Website",
        description: "A comprehensive e-commerce website that allows users to browse, book, and manage leather goods with ease.",
        tech: ["Nextjs", "HTML", "Tailwind CSS", "Firebase", "MongoDB", "Full-stack"],
        links: {
            github: "https://github.com/rowhasan446/AB-Leather",
            demo: "https://ab-leathers.com"
        },
        image: "ab-leather.png"
    },
    {
        title: "Heart Disease Risk Checker",
        description: "Interactive web app that estimates heart disease risk using patient inputs (age, cholesterol, chest pain, etc.). Educational ML demo with live prediction.",
        tech: ["Python", "Streamlit", "scikit-learn", "Random Forest", "Pandas", "NumPy"],
        links: {
            github: "https://github.com/rowhasan446/Heart-Disease-Checker-ML-Project-",
            demo: "https://heartdiseasepredictior.streamlit.app/"
        },
        image: "Heart.png"
    },
    {
        title: "BashaChai - Home rental Service Website",
        description: "A comprehensive home rental service website that allows users to browse, book, and manage rental properties with ease.",
        tech: ["Nextjs", "HTML", "Tailwind CSS", "Firebase", "MongoDB", "Full-stack"],
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

const ProjectCardWithGlare = ({ project, index }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0, opacity: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setMousePos({ x, y, rotateX, rotateY, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setMousePos((prev) => ({ ...prev, rotateX: 0, rotateY: 0, opacity: 0 }));
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg)`,
                transition: "transform 0.15s ease-out",
            }}
            className="group relative bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/60 transition-colors duration-300 shadow-md transform-style-3d"
        >
            {/* Dynamic Glare Reflection Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
                style={{
                    opacity: mousePos.opacity,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.25), rgba(34, 211, 238, 0.12) 40%, transparent 80%)`,
                }}
            />

            {/* Linear Glare Sheen Line */}
            <div
                className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                    background: `linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.15) 50%, transparent 65%)`,
                }}
            />

            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black text-white transition-all transform hover:scale-110">
                        <FaGithub size={20} />
                    </a>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-cyan-400 hover:text-black text-white transition-all transform hover:scale-110">
                        <FaExternalLinkAlt size={20} />
                    </a>
                </div>
            </div>

            <div className="p-6 relative z-10">
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

            {/* Hover Glow Accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

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
                        <ProjectCardWithGlare key={index} project={project} index={index} />
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

