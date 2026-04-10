import ProjectPageClient from "./ProjectPageClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const projects = [
  {
    id: 1,
    title: "Al-Haramain Travel",
    category: "Travel & Tourism Website",
    desc: "Professional travel and tourism website for Al-Haramain Travel. Offering premium travel services, tour packages, and booking solutions for travelers.",
    image: "/Al-Haramain-Travel.png",
    link: "https://al-haramin.vercel.app/",
    color: "from-emerald-500/20 to-teal-500/20",
    fullDescription:
      "Al-Haramain Travel is a professional travel and tourism website designed to provide exceptional travel experiences. The platform offers comprehensive travel services including tour packages, flight bookings, hotel reservations, and visa assistance. Built with modern web technologies, it delivers a seamless user experience for travelers seeking reliable and premium travel solutions.",
    features: [
      "Tour Package Booking",
      "Flight Reservation System",
      "Hotel Booking Integration",
      "Visa Assistance Services",
      "Travel Guide & Information",
      "Online Payment Gateway",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
  },
  {
    id: 2,
    title: "Passion & Profit",
    category: "Business Consulting Website",
    desc: "Professional B2B consulting platform for freelancers and small businesses. Features lead generation funnels, coaching programs, and automated marketing systems.",
    image: "/passion-profit.png",
    link: "https://passion-profit.com",
    color: "from-blue-500/20 to-cyan-500/20",
    fullDescription:
      "Passion & Profit is a comprehensive business consulting platform designed to help freelancers and small businesses scale effectively. We built a complete B2B website with integrated lead generation funnels, coaching program management, and automated marketing systems.",
    features: [
      "Lead Generation Funnels",
      "Coaching Program Management",
      "Automated Email Marketing",
      "Client Dashboard",
      "Payment Integration",
      "Booking & Scheduling System",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
  },
  {
    id: 3,
    title: "DigitalHub AI Platform",
    category: "Web Development",
    desc: "Full-stack AI-powered business solutions platform with intelligent chatbot, lead capture, and automated email marketing integration.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    color: "from-purple-500/20 to-blue-500/20",
    link: "https://creativesar-digitalhubai.hf.space",
    fullDescription:
      "DigitalHub AI Platform is our flagship product - a comprehensive AI-powered business solutions platform. It combines intelligent chatbot capabilities with lead capture and automated marketing tools.",
    features: [
      "AI-Powered Chatbot",
      "Lead Capture System",
      "Email Marketing Automation",
      "Analytics Dashboard",
      "CRM Integration",
      "Multi-channel Support",
    ],
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    id: 3,
    title: "AI Marketing Automation",
    category: "Digital Marketing & AI",
    desc: "Advanced marketing automation system powered by AI for campaign optimization, audience targeting, and ROI maximization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    color: "from-green-500/20 to-emerald-500/20",
    link: "#",
    fullDescription:
      "An advanced AI-driven marketing automation system that optimizes campaigns in real-time, targets the right audience, and maximizes ROI through intelligent data analysis.",
    features: [
      "AI Campaign Optimization",
      "Audience Segmentation",
      "Predictive Analytics",
      "A/B Testing Automation",
      "ROI Tracking",
      "Multi-platform Integration",
    ],
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Adresta",
    category: "Blockchain & Digital Identity",
    desc: "Swiss SaaS platform creating blockchain-based digital certificates for luxury watches. Digital twins, warranty management, and after-sales ecosystem.",
    image: "/adresta.png",
    link: "https://adresta.ch",
    color: "from-amber-500/20 to-orange-500/20",
    fullDescription:
      "Adresta AG is a Swiss SaaS technology company and ETH Zurich spinoff that provides blockchain-based digital identity solutions for luxury brands. The platform creates digital twins (NFTs) for physical luxury products, enabling brands to maintain direct communication with end consumers throughout the entire product lifecycle. Headquartered in Luzern, Switzerland, Adresta is revolutionizing the luxury watch industry with its innovative 4-module SaaS ecosystem.",
    features: [
      "Digital Twin Creation (NFT Certificates)",
      "Warranty Activation & Dealer Registration",
      "Mobile Apps (iOS, Android, Web)",
      "Service & Repair Tracking",
      "Embedded Insurance (Partner: Helvetia)",
      "Authentication & Anti-Counterfeiting",
      "Certified Pre-Owned Service",
      "Direct Brand-Owner Communication",
      "Push Notifications & Brand Page",
      "Valuation Service Integration",
    ],
    technologies: [
      "Swisscom Blockchain",
      "Microsoft Azure",
      "iOS & Android",
      "White-label API",
      "Distributed Ledger Technology",
    ],
  },
  {
    id: 5,
    title: "Greenlight Consulting",
    category: "Agentic AI & Automation",
    desc: "Enterprise AI consulting firm specializing in agentic AI, process orchestration, and intelligent automation. UiPath Diamond Partner with global delivery.",
    image: "/greenlight.png",
    link: "https://greenlightconsulting.com",
    color: "from-green-500/20 to-lime-500/20",
    fullDescription:
      "Greenlight Consulting helps organizations move from AI and automation pilots to enterprise-scale results through agentic AI and orchestration. They design and deploy solutions that orchestrate AI, automation, and human decision-making to run complex business operations. With a unique model combining North American advisors and global delivery centers (USA, Canada, Costa Rica, India), Greenlight delivers scalable agentic AI solutions across Banking, Insurance, Manufacturing, Healthcare, and more.",
    features: [
      "Agentic AI Strategy & Implementation",
      "Process Orchestration",
      "Intelligent Automation (RPA)",
      "Intelligent Document Processing (IDP)",
      "Test Automation",
      "Process Mining",
      "AI-Assisted Discovery",
      "Ongoing Operations & Support",
      "Global Delivery Model",
      "Enterprise-Scale Deployment",
    ],
    technologies: [
      "UiPath (Diamond Partner)",
      "ServiceNow",
      "Microsoft",
      "Automation Anywhere",
      "Senso",
      "Mimica",
    ],
  },
  {
    id: 6,
    title: "Wagtails Essex",
    category: "Pet Care & Services",
    desc: "Premium dog care facility in Essex offering day care, puppy care, training, walking, and private dog parks. 5-star licensed with online booking system.",
    image: "/wagtails.png",
    link: "https://wagtails.co.uk",
    color: "from-teal-500/20 to-emerald-500/20",
    fullDescription:
      "Wagtails Essex (Wagtails Group Ltd.) is a purpose-built premium dog care facility located in rural Essex. They provide comprehensive, fear-free dog care services including doggy day care, puppy socialization, professional training, dog walking, and private dog park rentals. With multiple locations (Cressing, Rettendon, Writtle) and a 5-star licence, Wagtails combines qualified trainer expertise with customized care experiences. Their online booking platform enables convenient reservations for dog parks and services.",
    features: [
      "5-Star Licensed Day Care",
      "Puppy Day Care & Socialization",
      "Professional Dog Training",
      "Tailored Dog Walking Services",
      "Private Dog Park Rentals",
      "Online Booking System",
      "Fear-Free Environment",
      "Customized Care Plans",
      "Secure Facilities (6ft Fencing, Double-Gated)",
      "Multiple Locations in Essex",
    ],
    technologies: [
      "Online Booking Platform",
      "Integrated Website System",
      "Digital Customer Management",
      "Slot-Based Reservation System",
    ],
  },
  {
    id: 7,
    title: "Punjabi Touch Booklet",
    category: "Print Design & Branding",
    desc: "Elegant restaurant menu booklet design for Punjabi Touch Indian Restaurant. Traditional aesthetics with modern layout, showcasing authentic cuisine.",
    image: "/punjabitouch.webp",
    link: "https://dribbble.com/shots/22944402-Punjabi-Touch-Booklet",
    color: "from-red-500/20 to-orange-500/20",
    fullDescription:
      "Punjabi Touch Booklet is a beautifully crafted restaurant menu design for Punjabi Touch Indian Restaurant. This print design project showcases traditional Indian culinary aesthetics combined with modern layout principles. The booklet features an elegant design that reflects the authentic flavors and rich heritage of Indian cuisine, with careful attention to typography, color palette, and visual hierarchy to enhance the dining experience.",
    features: [
      "Multi-Page Menu Booklet Design",
      "Traditional Indian Aesthetic",
      "Modern Layout & Typography",
      "Food Photography Integration",
      "Brand-Consistent Color Scheme",
      "Print-Ready High-Resolution Files",
      "Section Organization (Starters, Mains, Desserts, etc.)",
      "Elegant Visual Hierarchy",
      "Cultural Design Elements",
      "Professional Print Production",
    ],
    technologies: [
      "Adobe InDesign",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Print Design",
      "Brand Identity",
    ],
  },
  {
    id: 8,
    title: "Book Cover AlgoTrader",
    category: "Print Design & Book Cover",
    desc: "Professional book cover design for AlgoTrader - algorithmic trading guide. Modern financial aesthetic with bold typography and data-driven visuals.",
    image: "/algotrader.webp",
    link: "https://dribbble.com/shots/17557153-Book-Cover-AlgoTrader",
    color: "from-indigo-500/20 to-purple-500/20",
    fullDescription:
      "Book Cover AlgoTrader is a professional book cover design for a comprehensive guide on algorithmic trading. The design captures the essence of modern financial technology with a sleek, data-driven aesthetic. Featuring bold typography, geometric patterns, and a sophisticated color palette, the cover represents the intersection of finance, technology, and trading automation. Perfect for a technical book targeting traders, developers, and financial professionals interested in automated trading systems.",
    features: [
      "Professional Book Cover Design",
      "Financial/Trading Theme",
      "Bold Modern Typography",
      "Geometric Data-Driven Patterns",
      "Print-Ready High-Resolution Files",
      "Front & Back Cover Layout",
      "Spine Design",
      "Market-Ready Formatting",
      "Professional Color Grading",
      "Industry-Standard Specifications",
    ],
    technologies: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Print Design",
      "Book Cover Design",
    ],
  },
  {
    id: 9,
    title: "EximPortHub",
    category: "Logo Design & Branding",
    desc: "Professional logo design for EximPortHub - UK-based international import/export company specializing in medical supplies and goods worldwide.",
    image: "/eximporthub.webp",
    link: "https://dribbble.com/sarfraz_333",
    color: "from-blue-500/20 to-teal-500/20",
    fullDescription:
      "EximPortHub is a professional logo design for a UK-based international import/export company. The brand specializes in handling medical supplies and related goods, managing worldwide business operations from their United Kingdom headquarters. The logo design reflects trust, professionalism, and global connectivity - essential qualities for a company managing critical medical supply chains across international borders. The design embodies reliability, efficiency, and the seamless movement of goods across continents.",
    features: [
      "Professional Logo Design",
      "Import/Export Industry Theme",
      "Medical Supplies Focus",
      "UK-Based International Brand",
      "Global Business Aesthetic",
      "Trust & Reliability Visuals",
      "Scalable Vector Files",
      "Multiple Format Deliverables",
      "Brand Identity Foundation",
      "Commercial Usage Ready",
    ],
    technologies: [
      "Adobe Illustrator",
      "Vector Design",
      "Logo Design",
      "Brand Identity",
      "Professional Branding",
    ],
  },
  {
    id: 10,
    title: "Cretronix",
    category: "Logo Design & Tech Branding",
    desc: "Modern logo design for Cretronix - computer software company. Tech-forward branding with sleek, professional aesthetics for the digital age.",
    image: "/cretronix.webp",
    link: "https://dribbble.com/sarfraz_333",
    color: "from-cyan-500/20 to-blue-500/20",
    fullDescription:
      "Cretronix is a modern logo design for a computer software company. The design embodies the essence of technology and innovation with a sleek, professional aesthetic perfect for the digital age. The logo represents the company's focus on cutting-edge software solutions, combining clean lines with a contemporary visual identity. Ideal for a tech brand that values precision, reliability, and forward-thinking design in the competitive software industry.",
    features: [
      "Modern Tech Logo Design",
      "Computer Software Industry",
      "Clean Professional Aesthetic",
      "Scalable Vector Graphics",
      "Digital-First Design",
      "Brand Identity System",
      "Multiple File Formats",
      "High-Resolution Deliverables",
      "Commercial License Ready",
      "Future-Proof Design",
    ],
    technologies: [
      "Adobe Illustrator",
      "Vector Design",
      "Logo Design",
      "Tech Branding",
      "Digital Identity",
    ],
  },
  {
    id: 11,
    title: "Swiss Beauty Salon",
    category: "Logo Design & Beauty Branding",
    desc: "Elegant logo design for Swiss Beauty Salon - premium beauty and wellness center. Sophisticated branding reflecting Swiss quality and luxury aesthetics.",
    image: "/swiss.webp",
    link: "https://dribbble.com/shots/15951445-Swiss-Beauty-Salon",
    color: "from-pink-500/20 to-rose-500/20",
    fullDescription:
      "Swiss Beauty Salon is an elegant logo design for a premium beauty and wellness center. The design embodies Swiss precision and quality combined with luxury beauty aesthetics. The logo reflects sophistication, elegance, and the high standards associated with Swiss beauty services. Perfect for a salon that offers premium treatments including hair care, skincare, spa services, and beauty treatments in a luxurious, relaxing environment.",
    features: [
      "Elegant Beauty Logo Design",
      "Swiss Quality Aesthetic",
      "Luxury Brand Positioning",
      "Salon & Wellness Theme",
      "Sophisticated Typography",
      "Scalable Vector Files",
      "Multiple Format Deliverables",
      "Premium Brand Identity",
      "High-End Visual Appeal",
      "Commercial Usage Ready",
    ],
    technologies: [
      "Adobe Illustrator",
      "Vector Design",
      "Logo Design",
      "Beauty Branding",
      "Luxury Identity",
    ],
  },
  {
    id: 12,
    title: "Obvis",
    category: "AI & Medical Intelligence",
    desc: "AI-powered medical intelligence platform transforming healthcare data into actionable insights. Advanced analytics and intelligent medical decision support system.",
    image: "/Obvis-–-AI-Medical-Intelligence.png",
    link: "https://obvis-yyes.vercel.app/",
    color: "from-violet-500/20 to-purple-500/20",
    fullDescription:
      "Obvis is an innovative AI-powered medical intelligence platform designed to transform healthcare data into actionable insights. The platform leverages advanced artificial intelligence and machine learning to assist healthcare professionals in making informed medical decisions. With its sophisticated analytics engine, Obvis processes complex medical data to provide intelligent recommendations, pattern recognition, and predictive insights that enhance patient care and clinical outcomes.",
    features: [
      "AI-Powered Medical Data Analysis",
      "Intelligent Decision Support",
      "Healthcare Analytics Dashboard",
      "Medical Pattern Recognition",
      "Predictive Insights Engine",
      "Clinical Data Integration",
      "Secure Healthcare Platform",
      "Real-time Medical Intelligence",
    ],
    technologies: [
      "Next.js",
      "React",
      "AI/ML Models",
      "Healthcare APIs",
      "Secure Database",
      "Vercel",
    ],
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study | DigitalHub AI Solutions`,
    description: project.fullDescription,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.fullDescription,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.fullDescription,
      images: [project.image],
    },
    alternates: {
      canonical: `https://creativesar-digitalhubai.hf.space/projects/${id}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
