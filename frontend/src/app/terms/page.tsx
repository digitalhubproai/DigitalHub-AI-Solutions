"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Terms and Conditions
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using DigitalHub AI Solutions website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
            <p className="leading-relaxed mb-4">
              DigitalHub AI Solutions provides the following services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Web Development & Design</li>
              <li>Mobile Application Development</li>
              <li>AI Solutions & Automation</li>
              <li>Branding & Graphic Design</li>
              <li>Digital Marketing & SEO</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
            <p className="leading-relaxed">
              You agree to provide accurate and complete information when using our services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <p className="leading-relaxed">
              Payment terms will be outlined in individual service agreements. All fees are non-refundable unless otherwise specified. We reserve the right to modify our pricing at any time with prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content, trademarks, logos, and intellectual property displayed on this website are owned by DigitalHub AI Solutions. You may not use, reproduce, or distribute any content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              DigitalHub AI Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Modifications to Services</h2>
            <p className="leading-relaxed">
              We reserve the right to modify or discontinue, temporarily or permanently, any portion of our services with or without notice. You agree that we shall not be liable for any modification or discontinuation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
            <p className="leading-relaxed">
              We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
            <p className="leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
            <p className="leading-relaxed">
              For any questions regarding these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-white font-bold">DigitalHub AI Solutions</p>
              <p className="text-gray-400">Email: digitalhubproai@gmail.com</p>
              <p className="text-gray-400">Phone: +92 336 1861631</p>
              <p className="text-gray-400">Location: Karachi, Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
