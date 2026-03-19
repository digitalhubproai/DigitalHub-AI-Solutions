"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openChat } = useChatbot();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 h-16 rounded-2xl ${
            isScrolled ? "glass-dark shadow-[0_0_30px_rgba(0,163,255,0.1)]" : "bg-transparent"
          }`}
        >
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
              <Image 
                src="/Logo.jpg" 
                alt="DigitalHub AI" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                DIGITAL<span className="text-primary">HUB</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                AI Solutions
              </span>
            </div>
          </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2" />
                </Link>
              ))}
              <button
                onClick={openChat}
                className="ml-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-secondary hover:shadow-[0_0_15px_rgba(0,163,255,0.4)] transition-all duration-300"
              >
                Let&apos;s Talk
              </button>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 px-6 overflow-hidden"
          >
            <div className="glass-dark rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => { openChat(); setIsMobileMenuOpen(false); }}
                className="mt-2 px-4 py-4 bg-primary text-white text-center font-bold rounded-xl"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

