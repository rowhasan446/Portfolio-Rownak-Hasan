"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCommentAlt } from "react-icons/fa";
import ChatModal from "./ChatModal";

const AskAboutMeButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[60] group"
            >
                <div className="relative">
                    {/* Pulsing Aura */}
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />

                    <div className="relative flex items-center gap-3 bg-black/80 border border-white/20 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl hover:border-cyan-400/50 transition-all">
                        <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                            <FaCommentAlt size={18} />
                        </div>
                        <span className="text-white font-bold pr-2">Ask About Me</span>
                    </div>
                </div>
            </motion.button>

            <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default AskAboutMeButton;
