"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FunZone from "@/components/FunZone";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeAnimation key="welcome" onComplete={() => setShowWelcome(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Hero />
            <About />
            <Projects />
            <Experience />
            <FunZone />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
