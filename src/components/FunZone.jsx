"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaJs, FaPython, FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaGithub, FaBug, FaCode, FaBrain, FaGamepad } from "react-icons/fa";
import confetti from "canvas-confetti";

// --- Shared Components ---
const GameCard = ({ children, className = "" }) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm ${className}`}>
        {children}
    </div>
);

// --- Game 1: Memory Match ---
const cardsData = [
    { id: 1, type: "react", icon: <FaReact className="text-cyan-400" /> },
    { id: 2, type: "js", icon: <FaJs className="text-yellow-400" /> },
    { id: 3, type: "python", icon: <FaPython className="text-blue-400" /> },
    { id: 4, type: "node", icon: <FaNodeJs className="text-green-500" /> },
    { id: 5, type: "html", icon: <FaHtml5 className="text-orange-500" /> },
    { id: 6, type: "css", icon: <FaCss3Alt className="text-blue-500" /> },
    { id: 7, type: "db", icon: <FaDatabase className="text-gray-400" /> },
    { id: 8, type: "github", icon: <FaGithub className="text-white" /> },
];

const MemoryMatch = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        shuffleCards();
    }, []);
    const shuffleCards = () => {
        const duplicatedCards = [...cardsData, ...cardsData].map((card, index) => ({
            ...card,
            uniqueId: index,
        }));

        for (let i = duplicatedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [duplicatedCards[i], duplicatedCards[j]] = [duplicatedCards[j], duplicatedCards[i]];
        }

        setCards(duplicatedCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (card) => {
        if (flippedCards.length === 2 || flippedCards.some((c) => c.uniqueId === card.uniqueId) || matchedCards.includes(card.type)) return;

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves((prev) => prev + 1);
            checkForMatch(newFlippedCards);
        }
    };

    const checkForMatch = (currentFlippedCards) => {
        const [card1, card2] = currentFlippedCards;
        if (card1.type === card2.type) {
            setMatchedCards((prev) => [...prev, card1.type]);
            setFlippedCards([]);
        } else {
            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    useEffect(() => {
        if (matchedCards.length === cardsData.length && cardsData.length > 0) {
            setGameWon(true);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#22d3ee', '#facc15', '#4ade80'] });
        }
    }, [matchedCards]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-8 mb-8 text-xl font-mono text-cyan-400">
                <div>Moves: <span className="text-white">{moves}</span></div>
                <div>Matches: <span className="text-white">{matchedCards.length} / {cardsData.length}</span></div>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-lg mx-auto">
                {cards.map((card) => {
                    const isFlipped = flippedCards.some((c) => c.uniqueId === card.uniqueId) || matchedCards.includes(card.type);
                    return (
                        <motion.div
                            key={card.uniqueId}
                            className={`relative w-14 h-18 md:w-20 md:h-24 cursor-pointer transform-style-3d transition-all duration-500`}
                            onClick={() => handleCardClick(card)}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg md:rounded-xl flex items-center justify-center backface-hidden">
                                <span className="text-xl md:text-2xl text-cyan-400/50">?</span>
                            </div>
                            <div className="absolute inset-0 bg-white/10 border-2 border-cyan-400 rounded-lg md:rounded-xl flex items-center justify-center backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                                <div className="text-2xl md:text-3xl">{card.icon}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {gameWon && (
                <button onClick={shuffleCards} className="mt-8 px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all">Play Again</button>
            )}
        </div>
    );
};

// --- Game 2: Code Trivia ---
const triviaQuestions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlinks and Text Markup", "Home Tool Markup Language"], correct: 0 },
    { question: "Which symbol is used for comments in JavaScript?", options: ["<!-- -->", "//", "#", "/* */"], correct: 1 },
    { question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useReducer"], correct: 1 },
    { question: " What is the correct file extension for Python?", options: [".pyt", ".pt", ".py", ".python"], correct: 2 },
    { question: "Which method joins array elements into a string?", options: ["concat()", "join()", "merge()", "append()"], correct: 1 },
];

const CodeTrivia = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAnswer = (index) => {
        setSelectedOption(index);
        if (index === triviaQuestions[currentQ].correct) setScore(score + 1);

        setTimeout(() => {
            if (currentQ < triviaQuestions.length - 1) {
                setCurrentQ(currentQ + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
                if (score >= 3) confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
            }
        }, 1000);
    };

    const resetGame = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <GameCard className="max-w-xl mx-auto text-center w-full">
            {!showResult ? (
                <>
                    <div className="mb-6 flex justify-between text-cyan-400 font-mono">
                        <span>Question {currentQ + 1}/{triviaQuestions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                    <h3 className="text-xl text-white font-bold mb-8 h-16 flex items-center justify-center">
                        {triviaQuestions[currentQ].question}
                    </h3>
                    <div className="grid gap-4">
                        {triviaQuestions[currentQ].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={selectedOption !== null}
                                className={`p-4 rounded-xl text-left transition-all ${selectedOption !== null
                                    ? index === triviaQuestions[currentQ].correct
                                        ? "bg-green-500/20 border-green-500 text-green-400"
                                        : index === selectedOption
                                            ? "bg-red-500/20 border-red-500 text-red-400"
                                            : "bg-white/5 border-white/10 opacity-50"
                                    : "bg-white/5 border-white/10 hover:bg-cyan-400/10 hover:border-cyan-400 text-gray-300"
                                    } border`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="py-8">
                    <h3 className="text-3xl text-white font-bold mb-4">Quiz Complete!</h3>
                    <p className="text-xl text-gray-300 mb-8">You scored <span className="text-cyan-400 font-bold">{score}</span> out of {triviaQuestions.length}</p>
                    <button onClick={resetGame} className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all">Retry Quiz</button>
                </div>
            )}
        </GameCard>
    );
};

// --- Game 3: Bug Smasher ---
const BugSmasher = () => {
    const [bugs, setBugs] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
                spawnBug();
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    const spawnBug = () => {
        const id = Math.random();
        const top = Math.random() * 80 + 10; // 10% to 90%
        const left = Math.random() * 80 + 10;
        setBugs((prev) => [...prev, { id, top, left }]);

        // Remove bug after 2 seconds if not clicked
        setTimeout(() => {
            setBugs((prev) => prev.filter((b) => b.id !== id));
        }, 2000);
    };

    const smashBug = (id) => {
        setBugs((prev) => prev.filter((b) => b.id !== id));
        setScore((prev) => prev + 1);
        // Play sound effect could go here
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setBugs([]);
        setIsPlaying(true);
    };

    return (
        <GameCard className="max-w-2xl mx-auto w-full relative overflow-hidden h-[400px]">
            {!isPlaying && timeLeft === 30 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                    <h3 className="text-2xl text-white font-bold mb-4">Bug Smasher!</h3>
                    <p className="text-gray-300 mb-6">Click the bugs before they disappear!</p>
                    <button onClick={startGame} className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all">Start Game</button>
                </div>
            ) : null}

            {!isPlaying && timeLeft === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                    <h3 className="text-3xl text-white font-bold mb-4">Time's Up!</h3>
                    <p className="text-xl text-gray-300 mb-8">Bugs Smashed: <span className="text-cyan-400 font-bold">{score}</span></p>
                    <button onClick={startGame} className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all">Play Again</button>
                </div>
            )}

            <div className="flex justify-between font-mono text-lg text-cyan-400 mb-4 border-b border-white/10 pb-4">
                <span>Time: {timeLeft}s</span>
                <span>Score: {score}</span>
            </div>

            <div ref={containerRef} className="relative w-full h-full">
                <AnimatePresence>
                    {bugs.map((bug) => (
                        <motion.button
                            key={bug.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute text-red-500 hover:text-red-400 transition-colors p-2"
                            style={{ top: `${bug.top}%`, left: `${bug.left}%` }}
                            onClick={() => smashBug(bug.id)}
                        >
                            <FaBug size={32} />
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </GameCard>
    );
};

// --- Main Hub Component ---
const FunZone = () => {
    const [activeTab, setActiveTab] = useState("memory");

    return (
        <section id="fun-zone" className="py-20 px-6 relative z-10 bg-black/30">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        <span className="text-cyan-400">Fun</span> Zone
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Coding doesn't have to be serious all the time. Challenge yourself with these mini-games!
                    </p>
                </motion.div>

                {/* Game Navigation */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab("memory")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${activeTab === "memory" ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <FaBrain /> Memory Match
                    </button>
                    <button
                        onClick={() => setActiveTab("trivia")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${activeTab === "trivia" ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <FaCode /> Code Trivia
                    </button>
                    <button
                        onClick={() => setActiveTab("bugs")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${activeTab === "bugs" ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <FaBug /> Bug Smasher
                    </button>
                </div>

                {/* Game Display Area */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "memory" && (
                            <motion.div key="memory" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                <MemoryMatch />
                            </motion.div>
                        )}
                        {activeTab === "trivia" && (
                            <motion.div key="trivia" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                <CodeTrivia />
                            </motion.div>
                        )}
                        {activeTab === "bugs" && (
                            <motion.div key="bugs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                <BugSmasher />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FunZone;
