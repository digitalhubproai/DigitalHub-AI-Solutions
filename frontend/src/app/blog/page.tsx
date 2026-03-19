import BlogSection from "@/components/BlogSection";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Blog | DigitalHub AI Solutions",
  description: "Read the latest insights on AI, Web Development, Digital Marketing and business growth strategies.",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <PageHeader
        badge="Latest Insights"
        title="Our Blog"
        subtitle="Expert insights, tips, and trends on AI, web development, marketing, and growing your business online."
      />
      <BlogSection />
    </div>
  );
}
