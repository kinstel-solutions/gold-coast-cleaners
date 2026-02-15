import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { OurServices } from '@/components/home/OurServices';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ServiceArea } from '@/components/home/ServiceArea';
import { CtaStrip } from '@/components/home/CtaStrip';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <OurServices />
      <HowItWorks />
      <ServiceArea />
      <CtaStrip />
    </>
  );
}
