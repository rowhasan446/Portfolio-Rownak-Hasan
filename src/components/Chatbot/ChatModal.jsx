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

const ChatModal = ({ isOpen, onClose }) => {
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl h-[700px] flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] ring-1 ring-white/20"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/10 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                            <FaRobot size={24} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-[#0a0a0a] animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg tracking-tight">AI Assistant</h3>
                                        <span className="text-xs text-cyan-400 font-medium uppercase tracking-widest">Always Active</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex gap-4 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm ${msg.role === "user" ? "bg-white/10 text-white border border-white/10" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}`}>
                                                {msg.role === "user" ? <FaUser /> : <FaRobot />}
                                            </div>
                                            <div className={`p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === "user"
                                                ? "bg-cyan-500 text-black rounded-tr-none font-medium"
                                                : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md"
                                                }`}>
                                                {msg.content.split('\n').map((line, i) => (
                                                    <div key={i}>
                                                        {line.split(/\[([^\]]+)\]\(([^)]+)\)/g).map((part, index, array) => {
                                                            if (index % 3 === 1) {
                                                                const url = array[index + 1];
                                                                return (
                                                                    <a
                                                                        key={index}
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
                                                            return part.split(/(\*\*.*?\*\*)/g).map((text, j) => {
                                                                if (text.startsWith('**') && text.endsWith('**')) {
                                                                    return <strong key={j} className="text-white font-semibold">{text.replace(/\*\*/g, '')}</strong>;
                                                                }
                                                                return text;
                                                            });
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-4 max-w-[85%]">
                                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                                                <FaRobot />
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none flex items-center gap-2">
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggestions & Input */}
                            <div className="p-8 bg-white/5 border-t border-white/10 backdrop-blur-md">
                                <div className="flex flex-wrap gap-2.5 mb-6">
                                    {suggestedQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleSendMessage(q)}
                                            disabled={isLoading}
                                            className="px-4 py-2 text-xs bg-white/5 border border-white/10 text-gray-300 rounded-2xl hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 active:scale-95"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                    className="relative group"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        disabled={isLoading}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-7 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 text-black rounded-xl flex items-center justify-center hover:bg-cyan-400 active:scale-90 transition-all duration-300 disabled:opacity-50 disabled:grayscale shadow-lg shadow-cyan-500/20"
                                    >
                                        <FaPaperPlane size={18} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ChatModal;
