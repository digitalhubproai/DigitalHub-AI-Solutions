"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
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
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
            <p className="leading-relaxed">
              Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit a website. They help websites remember information about your visit, which can make it easier to use the site and enhance your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-400 text-sm">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-400 text-sm">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our website performance.
                </p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Functionality Cookies</h3>
                <p className="text-gray-400 text-sm">
                  These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Cookies</h2>
            <p className="leading-relaxed mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To remember your preferences and settings</li>
              <li>To understand how you use our website</li>
              <li>To improve website functionality and user experience</li>
              <li>To analyze website traffic and performance</li>
              <li>To provide relevant content and advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
            <p className="leading-relaxed">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and analyze the effectiveness of our marketing campaigns. These third parties may include Google Analytics, social media platforms, and advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
            <p className="leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>View what cookies are stored on your device</li>
              <li>Delete all or specific cookies</li>
              <li>Block cookies from being set</li>
              <li>Set preferences for certain websites</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Please note that blocking or deleting cookies may impact your user experience and limit the functionality of certain features on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Browser Settings</h2>
            <p className="leading-relaxed mb-4">You can manage cookies through your browser settings:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Google Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong className="text-white">Mozilla Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong className="text-white">Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong className="text-white">Microsoft Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Updates to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about our use of cookies, please contact us at:
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
