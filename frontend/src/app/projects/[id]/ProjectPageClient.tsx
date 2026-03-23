"use client";

import { ArrowUpRight, ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  image2?: string;
  link: string;
  color: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
}

interface ProjectPageClientProps {
  project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden glass border border-white/10"
        >
          <div className="aspect-video relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 block">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {project.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {project.fullDescription}
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary/80 transition-colors"
              >
                <ExternalLink size={16} />
                Visit Website
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second Image (if exists) */}
      {project.image2 && (
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden glass border border-white/10"
          >
            <div className="aspect-video relative">
              <Image
                src={project.image2}
                alt={`${project.title} - View 2`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-black text-white mb-6">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowUpRight className="text-primary mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-black text-white mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-12 border border-white/10 text-center"
        >
          <h2 className="text-3xl font-black text-white mb-4">
            Want a Similar Solution?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s build something amazing together. Get in touch for a free consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/80 transition-colors"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
