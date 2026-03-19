"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, X, MessageSquare, ChevronRight } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";

interface ChatMessage {
  id: number;
  type: "bot" | "user";
  text: string;
  serviceForm?: string; // To trigger service form
}

interface ServiceForm {
  type: string;
  title: string;
  fields: { name: string; label: string; type: string; placeholder: string; required?: boolean; options?: string[] }[];
}

const serviceForms: Record<string, ServiceForm> = {
  web_development: {
    type: "web_development",
    title: "Fullstack Web Development Request",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company" },
      { name: "project_type", label: "Project Type", type: "select", placeholder: "Select...", options: ["Business Website", "E-commerce Store", "Web Application", "Landing Page", "Custom Platform"], required: true },
      { name: "description", label: "Project Description", type: "textarea", placeholder: "Describe your project in detail...", required: true },
      { name: "features", label: "Key Features Required", type: "textarea", placeholder: "List all features (e.g., user login, payment gateway, dashboard, etc.)", required: true },
      { name: "design_preference", label: "Design Preference", type: "text", placeholder: "Modern, Minimalist, Colorful, Corporate, etc." },
      { name: "reference_sites", label: "Reference Websites You Like", type: "text", placeholder: "Share URLs of sites you like" },
      { name: "pages_count", label: "Estimated Number of Pages", type: "text", placeholder: "e.g., 5-10 pages" },
      { name: "content_ready", label: "Is Content Ready?", type: "select", placeholder: "Select...", options: ["Yes, Ready", "Partially Ready", "Need Content Writing Help"] },
      { name: "domain_hosting", label: "Domain & Hosting Status", type: "select", placeholder: "Select...", options: ["Have Both", "Need Everything", "Have Domain Only"] },
      { name: "integrations", label: "Third-party Integrations", type: "text", placeholder: "CRM, Payment Gateway, Email Marketing, etc." },
      { name: "seo_needed", label: "SEO Services Needed?", type: "select", placeholder: "Select...", options: ["Yes", "No", "Maybe"] },
      { name: "timeline", label: "Expected Timeline", type: "text", placeholder: "When do you need this?" },
      { name: "budget", label: "Budget Range", type: "text", placeholder: "e.g., $500-$2000, $2000-$5000, $5000+" },
      { name: "maintenance", label: "Ongoing Maintenance Needed?", type: "select", placeholder: "Select...", options: ["Yes", "No"] },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else..." },
    ]
  },
  mobile_app: {
    type: "mobile_app",
    title: "Mobile App Development Request",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company" },
      { name: "app_type", label: "Platform", type: "select", placeholder: "Select...", options: ["iOS", "Android", "Cross-Platform (Both)"], required: true },
      { name: "description", label: "App Description", type: "textarea", placeholder: "Describe your app idea...", required: true },
      { name: "features", label: "Key Features", type: "textarea", placeholder: "List all features (e.g., user login, push notifications, payment, etc.)", required: true },
      { name: "design_preference", label: "Design Preference", type: "text", placeholder: "Modern, Minimalist, Colorful, etc." },
      { name: "reference_apps", label: "Reference Apps You Like", type: "text", placeholder: "Share app names you like" },
      { name: "backend_needed", label: "Backend/Admin Panel Needed?", type: "select", placeholder: "Select...", options: ["Yes", "No", "Not Sure"] },
      { name: "api_integrations", label: "API Integrations", type: "text", placeholder: "Payment, Maps, Social Media, etc." },
      { name: "monetization", label: "Monetization Plan", type: "select", placeholder: "Select...", options: ["Free", "Paid App", "In-App Purchases", "Subscription", "Ads"] },
      { name: "timeline", label: "Expected Timeline", type: "text", placeholder: "When do you need this?" },
      { name: "budget", label: "Budget Range", type: "text", placeholder: "e.g., $2000-$10000, $10000+" },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else..." },
    ]
  },
  ai_agents: {
    type: "ai_agents",
    title: "AI Agents & Solutions Request",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company" },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g., Healthcare, Finance, Retail", required: true },
      { name: "use_case", label: "Primary Use Case", type: "textarea", placeholder: "What business problem should the AI solve?", required: true },
      { name: "tasks", label: "Specific Tasks for AI Agent", type: "textarea", placeholder: "List all tasks (e.g., answer customer queries, process orders, schedule appointments)", required: true },
      { name: "automation_level", label: "Automation Level Needed", type: "select", placeholder: "Select...", options: ["Fully Autonomous", "Human-in-the-loop", "Assistive Only"] },
      { name: "integration_needed", label: "Systems to Integrate With", type: "text", placeholder: "Slack, Salesforce, WhatsApp, Email, etc." },
      { name: "data_sources", label: "Data Sources Available", type: "textarea", placeholder: "What data will the AI use? (databases, documents, APIs)" },
      { name: "user_count", label: "Expected Users", type: "text", placeholder: "How many people will use this?" },
      { name: "platform", label: "Deployment Platform", type: "text", placeholder: "Web, Mobile, Desktop, All" },
      { name: "security_requirements", label: "Security/Compliance Needs", type: "text", placeholder: "GDPR, HIPAA, Data Encryption, etc." },
      { name: "timeline", label: "Expected Timeline", type: "text", placeholder: "When do you need this?" },
      { name: "budget", label: "Budget Range", type: "text", placeholder: "e.g., $2000-$10000, $10000+" },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else..." },
    ]
  },
  branding: {
    type: "branding",
    title: "Branding & Design Request (Logo, Graphics, UI/UX)",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company/Brand Name", type: "text", placeholder: "Your Company Name", required: true },
      { name: "tagline", label: "Tagline/Slogan (if any)", type: "text", placeholder: "Your tagline here" },
      { name: "project_type", label: "Project Type", type: "select", placeholder: "Select...", options: ["Logo Design", "Full Brand Identity", "Graphic Design", "UI/UX Design (Figma)", "Brand Refresh"], required: true },
      { name: "industry", label: "Industry/Niche", type: "text", placeholder: "e.g., Tech, Fashion, Food, Healthcare", required: true },
      { name: "target_audience", label: "Target Audience", type: "text", placeholder: "Who are your customers?", required: true },
      { name: "logo_style", label: "Style Preference", type: "select", placeholder: "Select style...", options: ["Minimalist", "Modern", "Vintage/Classic", "Luxury/Elegant", "Playful/Fun", "Bold/Aggressive", "Abstract", "Mascot"], required: true },
      { name: "colors_preferred", label: "Preferred Colors", type: "text", placeholder: "e.g., Blue, Gold, Black (or 'open to suggestions')" },
      { name: "colors_avoid", label: "Colors to Avoid", type: "text", placeholder: "Any colors you don't want" },
      { name: "design_inspiration", label: "Design Inspiration/References", type: "textarea", placeholder: "Share links or describe designs you like" },
      { name: "usage", label: "Where Will It Be Used?", type: "text", placeholder: "Website, Social Media, Print, Packaging, App, etc." },
      { name: "competitors", label: "Main Competitors", type: "text", placeholder: "Who are your competitors?" },
      { name: "timeline", label: "Expected Timeline", type: "text", placeholder: "When do you need this?" },
      { name: "budget", label: "Budget Range", type: "text", placeholder: "e.g., $100-$500, $500-$1000, $1000+" },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else you want us to know..." },
    ]
  },
  digital_marketing: {
    type: "digital_marketing",
    title: "Digital Marketing Request",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company" },
      { name: "website", label: "Website URL", type: "text", placeholder: "www.yourcompany.com" },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g., E-commerce, SaaS, Retail", required: true },
      { name: "marketing_goal", label: "Primary Marketing Goal", type: "select", placeholder: "Select...", options: ["Lead Generation", "Brand Awareness", "Sales/Conversions", "Social Media Growth", "Paid Advertising", "Content Marketing"], required: true },
      { name: "target_audience", label: "Target Audience", type: "textarea", placeholder: "Describe your ideal customer (age, location, interests, etc.)", required: true },
      { name: "current_channels", label: "Current Marketing Channels", type: "text", placeholder: "Where are you marketing now? (Google, Facebook, Instagram, etc.)" },
      { name: "past_campaigns", label: "Past Campaign Performance", type: "textarea", placeholder: "What worked/didn't work before?" },
      { name: "competitors", label: "Main Competitors", type: "text", placeholder: "Who are your top 3 competitors?" },
      { name: "unique_selling_point", label: "Your Unique Selling Point", type: "textarea", placeholder: "What makes you different from competitors?" },
      { name: "content_assets", label: "Content Assets Available", type: "select", placeholder: "Select...", options: ["Have Everything", "Have Some", "Need Content Creation"] },
      { name: "monthly_budget", label: "Monthly Marketing Budget", type: "text", placeholder: "e.g., $500-$2000, $2000-$5000, $5000+" },
      { name: "ad_spend_budget", label: "Monthly Ad Spend Budget", type: "text", placeholder: "Separate from service fees" },
      { name: "kpis", label: "KPIs You Want to Track", type: "text", placeholder: "Leads, Sales, Traffic, Engagement, etc." },
      { name: "timeline", label: "Campaign Start Date", type: "text", placeholder: "When do you want to start?" },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else..." },
    ]
  },
  seo: {
    type: "seo",
    title: "SEO (Search Engine Optimization) Request",
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@company.com", required: true },
      { name: "contact", label: "Contact Number", type: "tel", placeholder: "3001234567 (with country code)", required: true },
      { name: "company_name", label: "Company Name", type: "text", placeholder: "Your Company" },
      { name: "website_url", label: "Website URL", type: "text", placeholder: "www.yourcompany.com", required: true },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g., E-commerce, SaaS, Local Business", required: true },
      { name: "current_ranking", label: "Current Google Ranking", type: "text", placeholder: "e.g., Page 2-3 for main keywords" },
      { name: "target_keywords", label: "Target Keywords", type: "text", placeholder: "Keywords you want to rank for" },
      { name: "competitors", label: "Main Competitors", type: "text", placeholder: "Who ranks #1 for your keywords?" },
      { name: "seo_audit_done", label: "SEO Audit Done Before?", type: "select", placeholder: "Select...", options: ["Yes", "No", "Not Sure"] },
      { name: "content_strategy", label: "Content Strategy", type: "select", placeholder: "Select...", options: ["Have Blog/Content", "Need Content Creation", "Not Sure"] },
      { name: "technical_issues", label: "Known Technical Issues", type: "textarea", placeholder: "Slow loading, mobile issues, etc." },
      { name: "local_seo_needed", label: "Local SEO Needed?", type: "select", placeholder: "Select...", options: ["Yes", "No", "Not Sure"] },
      { name: "timeline", label: "Expected Timeline", type: "text", placeholder: "When do you want to start?" },
      { name: "budget", label: "Monthly Budget", type: "text", placeholder: "e.g., $300-$1000, $1000-$3000, $3000+" },
      { name: "additional_info", label: "Additional Information", type: "textarea", placeholder: "Anything else..." },
    ]
  },
};

export default function FloatingChatbot() {
  const { isOpen, setIsOpen, toggleChat } = useChatbot();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      text: "Neural Link Established. I am the DigitalHub AI Core. How can I accelerate your business growth today?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", contact: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Service form state
  const [showServiceForm, setShowServiceForm] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Record<string, string>>({});
  const [isSubmittingService, setIsSubmittingService] = useState(false);

  // Phone validation - Must have international country code
  const validatePhone = (phone: string) => {
    // Remove spaces, dashes, parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Must start with + followed by country code (1-3 digits) and then 7-15 digits
    const phoneRegex = /^(\+)?[1-9]\d{6,14}$/;
    
    // Minimum 8 digits (including country code), maximum 16
    return phoneRegex.test(cleaned) && cleaned.length >= 8 && cleaned.length <= 16;
  };

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMsg: ChatMessage = { id: Date.now(), type: "user", text: inputVal };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text
          })).concat({ role: "user", content: inputVal })
        })
      });

      const data = await response.json();

      if (data.choices?.[0]?.message?.content) {
        const botContent = data.choices[0].message.content;
        
        // Check for service form trigger
        const serviceFormMatch = botContent.match(/\[SERVICE_FORM:(\w+)\]/);
        
        if (serviceFormMatch) {
          const serviceType = serviceFormMatch[1];
          const cleanMessage = botContent.replace(/\[SERVICE_FORM:\w+\]/g, "").trim();
          
          // Add bot message
          const botReply: ChatMessage = {
            id: Date.now() + 1,
            type: "bot",
            text: cleanMessage,
            serviceForm: serviceType
          };
          setMessages(prev => [...prev, botReply]);
          
          // Trigger service form display
          setShowServiceForm(serviceType);
        } else {
          const botReply: ChatMessage = {
            id: Date.now() + 1,
            type: "bot",
            text: botContent
          };
          setMessages(prev => [...prev, botReply]);
        }
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "Neural connection interrupted. Please try again later."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Lead form with country code
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]); // Default Pakistan
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !phoneNumber) return;

    // Combine country code + phone number
    const fullPhone = selectedCountry.code + phoneNumber.replace(/\D/g, '');
    
    // Validate phone number
    if (!validatePhone(fullPhone)) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsSubmittingLead(true);
    try {
      const resp = await fetch("http://localhost:8000/api/chatbot-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          contact: fullPhone
        })
      });
      if (resp.ok) {
        setIsLeadCaptured(true);
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: "bot",
          text: `Welcome ${leadForm.name}! Neural link established. How can I help you today?`
        }]);
      }
    } catch (err) {
      console.error("Lead Capture Error:", err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleServiceFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showServiceForm) return;

    // Validate phone number
    if (serviceFormData.contact) {
      const cleaned = serviceFormData.contact.replace(/[\s\-\(\)]/g, '');
      const phoneRegex = /^(\+)?[1-9]\d{6,14}$/;
      if (!phoneRegex.test(cleaned) || cleaned.length < 8 || cleaned.length > 16) {
        alert('Please enter a valid phone number with country code (e.g., +923001234567)');
        return;
      }
    }

    setIsSubmittingService(true);
    try {
      const resp = await fetch("http://localhost:8000/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: showServiceForm,
          form_data: serviceFormData
        })
      });

      if (resp.ok) {
        const botReply: ChatMessage = {
          id: Date.now(),
          type: "bot",
          text: `🎉 Perfect! Your ${showServiceForm.replace('_', ' ')} request has been submitted successfully. Our team will contact you at ${serviceFormData.email} shortly!`
        };
        setMessages(prev => [...prev, botReply]);
        setShowServiceForm(null);
        setServiceFormData({});
      }
    } catch (err) {
      console.error("Service Form Error:", err);
      const errorMsg: ChatMessage = {
        id: Date.now(),
        type: "bot",
        text: "Submission failed. Please try again or contact us directly."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSubmittingService(false);
    }
  };

  const handleServiceFormChange = (fieldName: string, value: string) => {
    setServiceFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const closeServiceForm = () => {
    setShowServiceForm(null);
    setServiceFormData({});
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        title={isOpen ? "Close Chat" : "Open Chat"}
        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,163,255,0.4)] hover:shadow-[0_0_50px_rgba(0,163,255,0.6)] transition-all relative group"
      >
          <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="relative"
              >
                <MessageSquare size={28} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full blur-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[380px] h-[520px] glass-dark border border-white/10 rounded-[1.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,163,255,0.2)] flex flex-col"
            >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0a0a0b] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-black tracking-tight uppercase text-[10px]">DigitalHub AI Core</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Active Link</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {showServiceForm && (
                  <button
                    onClick={closeServiceForm}
                    className="text-[9px] font-bold text-primary hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Back to Chat
                  </button>
                )}
                <button
                  onClick={() => { setIsOpen(false); setShowServiceForm(null); }}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isLeadCaptured ? (
              <div className="flex-grow p-6 flex flex-col justify-center space-y-4">
                <div className="text-center space-y-2 mb-4">
                  <h4 className="text-white font-bold text-sm">Initialize Deep Link</h4>
                  <p className="text-gray-400 text-[10px]">Please provide authentication details to start the neural session.</p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <div className="flex gap-2">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const country = countryCodes.find(c => c.code === e.target.value);
                        if (country) setSelectedCountry(country);
                      }}
                      className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-2 text-white text-xs focus:outline-none focus:border-primary/50 transition-all cursor-pointer min-w-[100px]"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code} className="bg-[#0a0a0b] text-white">
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl text-xs hover:bg-secondary transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmittingLead ? "Initializing..." : "Start Neural Session"}
                  </button>
                </form>
              </div>
            ) : showServiceForm && serviceForms[showServiceForm] ? (
              <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
                <div className="text-center mb-4">
                  <h4 className="text-white font-black text-sm">{serviceForms[showServiceForm].title}</h4>
                  <p className="text-gray-400 text-[9px] mt-1">Please provide your requirements</p>
                </div>
                <form onSubmit={handleServiceFormSubmit} className="space-y-3">
                  {serviceForms[showServiceForm].fields.map((field) => (
                    <div key={field.name}>
                      <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                        {field.label} {field.required && <span className="text-primary">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={2}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={serviceFormData[field.name] || ""}
                          onChange={(e) => handleServiceFormChange(field.name, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-xs focus:outline-none focus:border-primary/50 transition-all resize-none"
                        />
                      ) : field.type === "select" ? (
                        <select
                          required={field.required}
                          value={serviceFormData[field.name] || ""}
                          onChange={(e) => handleServiceFormChange(field.name, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                        >
                          <option value="" disabled>{field.placeholder}</option>
                          {field.options?.map((opt: string) => (
                            <option key={opt} value={opt} className="bg-[#0a0a0b]">{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={serviceFormData[field.name] || ""}
                          onChange={(e) => handleServiceFormChange(field.name, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                        />
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={isSubmittingService}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl text-xs hover:bg-secondary transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                  >
                    {isSubmittingService ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Chat Area */}
                <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-hide">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex items-end gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === "user" ? "bg-primary" : "bg-white/5 border border-white/10"}`}>
                          {msg.type === "user" ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-primary" />}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-xs font-medium leading-relaxed ${
                          msg.type === "user"
                            ? "bg-primary text-white rounded-br-none shadow-lg shadow-primary/10"
                            : "bg-white/5 border border-white/5 text-gray-300 rounded-bl-none"
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3">
                         <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10">
                          <Bot className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="px-4 py-4 bg-white/5 border border-white/5 rounded-2xl rounded-bl-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white/[0.02] border-t border-white/10">
                  <form onSubmit={handleSend} className="relative flex items-center group">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Query protocol..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-white placeholder-gray-600 font-bold text-xs focus:outline-none focus:border-primary/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputVal.trim() || isTyping}
                      className="absolute right-1.5 w-8 h-8 bg-primary rounded-xl text-white flex items-center justify-center hover:bg-secondary disabled:opacity-20 transition-all active:scale-90"
                    >
                      <ChevronRight size={16} strokeWidth={3} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
