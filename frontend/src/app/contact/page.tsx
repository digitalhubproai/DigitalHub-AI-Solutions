import ContactSection from "@/components/ContactSection";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Contact | DigitalHub AI Solutions",
  description: "Get in touch with DigitalHub AI for your next big project.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <PageHeader
        badge="Neural Connection"
        title="Contact Us"
        subtitle="Ready to dominate the digital frontier? Initiate the protocol and let's architect your success."
      />
      <ContactSection />
    </div>
  );
}
