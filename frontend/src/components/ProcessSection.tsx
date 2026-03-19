"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Settings, Database, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery Protocol",
    desc: "Intelligence gathering to map your project's neural topography and strategic objectives.",
    icon: Brain,
    color: "from-blue-600 to-cyan-500"
  },
  {
    num: "02",
    title: "Elite Architecture",
    desc: "Engineering the blueprints for a high-performance, fullstack digital ecosystem.",
    icon: Settings,
    color: "from-purple-600 to-pink-500"
  },
  {
    num: "03",
    title: "Hyper-Development",
    desc: "Rapid execution using Next.js 16 and Python, merging speed with bulletproof precision.",
    icon: Database,
    color: "from-cyan-600 to-blue-500"
  },
  {
    num: "04",
    title: "Mission Launch",
    desc: "Automated deployment and protocol verification to dominate your digital frontier.",
    icon: Rocket,
    color: "from-orange-600 to-yellow-500"
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6"
          >
            Our Operational Flow
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            The Digital <span className="text-gradient">Protocol.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative group text-center lg:text-left"
            >
              <div className="relative mb-12 flex justify-center lg:justify-start">
                <div className={`w-28 h-28 rounded-[2.5rem] bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                  <div className="w-full h-full bg-[#050505] rounded-[2.4rem] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-3 text-[10px] font-black text-white/20">{step.num}</div>
                    <step.icon className="w-10 h-10 text-white relative z-10" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
