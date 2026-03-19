"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const blogPosts = [
  {
    title: "How Agentic AI is Reshaping Web Agencies in 2026",
    category: "Artificial Intelligence",
    date: "March 15, 2026",
    excerpt: "Discover the paradigm shift from basic chatbots to autonomous digital workers capable of managing entire marketing funnels."
  },
  {
    title: "Next.js 15: The Ultimate Stack for Scale",
    category: "Web Development",
    date: "March 10, 2026",
    excerpt: "Why we abandoned legacy stacks and moved exclusively to Next.js with Server Components."
  },
  {
    title: "Zero-Waste Ad Spend: Programmatic Marketing",
    category: "Digital Marketing",
    date: "March 5, 2026",
    excerpt: "Learn how to utilize machine learning to eliminate wasted ad spend in high-competition niches."
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-32 relative bg-[#050505]">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6"
            >
              Intel Transmission
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight">
              Strategic <span className="text-gradient">Insights.</span>
            </h2>
            <p className="text-gray-500 text-lg font-bold">
              Stay ahead of the neural curve. Actionable protocols on AI and high-performance engineering.
            </p>
          </div>
          <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xs font-black text-white transition-all bg-primary rounded-2xl hover:bg-secondary hover:shadow-[0_0_30px_rgba(0,163,255,0.3)] tracking-widest uppercase">
            Access All Archives
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative h-full"
            >
              {/* Project-Style Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative glass-dark border border-white/5 p-10 rounded-[2rem] h-full flex flex-col transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{post.category}</span>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-6 group-hover:text-primary transition-colors leading-[1.2]">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed mb-10 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="pt-8 border-t border-white/5 flex justify-between items-center mt-auto">
                  <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{post.date}</span>
                  <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors cursor-pointer">
                    Decrypt Article 
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
