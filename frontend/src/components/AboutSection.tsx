"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Code, Megaphone } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const cards = [
    {
      icon: Brain,
      title: "AI Solutions",
      desc: "Intelligent automation systems that transform your business operations and drive growth.",
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: Code,
      title: "Web Development",
      desc: "Modern, responsive websites and web applications built with cutting-edge technology.",
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      desc: "Data-driven marketing strategies that boost your online presence and deliver results.",
      color: "from-cyan-600 to-blue-500"
    }
  ];

  const techStack = ["AI Solutions", "Web Development", "Digital Marketing", "SEO", "Branding", "Automation"];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              About DigitalHub
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tight"
            >
              Transforming Your <br />
              <span className="text-gradient">Digital Presence.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed mb-12"
            >
              DigitalHub AI Solutions is your trusted partner for web development, AI solutions, and digital marketing. We build modern websites and implement smart strategies that help your business grow and succeed online.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest hover:bg-white/10 transition-colors">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-primary text-white text-xs font-black tracking-widest uppercase rounded-2xl hover:bg-secondary transition-all shadow-lg shadow-primary/20"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
                
                <div className="relative glass-dark p-8 rounded-[2rem] border border-white/5 group-hover:border-primary/30 transition-all flex items-center gap-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} p-0.5 group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg`}>
                    <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-gray-500 text-sm font-bold leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

