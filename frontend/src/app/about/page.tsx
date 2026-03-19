import AboutSection from "@/components/AboutSection";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "About Us | DigitalHub AI Solutions",
  description: "Learn more about DigitalHub AI Solutions - your partner for web development, AI solutions, and digital marketing.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <PageHeader
        badge="Who We Are"
        title="About Us"
        subtitle="We are a team of experienced professionals dedicated to helping businesses succeed with modern digital solutions."
      />
      <AboutSection />
    </div>
  );
}
