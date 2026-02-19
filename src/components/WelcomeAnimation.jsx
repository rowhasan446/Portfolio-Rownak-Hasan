"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BinaryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Handle High DPI
        let width, height;
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
        };
        setCanvasSize();

        const fontSize = 16;
        const columns = Math.ceil(width / fontSize);
        const drops = Array(columns).fill(0).map(() => Math.random() * -100);

        const draw = () => {
            // Very low opacity black overlay to create fading trails
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);

            // Binary characters - slightly brighter for visibility as requested
            ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? "1" : "0";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 0.8; // Slower, smoother drop speed
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        window.addEventListener("resize", setCanvasSize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none select-none opacity-[0.9]"
        />
    );
};

const WelcomeAnimation = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const name = "ROWNAK";
    const letters = name.split("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 3500); // 3.5s total show time

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96],
                when: "afterChildren",
            },
        },
    };

    const letterVariants = {
        initial: {
            opacity: 0,
            y: 40,
            filter: "blur(20px)",
            scale: 0.75,
        },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 1.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
        exit: (i) => ({
            opacity: 0,
            y: -40,
            filter: "blur(20px)",
            transition: {
                duration: 0.8,
                delay: (letters.length - 1 - i) * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96],
            },
        }),
    };

    const glowVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: [0, 0.2, 0.1],
            scale: [0.8, 1.25, 1],
            transition: {
                duration: 3,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate={isExiting ? "exit" : "animate"}
            onAnimationComplete={(definition) => {
                if (definition === "exit") {
                    onComplete();
                }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden font-outfit"
        >
            <BinaryBackground />

            <div className="relative flex items-center justify-center">
                {/* Silver/White radial glow */}
                <motion.div
                    variants={glowVariants}
                    className="absolute w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full"
                />

                <div className="relative flex gap-2 md:gap-6 px-4">
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            className="text-6xl md:text-9xl font-black text-white tracking-tighter pointer-events-none select-none"
                            style={{
                                textShadow: "0 0 40px rgba(255, 255, 255, 0.25), 0 0 80px rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeAnimation;
