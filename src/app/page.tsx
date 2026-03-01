import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurServices } from "@/components/home/OurServices";
import { BondCleaningChecklist } from "@/components/home/BondCleaningChecklist";
import { ServiceArea } from "@/components/home/ServiceArea";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaStrip } from "@/components/home/CtaStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bond Cleaning Gold Coast & Brisbane | James Bond Cleaning",
  description:
    "Top-rated end of lease bond cleaning, spring cleaning, and pest control across the Gold Coast and Brisbane. 100% bond back guarantee.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <OurServices />
      <BondCleaningChecklist />
      <ServiceArea />
      <HowItWorks />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
