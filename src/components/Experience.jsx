"use client";
import { motion } from "framer-motion";

const experiences = [
    {
        company: "Moment Matters",
        role: "Photographer & Cinematographer",
        period: "2024 - Ongoing",
        description: [
            "Working with the wider development team.",
            "Collaborate with clients to plan, shoot, and edit video content professionally while ensuring timely delivery.",
        ],
    },
    {
        company: "Global Pathway Experts Limited",
        role: "Campus Ambassador",
        period: "2024 - 2025",
        description: [
            "Working with various university students.",
            "Engaged with students, promoted events, and collected leads to enhance brand awareness and outreach.",
        ],
    },
    {
        company: "NSU ACM STUDENT CHAPTER",
        role: "General Member",
        period: "2024 - 2025",
        description: [
            "Worked in a collaborative environment.",
            "Participated in tech events, and gained leadership experience through the cultural group.",
        ],
    },
];

const Experience = () => {
    return (
        <section id="experience" className="py-20 px-6 relative z-10 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-16 text-center"
                >
                    Experience
                </motion.h2>

                <div className="relative border-l border-white/20 ml-4 md:ml-10 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <span className="text-sm text-cyan-400 font-mono mb-2 block">{exp.period}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                <h4 className="text-lg text-gray-400 mb-4">{exp.company}</h4>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm md:text-base">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
