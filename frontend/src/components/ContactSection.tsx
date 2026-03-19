"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

// Country codes list
const countryCodes = [
  { code: "+1", label: "🇺🇸 USA/Canada", name: "US" },
  { code: "+44", label: "🇬🇧 United Kingdom", name: "GB" },
  { code: "+92", label: "🇵🇰 Pakistan", name: "PK" },
  { code: "+91", label: "🇮🇳 India", name: "IN" },
  { code: "+971", label: "🇦🇪 UAE", name: "AE" },
  { code: "+966", label: "🇸🇦 Saudi Arabia", name: "SA" },
  { code: "+968", label: "🇴🇲 Oman", name: "OM" },
  { code: "+965", label: "🇰🇼 Kuwait", name: "KW" },
  { code: "+974", label: "🇶🇦 Qatar", name: "QA" },
  { code: "+973", label: "🇧🇭 Bahrain", name: "BH" },
  { code: "+962", label: "🇯🇴 Jordan", name: "JO" },
  { code: "+20", label: "🇪🇬 Egypt", name: "EG" },
  { code: "+27", label: "🇿🇦 South Africa", name: "ZA" },
  { code: "+234", label: "🇳🇬 Nigeria", name: "NG" },
  { code: "+254", label: "🇰🇪 Kenya", name: "KE" },
  { code: "+61", label: "🇦🇺 Australia", name: "AU" },
  { code: "+64", label: "🇳🇿 New Zealand", name: "NZ" },
  { code: "+65", label: "🇸🇬 Singapore", name: "SG" },
  { code: "+60", label: "🇲🇾 Malaysia", name: "MY" },
  { code: "+66", label: "🇹🇭 Thailand", name: "TH" },
  { code: "+62", label: "🇮🇩 Indonesia", name: "ID" },
  { code: "+63", label: "🇵🇭 Philippines", name: "PH" },
  { code: "+84", label: "🇻🇳 Vietnam", name: "VN" },
  { code: "+86", label: "🇨🇳 China", name: "CN" },
  { code: "+81", label: "🇯🇵 Japan", name: "JP" },
  { code: "+82", label: "🇰🇷 South Korea", name: "KR" },
  { code: "+852", label: "🇭🇰 Hong Kong", name: "HK" },
  { code: "+886", label: "🇹🇼 Taiwan", name: "TW" },
  { code: "+880", label: "🇧🇩 Bangladesh", name: "BD" },
  { code: "+93", label: "🇦🇫 Afghanistan", name: "AF" },
  { code: "+98", label: "🇮🇷 Iran", name: "IR" },
  { code: "+964", label: "🇮🇶 Iraq", name: "IQ" },
  { code: "+90", label: "🇹🇷 Turkey", name: "TR" },
  { code: "+7", label: "🇷🇺 Russia", name: "RU" },
  { code: "+380", label: "🇺🇦 Ukraine", name: "UA" },
  { code: "+48", label: "🇵🇱 Poland", name: "PL" },
  { code: "+49", label: "🇩🇪 Germany", name: "DE" },
  { code: "+33", label: "🇫🇷 France", name: "FR" },
  { code: "+39", label: "🇮🇹 Italy", name: "IT" },
  { code: "+34", label: "🇪🇸 Spain", name: "ES" },
  { code: "+31", label: "🇳🇱 Netherlands", name: "NL" },
  { code: "+32", label: "🇧🇪 Belgium", name: "BE" },
  { code: "+46", label: "🇸🇪 Sweden", name: "SE" },
  { code: "+47", label: "🇳🇴 Norway", name: "NO" },
  { code: "+45", label: "🇩🇰 Denmark", name: "DK" },
  { code: "+358", label: "🇫🇮 Finland", name: "FI" },
  { code: "+30", label: "🇬🇷 Greece", name: "GR" },
  { code: "+351", label: "🇵🇹 Portugal", name: "PT" },
  { code: "+41", label: "🇨🇭 Switzerland", name: "CH" },
  { code: "+43", label: "🇦🇹 Austria", name: "AT" },
  { code: "+52", label: "🇲🇽 Mexico", name: "MX" },
  { code: "+55", label: "🇧🇷 Brazil", name: "BR" },
  { code: "+54", label: "🇦🇷 Argentina", name: "AR" },
  { code: "+56", label: "🇨🇱 Chile", name: "CL" },
  { code: "+57", label: "🇨🇴 Colombia", name: "CO" },
  { code: "+51", label: "🇵🇪 Peru", name: "PE" },
  { code: "+58", label: "🇻🇪 Venezuela", name: "VE" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]); // Default Pakistan
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine country code + phone number
    const fullPhone = selectedCountry.code + phoneNumber.replace(/\D/g, '');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contact: fullPhone
        })
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", contact: "", message: "" });
        setPhoneNumber("");
        setSelectedCountry(countryCodes[2]);
        setTimeout(() => setIsSent(false), 5000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    { icon: Mail, label: "Direct Email", value: "digitalhubproai@gmail.com", sub: "Response within 12h", href: "mailto:digitalhubproai@gmail.com" },
    { icon: Phone, label: "Expert Call", value: "+923361861631", sub: "Mon-Fri, 9am - 6pm", href: "tel:+923361861631" },
    { icon: MapPin, label: "Neural Hub", value: "Karachi, Pakistan", sub: "Innovation District", href: null }
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-[#050505]">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h3 className="text-2xl font-black text-white mb-10 tracking-tight text-gradient">Strategic Nodes</h3>
            
            <div className="space-y-6">
              {contactOptions.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  <a href={item.href || '#'} className="block">
                    <div className="relative flex items-center gap-6 p-6 rounded-[2rem] glass-dark border border-white/5 group-hover:border-primary/30 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors shadow-lg">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                        <div className="text-lg font-black text-white group-hover:text-primary transition-colors tracking-tight">{item.value}</div>
                        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.sub}</div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative"
          >
            <div className="absolute top-0 right-12 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block group-focus-within:text-primary transition-colors">Nominal ID</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="E.g. Elon Musk"
                    className="w-full bg-transparent border-b-2 border-white/5 py-4 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-primary transition-all pr-10"
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block group-focus-within:text-primary transition-colors">Neural Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@future.com"
                    className="w-full bg-transparent border-b-2 border-white/5 py-4 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-primary transition-all pr-10"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block group-focus-within:text-primary transition-colors">Contact Frequency</label>
                <div className="flex gap-3">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const country = countryCodes.find(c => c.code === e.target.value);
                      if (country) setSelectedCountry(country);
                    }}
                    className="bg-white/5 border border-white/10 rounded-xl py-4 px-2 text-white font-bold focus:outline-none focus:border-primary transition-all cursor-pointer min-w-[120px]"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code} className="bg-[#0a0a0b] text-white">
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="3001234567"
                    className="flex-1 bg-transparent border-b-2 border-white/5 py-4 px-4 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block group-focus-within:text-primary transition-colors">Objective Briefing</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe the digital horizon..."
                  className="w-full bg-transparent border-b-2 border-white/5 py-4 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSent || isSubmitting}
                className="group relative w-full bg-white text-black font-black py-6 rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-xs">
                  {isSubmitting ? "Processing..." : isSent ? "Frequency Synchronized" : "Initiate Protocol"}
                  <Send className={`w-4 h-4 transition-transform duration-500 ${isSent ? "translate-x-20 opacity-0" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                </div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

