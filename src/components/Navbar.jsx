"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-4 shadow-lg" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black dark:text-white z-50">
          ROWNAK<span className="text-cyan-400">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://github.com/rowhasan446"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-xl"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:rowhasan446@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-xl"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 text-black dark:text-white"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-left transition-all"
              />
              <motion.span
                animate={mobileMenuOpen ? { x: 50, opacity: 0 } : { x: 0, opacity: 1 }}
                className="w-full h-0.5 bg-current block transition-all"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-left transition-all"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={mobileMenuOpen ? { opacity: 1, height: "100vh" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center gap-8 text-center"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-bold text-black dark:text-white hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <div className="flex gap-8 mt-4">
          <a
            href="https://github.com/rowhasan446"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white text-3xl"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:rowhasan446@gmail.com"
            className="text-black dark:text-white text-3xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};


export default Navbar;
