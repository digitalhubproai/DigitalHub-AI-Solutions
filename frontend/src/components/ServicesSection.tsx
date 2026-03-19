"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Code, Smartphone, Brain, Sparkles, TrendingUp, Search
} from "lucide-react";
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: "Fullstack Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance and scalability.",
      icon: Code,
      color: "from-cyan-600 to-blue-500",
      delay: 0.1
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      icon: Smartphone,
      color: "from-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      title: "AI Agents & Solutions",
      description: "Intelligent automation systems and AI-powered solutions that streamline your business operations.",
      icon: Brain,
      color: "from-blue-600 to-cyan-500",
      delay: 0.3
    },
    {
      title: "Branding & Design",
      description: "Complete brand identity design including logos, graphics, and UI/UX that make your business stand out.",
      icon: Sparkles,
      color: "from-orange-600 to-yellow-500",
      delay: 0.4
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns, paid advertising, and lead generation to grow your customer base.",
      icon: TrendingUp,
      color: "from-pink-600 to-rose-500",
      delay: 0.5
    },
    {
      title: "SEO",
      description: "Search engine optimization services to improve your rankings and drive organic traffic to your website.",
      icon: Search,
      color: "from-green-600 to-teal-500",
      delay: 0.6
    }
  ];

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4"
          >
            Our Expertise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Next-Gen <span className="text-gradient">Digital Capabilities.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.6 }}
              className="group relative"
            >
              {/* Project-Style Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
              
              <div className="relative glass-dark p-8 rounded-[2rem] border border-white/5 group-hover:border-primary/30 group-hover:-translate-y-2 transition-all overflow-hidden h-full">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8 shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-white mb-4 flex items-center justify-between tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-bold">
                    {service.description}
                  </p>
                  
                  <div className="w-full h-px bg-white/5 mb-6 group-hover:bg-primary/20 transition-colors" />
                  
                  <Link href="/services" className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-[0.2em] transition-colors">
                    Analyze Pipeline
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
