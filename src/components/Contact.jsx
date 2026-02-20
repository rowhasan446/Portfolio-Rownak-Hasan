"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <section id="contact" className="py-20 px-6 relative z-10">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6">Get In Touch</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Have a project in mind or just want to say hi? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl shadow-sm">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3 className="font-bold text-black dark:text-white">Email</h3>
                                <p>rowhasan446@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl shadow-sm">
                                <FaPhone />
                            </div>
                            <div>
                                <h3 className="font-bold text-black dark:text-white">Phone</h3>
                                <p>+88 01867019582</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl shadow-sm">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3 className="font-bold text-black dark:text-white">Location</h3>
                                <p>Rampura, Dhaka - 1219</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-sm"
                            />
                        </div>
                        <div>
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-sm"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
