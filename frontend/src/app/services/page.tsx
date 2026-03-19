import ServicesSection from "@/components/ServicesSection";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Services | DigitalHub AI Solutions",
  description: "Explore our AI Solutions, Web Development, Mobile Apps, Branding, Digital Marketing and SEO services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <PageHeader
        badge="What We Offer"
        title="Our Services"
        subtitle="From custom websites to AI-powered solutions, we deliver professional digital services that help your business grow."
      />
      <ServicesSection />
    </div>
  );
}
