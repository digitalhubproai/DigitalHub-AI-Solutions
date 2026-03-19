"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "EcoAgent Intelligence",
    category: "AI Automation",
    desc: "Autonomous supply chain optimizer reducing carbon footprint by 42%.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "Quantum Ledger",
    category: "Web Development",
    desc: "Next-gen fintech dashboard with real-time neural processing.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    id: 3,
    title: "NeuroSeo Engines",
    category: "Programmatic Marketing",
    desc: "AI-driven content network generating 2M+ monthly organic leads.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    color: "from-cyan-500/20 to-blue-600/20"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6"
          >
            Digital Portfolio
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-8"
          >
            Built for <span className="text-gradient">Impact.</span>
          </motion.h2>
          <p className="text-gray-500 text-lg font-bold max-w-2xl mx-auto">
            From autonomous agents to hyper-scalable infrastructure, see how 
            we&apos;re redefining the boundaries of the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative glass-dark border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-6 right-6 flex gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <Github size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center justify-between group-hover:text-primary transition-colors">
                    {project.title}
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-gray-500 text-sm font-bold leading-relaxed mb-8">
                    {project.desc}
                  </p>
                  
                  <Link href={`/projects/${project.id}`} className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    Explore Case Study
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

