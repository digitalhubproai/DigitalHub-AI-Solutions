"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "How Agentic AI is Reshaping Web Agencies in 2026",
    category: "AI Intel",
    date: "March 15, 2026",
    excerpt: "Discover the paradigm shift from basic chatbots to autonomous digital workers capable of managing entire marketing funnels."
  },
  {
    title: "Next.js 16: The Ultimate Stack for Scale",
    category: "Engineering",
    date: "March 10, 2026",
    excerpt: "Why we abandoned legacy stacks and moved exclusively to Next.js with Server Components for hyper-performance."
  }
];

export default function BlogPreviewSection() {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6"
            >
              Latest Intel
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Executive <span className="text-gradient">Knowledge.</span>
            </h2>
          </div>
          <Link href="/blog" className="group flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.3em] hover:text-primary transition-colors">
            Access All Archives
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {blogPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative glass-dark p-10 rounded-[2.5rem] border border-white/5 group-hover:border-primary/30 transition-all">
                <div className="flex justify-between items-center mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">{post.category}</span>
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                    <Clock size={12} />
                    {post.date}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-6 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed mb-10 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link href="/blog" className="inline-flex items-center gap-4 text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest transition-colors">
                  Decrypt Protocol
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
