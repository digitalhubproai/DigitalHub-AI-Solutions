"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Cyrus Vance",
    role: "CTO, NeuralWorks",
    content: "DigitalHub AI transformed our legacy backend into a hyper-scalable Next.js ecosystem. Their Agentic AI protocols are legendary.",
    rating: 5
  },
  {
    name: "Elena Rossi",
    role: "CEO, Quantum Creative",
    content: "The branding and UI excellence they delivered is unmatched. Our conversion rates spiked by 40% after the redesign.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Founder, AlphaStream",
    content: "Speed, precision, and autonomy. They didn't just build a site; they engineered a digital asset that grows with us.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6"
          >
            Verified Feedback
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Client <span className="text-gradient">Endorsements.</span>
          </h2>
          <p className="text-gray-500 text-lg font-bold max-w-2xl mx-auto">
            Strategic impact validated by elite leaders in technology and creative industries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative glass-dark p-10 rounded-[2rem] border border-white/5 h-full flex flex-col group-hover:border-primary/30 transition-all duration-500">
                <div className="mb-8 flex justify-between items-start">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, j) => (
                      <Star key={j} size={12} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="text-white/10 w-8 h-8" />
                </div>
                
                <p className="text-white font-bold text-lg mb-10 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-black text-white">
                      {item.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
