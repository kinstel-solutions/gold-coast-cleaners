import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurServices } from "@/components/home/OurServices";
import { ServiceArea } from "@/components/home/ServiceArea";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaStrip } from "@/components/home/CtaStrip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <OurServices />
      <ServiceArea />
      <HowItWorks />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
