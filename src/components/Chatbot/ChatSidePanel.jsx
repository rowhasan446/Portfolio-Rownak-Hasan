"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaRobot, FaUser } from "react-icons/fa";

const suggestedQuestions = [
    "What are his skills?",
    "Tell me about his education",
    "What projects has he built?",
    "What experience does he have?",
];

const ChatSidePanel = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm Rownak's AI assistant. Ask me anything about his professional background!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (text) => {
        const messageText = text || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage = { role: "user", content: messageText };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageText }),
            });

            const data = await response.json();
            if (data.response) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
            } else {
                throw new Error(data.error || "Something went wrong");
            }
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
                    />
                )}
                {isOpen && (
                    <motion.div
                        key="chat-side-panel"
                        initial={{ x: "100%", opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.5 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-md md:max-w-lg bg-[#0a0a0a]/95 border-l border-white/10 z-[60] flex flex-col shadow-2xl backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                        <FaRobot size={24} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0a0a0a] animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg tracking-tight">AI Assistant</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">Online & Ready</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 group"
                            >
                                <FaTimes size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={`msg-${idx}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs ${msg.role === "user" ? "bg-white/10 text-white" : "bg-cyan-500/20 text-cyan-400"}`}>
                                            {msg.role === "user" ? <FaUser /> : <FaRobot />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-[14px] leading-relaxed ${msg.role === "user"
                                            ? "bg-cyan-500 text-black font-medium"
                                            : "bg-white/5 text-gray-200 border border-white/5"
                                            }`}>
                                            {msg.content.split('\n').map((line, i) => (
                                                <div key={`line-${i}`}>
                                                    {line.split(/\[([^\]]+)\]\(([^)]+)\)/g).map((part, index, array) => {
                                                        if (index % 3 === 1) {
                                                            const url = array[index + 1];
                                                            return (
                                                                <a
                                                                    key={`link-${index}`}
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-cyan-400 hover:underline font-bold"
                                                                >
                                                                    {part}
                                                                </a>
                                                            );
                                                        }
                                                        if (index % 3 === 2) return null;
                                                        return (
                                                            <span key={`text-${idx}-${i}-${index}`}>
                                                                {part.split(/(\*\*.*?\*\*)/g).map((text, j) => {
                                                                    if (text.startsWith('**') && text.endsWith('**')) {
                                                                        return (
                                                                            <strong key={`bold-${j}`} className="text-white font-semibold">
                                                                                {text.replace(/\*\*/g, '')}
                                                                            </strong>
                                                                        );
                                                                    }
                                                                    return text;
                                                                })}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                            <FaRobot />
                                        </div>
                                        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-gradient-to-t from-black to-transparent border-t border-white/5">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {suggestedQuestions.map((q) => (
                                    <button
                                        key={`q-${q}`}
                                        onClick={() => handleSendMessage(q)}
                                        disabled={isLoading}
                                        className="px-3 py-1.5 text-[11px] bg-white/5 border border-white/5 text-gray-400 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/20 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 active:scale-95"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    disabled={isLoading}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 transition-all duration-300 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 text-black rounded-lg flex items-center justify-center hover:bg-cyan-400 active:scale-90 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                                >
                                    <FaPaperPlane size={16} />
                                </button>
                            </form>
                            <p className="text-[10px] text-gray-500 text-center mt-4 uppercase tracking-[0.1em]">
                                Powered by Rownak's Portfolio AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 211, 238, 0.2);
                }
            `}</style>
        </>
    );
};

export default ChatSidePanel;
