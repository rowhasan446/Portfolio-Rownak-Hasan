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
                                src="/formal portrait.png"
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
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
            </div>

        </section>
    );
};

export default About;
