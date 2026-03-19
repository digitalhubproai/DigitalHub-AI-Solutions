"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Shield, Zap, Globe } from "lucide-react";

const faqs = [
  {
    q: "How does Agentic AI differ from standard automation?",
    a: "Standard automation follows rigid scripts. Agentic AI uses autonomous reasoning to adapt to new data, make decisions, and execute multi-step workflows without constant human intervention.",
    icon: Zap
  },
  {
    q: "What is your typical project architecture?",
    a: "We architect elite fullstack ecosystems using Next.js 16 for high-performance frontends and Python-powered backends (FastAPI/Django) for hyper-scalable logic and AI integration.",
    icon: Globe
  },
  {
    q: "Is our data secure within your AI protocols?",
    a: "Security is our primary directive. We implement enterprise-grade encryption, zero-trust architecture, and strict data isolation protocols for all AI training and execution phases.",
    icon: Shield
  },
  {
    q: "How long does a mission-critical deployment take?",
    a: "Depending on complexity, we deliver high-impact MVPs in 4-6 weeks and full-scale enterprise ecosystems in 3-5 months, following our rigorous 'Digital Protocol'.",
    icon: MessageSquare
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] font-black uppercase tracking-[0.5em] text-primary mb-5"
          >
            Tactical Intel
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            The <span className="text-gradient">Protocol.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`cursor-pointer glass-dark border rounded-2xl p-6 transition-all duration-500 ${openIndex === i ? "border-primary/40 bg-white/5" : "border-white/5 hover:border-white/20"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5 text-left">
                    <div className={`p-2.5 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors ${openIndex === i ? "text-primary" : "text-gray-500"}`}>
                      <faq.icon size={18} />
                    </div>
                    <h3 className="text-sm md:text-base font-black text-white uppercase tracking-tight">{faq.q}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    className="text-gray-500 group-hover:text-primary transition-colors flex-shrink-0"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 text-xs md:text-sm text-gray-500 font-bold leading-relaxed border-t border-white/5 mt-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
