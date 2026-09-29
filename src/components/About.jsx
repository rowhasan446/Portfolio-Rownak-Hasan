"use client";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiMysql } from "react-icons/si";

const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Python", icon: <FaPython className="text-blue-400" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
];

const About = () => {
    return (
        <section id="about" className="py-20 px-6 relative z-10 bg-black/80 dark:bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    {/* Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex justify-center order-2 md:order-1"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-cyan-400/20 shadow-2xl shadow-cyan-400/10 group rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/formal.png"
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </motion.div>

                    {/* Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-1 md:order-2 text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6">About Me</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                            Hi, I'm a passionate Computer Science and Engineering undergraduate at North South University.
                            I hone my skills to build innovative web and full-stack applications. With a strong foundation in modern web technologies,
                            I thrive on turning ideas into interactive, user-friendly experiences.
                        </p>
                        <div className="flex justify-center md:justify-start gap-8">
                            <div className="pe-8 border-r border-black/10 dark:border-white/10">
                                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">3+</h3>
                                <p className="text-cyan-600 dark:text-cyan-400 text-xs md:text-sm uppercase tracking-wider">Years Exp.</p>
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">20+</h3>
                                <p className="text-cyan-600 dark:text-cyan-400 text-xs md:text-sm uppercase tracking-wider">Projects</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-12">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, borderColor: "rgba(34, 211, 238, 0.5)" }}
                            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4 transition-colors hover:bg-black/10 dark:hover:bg-white/10 shadow-sm"
                        >
                            <div className="text-3xl md:text-4xl">{skill.icon}</div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Infinite Loop Logo Marquee under skills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative w-full overflow-hidden py-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/40 backdrop-blur-md shadow-inner"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee flex gap-6 md:gap-10 items-center">
                        {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
                            <div
                                key={`${skill.name}-${idx}`}
                                className="flex items-center gap-3 px-5 py-2.5 bg-white/5 dark:bg-white/5 border border-white/10 rounded-full shrink-0 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300 shadow-md group cursor-pointer"
                            >
                                <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                                <span className="text-gray-200 dark:text-gray-200 font-semibold text-sm md:text-base whitespace-nowrap">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default About;
