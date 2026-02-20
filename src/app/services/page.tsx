import Image from 'next/image';
import {
  Check,
  Star,
  Users,
  Clock,
  Waves,
  Wind,
  Sparkles,
  Sun,
  Home,
  Layers,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CtaStrip } from '@/components/home/CtaStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | James Bond Cleaning Gold Coast',
  description:
    'Professional bond cleaning, carpet steam cleaning, and spring/deep cleaning services on the Gold Coast. Reliable, thorough, and competitive pricing.',
};

const bondStandOuts = [
  {
    icon: Check,
    title: 'Real Estate Checklist Based',
    description:
      'We use a comprehensive checklist approved by property managers to ensure nothing is missed.',
  },
  {
    icon: Star,
    title: 'Attention to Hidden Areas',
    description:
      'Our team focuses on the details that matter, like inside cupboards, behind appliances, and on top of door frames.',
  },
  {
    icon: Clock,
    title: 'Reliable and Punctual',
    description:
      'We respect your time. Our cleaners arrive on schedule and work efficiently to meet your deadline.',
  },
  {
    icon: Users,
    title: 'Competitive, Transparent Pricing',
    description:
      'Receive a fair, all-inclusive quote with no surprise fees. Quality service that fits your budget.',
  },
];

const carpetFeatures = [
  {
    icon: Waves,
    title: 'Deep Steam Cleaning',
    description:
      'Our powerful hot water extraction method reaches deep into carpet fibers to lift away dirt, grime, and allergens that vacuuming leaves behind.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Stain Removal',
    description:
      "We treat and remove a wide variety of tough stains, from coffee and wine to pet accidents, restoring your carpet's appearance.",
  },
  {
    icon: Wind,
    title: 'Effective Odour Removal',
    description:
      'Our cleaning process neutralises and eliminates unpleasant odours, leaving your carpets smelling fresh and clean, not just masked with perfumes.',
  },
];

const springFeatures = [
  {
    icon: Sun,
    title: 'Seasonal Refresh',
    description:
      'The perfect way to reset your home after a long season. We air out, dust, and deep clean to make your space feel new again.',
  },
  {
    icon: Home,
    title: 'Complete Home Reset',
    description:
      'Ideal before a special event, after renovations, or anytime you need a more intensive clean than your regular routine.',
  },
  {
    icon: Layers,
    title: 'Detailed Dust & Grime Removal',
    description:
      'We go beyond surface cleaning to tackle areas that are often missed, such as behind furniture, on top of cabinets, and inside fixtures.',
  },
];

export default function ServicesPage() {
  const bondHero = PlaceHolderImages.find((img) => img.id === 'bond-cleaning-hero');
  const carpetHero = PlaceHolderImages.find((img) => img.id === 'carpet-cleaning-hero');
  const springHero = PlaceHolderImages.find((img) => img.id === 'spring-cleaning-hero');

  return (
    <>
      {/* Page Header */}
      <section className="relative h-[40vh] min-h-[300px] w-full bg-primary/90">
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container text-primary-foreground pt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Professional Services
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              Explore our premium residential cleaning solutions tailored for the Gold Coast & Brisbane.
            </p>
          </div>
        </div>
      </section>

      {/* Bond Cleaning Section */}
      <section id="bond-cleaning" className="py-16 sm:py-24 scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Bond Cleaning
              </h2>
              <p className="mt-6 text-lg text-muted-foreground mb-8">
                We specialise in end-of-lease cleaning designed to help tenants secure their full bond refund, guaranteed. Our team follows a strict real estate approved checklist.
              </p>
              
               <div className="space-y-6">
                {bondStandOuts.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              {bondHero && (
                <Image
                  src={bondHero.imageUrl}
                  alt={bondHero.description}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
         <div className="h-px w-full bg-border/50" />
      </div>

      {/* Carpet Cleaning Section */}
      <section id="carpet-cleaning" className="py-16 sm:py-24 bg-accent/5 scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              {carpetHero && (
                <Image
                  src={carpetHero.imageUrl}
                  alt={carpetHero.description}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Carpet Steam Cleaning
              </h2>
              <p className="mt-6 text-lg text-muted-foreground mb-4">
                Over time, carpets accumulate dirt, dust, allergens, and tough stains that regular vacuuming can't handle. Our professional steam cleaning service is the solution for a truly deep clean.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                This is especially crucial for end-of-lease cleaning, as most rental agreements require a professional carpet clean.
              </p>
              
              <div className="space-y-6">
                {carpetFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
         <div className="h-px w-full bg-border/50" />
      </div>

      {/* Spring Cleaning Section */}
      <section id="spring-cleaning" className="py-16 sm:py-24 scroll-mt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Spring & Deep Cleaning
              </h2>
              <p className="mt-6 text-lg text-muted-foreground mb-4">
                Our Spring/Deep Cleaning service is far more detailed than a standard clean. We focus on the accumulated dust and grime in all the hard-to-reach places.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                A comprehensive, top-to-bottom clean that revitalises your entire home and leaves it exceptionally fresh and hygienic.
              </p>
              
               <div className="space-y-6">
                {springFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              {springHero && (
                <Image
                  src={springHero.imageUrl}
                  alt={springHero.description}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
