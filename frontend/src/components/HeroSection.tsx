"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";

export default function HeroSection() {
  const { openChat } = useChatbot();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          className="flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Digital Solutions</span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] max-w-5xl mx-auto"
          >
            We Build <span className="text-gradient">Digital Products</span> That Grow Your Business.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }
            }}
            className="text-gray-400 text-lg md:text-xl font-bold mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            From custom Websites and Mobile Apps that wow users, to AI Agents that work 24/7, 
            stunning Branding that gets you noticed, and Marketing + SEO that drives real customers. 
            We're your complete digital growth partner.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white transition-all duration-300 bg-primary rounded-2xl hover:bg-secondary hover:shadow-[0_0_40px_rgba(0,163,255,0.5)] active:scale-95"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={openChat}
              className="group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-gray-300 transition-all duration-300 glass hover:text-white hover:bg-white/5 rounded-2xl active:scale-95"
            >
              <Bot className="mr-2 w-5 h-5 group-hover:text-primary transition-colors" />
              Talk to AI Agent
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

