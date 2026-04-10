"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Al-Haramain Travel",
    category: "Travel & Tourism Website",
    desc: "Professional travel and tourism website for Al-Haramain Travel. Offering premium travel services, tour packages, and booking solutions for travelers.",
    image: "/Al-Haramain-Travel.png",
    link: "https://al-haramin.vercel.app/",
    color: "from-emerald-500/20 to-teal-500/20",
    github: undefined
  },
  {
    id: 2,
    title: "Passion & Profit",
    category: "Business Consulting Website",
    desc: "Professional B2B consulting platform for freelancers and small businesses. Features lead generation funnels, coaching programs, and automated marketing systems.",
    image: "/passion-profit.png",
    link: "https://passion-profit.com",
    color: "from-blue-500/20 to-cyan-500/20",
    github: undefined
  },
  {
    id: 2,
    title: "DigitalHub AI Platform",
    category: "Web Development",
    desc: "Full-stack AI-powered business solutions platform with intelligent chatbot, lead capture, and automated email marketing integration.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    color: "from-purple-500/20 to-blue-500/20",
    github: undefined
  },
  {
    id: 3,
    title: "AI Marketing Automation",
    category: "Digital Marketing & AI",
    desc: "AI-driven marketing automation system that generates qualified leads through intelligent content optimization and programmatic advertising.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    color: "from-cyan-500/20 to-blue-600/20",
    github: undefined
  },
  {
    id: 4,
    title: "Adresta",
    category: "Blockchain & Digital Identity",
    desc: "Swiss SaaS platform creating blockchain-based digital certificates for luxury watches. Digital twins, warranty management, and after-sales ecosystem.",
    image: "/adresta.png",
    link: "https://adresta.ch",
    color: "from-amber-500/20 to-orange-500/20",
    github: undefined
  },
  {
    id: 5,
    title: "Greenlight Consulting",
    category: "Agentic AI & Automation",
    desc: "Enterprise AI consulting firm specializing in agentic AI, process orchestration, and intelligent automation. UiPath Diamond Partner with global delivery.",
    image: "/greenlight.png",
    link: "https://greenlightconsulting.com",
    color: "from-green-500/20 to-lime-500/20",
    github: undefined
  },
  {
    id: 6,
    title: "Wagtails Essex",
    category: "Pet Care & Services",
    desc: "Premium dog care facility in Essex offering day care, puppy care, training, walking, and private dog parks. 5-star licensed with online booking system.",
    image: "/wagtails.png",
    link: "https://wagtails.co.uk",
    color: "from-teal-500/20 to-emerald-500/20",
    github: undefined
  },
  {
    id: 7,
    title: "Punjabi Touch Booklet",
    category: "Print Design & Branding",
    desc: "Elegant restaurant menu booklet design for Punjabi Touch Indian Restaurant. Traditional aesthetics with modern layout, showcasing authentic cuisine.",
    image: "/punjabitouch.webp",
    link: "https://dribbble.com/shots/22944402-Punjabi-Touch-Booklet",
    color: "from-red-500/20 to-orange-500/20",
    github: undefined
  },
  {
    id: 8,
    title: "Book Cover AlgoTrader",
    category: "Print Design & Book Cover",
    desc: "Professional book cover design for AlgoTrader - algorithmic trading guide. Modern financial aesthetic with bold typography and data-driven visuals.",
    image: "/algotrader.webp",
    link: "https://dribbble.com/shots/17557153-Book-Cover-AlgoTrader",
    color: "from-indigo-500/20 to-purple-500/20",
    github: undefined
  },
  {
    id: 9,
    title: "EximPortHub",
    category: "Logo Design & Branding",
    desc: "Professional logo design for EximPortHub - UK-based international import/export company specializing in medical supplies and goods worldwide.",
    image: "/eximporthub.webp",
    link: "https://dribbble.com/sarfraz_333",
    color: "from-blue-500/20 to-teal-500/20",
    github: undefined
  },
  {
    id: 10,
    title: "Cretronix",
    category: "Logo Design & Tech Branding",
    desc: "Modern logo design for Cretronix - computer software company. Tech-forward branding with sleek, professional aesthetics for the digital age.",
    image: "/cretronix.webp",
    link: "https://dribbble.com/sarfraz_333",
    color: "from-cyan-500/20 to-blue-500/20",
    github: undefined
  },
  {
    id: 11,
    title: "Swiss Beauty Salon",
    category: "Logo Design & Beauty Branding",
    desc: "Elegant logo design for Swiss Beauty Salon - premium beauty and wellness center. Sophisticated branding reflecting Swiss quality and luxury aesthetics.",
    image: "/swiss.webp",
    link: "https://dribbble.com/shots/15951445-Swiss-Beauty-Salon",
    color: "from-pink-500/20 to-rose-500/20",
    github: undefined
  },
  {
    id: 12,
    title: "Obvis",
    category: "AI & Medical Intelligence",
    desc: "AI-powered medical intelligence platform transforming healthcare data into actionable insights. Advanced analytics and intelligent medical decision support system.",
    image: "/Obvis-–-AI-Medical-Intelligence.png",
    link: "https://obvis-yyes.vercel.app/",
    color: "from-violet-500/20 to-purple-500/20",
    github: undefined
  }
];

const PROJECTS_PER_PAGE = 3;

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  );

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

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300 hover:scale-110"
            aria-label="Previous projects"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300 hover:scale-110"
            aria-label="Next projects"
          >
            <ChevronRight size={24} />
          </button>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {currentProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-primary transition-colors"
                          >
                            <Github size={18} />
                          </a>
                        )}
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
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentPage
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

