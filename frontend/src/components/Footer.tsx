"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Rocket, Mail, Send, Facebook, ExternalLink } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter/subscribe?email=${encodeURIComponent(newsletterEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.status === "success") {
        setIsSubscribed(true);
        setNewsletterEmail("");
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        alert("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors p-0.5 bg-white/5">
                <Image
                  src="/Logo.jpg"
                  alt="DigitalHub AI Logo"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-white block leading-tight">
                  DIGITAL<span className="text-primary">HUB</span>
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  AI Solutions Core
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              Pioneering the next era of digital intelligence. We blend elite design with
              autonomous AI systems to build the future of business.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "https://x.com/digitalhub_ai", label: "Twitter" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61581310731184", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/digitalhubproai/", label: "Instagram" },
                { icon: ExternalLink, href: "https://www.upwork.com/freelancers/~0185d5cb53a56eb8d9", label: "Upwork" }
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all hover:-translate-y-1"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Services</h4>
            <ul className="space-y-4">
              {["AI Solutions", "Web Development", "Mobile Apps", "Branding & Design", "Digital Marketing", "SEO"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Subscribe to News</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get weekly AI strategies and web trends directly to your inbox.
            </p>
            {isSubscribed ? (
              <div className="relative flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-400 font-bold text-sm">Subscribed!</p>
                  <p className="text-green-400/70 text-xs">Check your inbox for confirmation</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubscribe} className="relative flex items-center group">
                <div className="absolute left-3 text-gray-500 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-12 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1 w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl hover:bg-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            © {new Date().getFullYear()} DIGITALHUB AI SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-xs font-medium transition-colors">PRIVACY</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-xs font-medium transition-colors">TERMS</Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white text-xs font-medium transition-colors">COOKIES</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

