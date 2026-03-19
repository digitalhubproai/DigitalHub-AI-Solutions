"use client";

import React, { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";
import { Brain, Cpu, BarChart3, Shield } from "lucide-react";

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 60, damping: 30, restDelta: 0.001 });
  const displayValue = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const stats = [
  { label: "AI Agents Deployed", value: 48, icon: Brain, color: "text-blue-500", glow: "from-blue-500/20" },
  { label: "Projects Completed", value: 124, icon: Cpu, color: "text-purple-500", glow: "from-purple-500/20" },
  { label: "Global Node Reach", value: 18, icon: BarChart3, color: "text-cyan-500", glow: "from-cyan-500/20" },
  { label: "Uptime Protocol", value: 99.9, suffix: "%", icon: Shield, color: "text-orange-500", glow: "from-orange-500/20" },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="relative text-center p-8 rounded-[2.5rem] transition-all duration-500">
                {/* Visual Flare: Radiant Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${stat.glow} to-transparent opacity-0 group-hover:opacity-10 transition-opacity rounded-[2.5rem]`} />
                
                <div className="mb-8 inline-flex p-4 rounded-2xl glass-dark border border-white/5 group-hover:border-primary/20 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <stat.icon size={28} className={`${stat.color} transition-transform group-hover:rotate-12`} />
                </div>

                <div className="relative">
                  <div className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter flex items-center justify-center gap-1">
                    <Counter value={stat.value} />
                    <span className="text-primary">{stat.suffix || "+"}</span>
                  </div>
                  <div className="h-1 w-12 bg-primary/20 mx-auto rounded-full mb-6 group-hover:w-20 transition-all duration-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-primary transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
