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
                            className="w-full max-w-lg h-[600px] flex flex-col bg-white/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                        <FaRobot size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">Ask About Rownak</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-xs text-gray-400">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === "user" ? "bg-white/10 text-white" : "bg-cyan-400 text-black"}`}>
                                                {msg.role === "user" ? <FaUser /> : <FaRobot />}
                                            </div>
                                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-cyan-400 text-black rounded-tr-none"
                                                    : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none"
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-3 max-w-[85%]">
                                            <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-black text-xs">
                                                <FaRobot />
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggestions & Input */}
                            <div className="p-6 bg-white/5 border-t border-white/10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {suggestedQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleSendMessage(q)}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all disabled:opacity-50"
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
                                        placeholder="Type your question..."
                                        disabled={isLoading}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-400 text-black rounded-xl flex items-center justify-center hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:grayscale"
                                    >
                                        <FaPaperPlane size={16} />
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
