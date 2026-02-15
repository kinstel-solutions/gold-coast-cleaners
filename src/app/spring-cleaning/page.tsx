import Image from 'next/image';
import { Sun, Home, Layers } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CtaStrip } from '@/components/home/CtaStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Spring & Deep Cleaning Service Gold Coast | James Bond Cleaners',
    description: 'Comprehensive deep cleaning and spring cleaning services on the Gold Coast. Perfect for a seasonal refresh or a complete home reset. Book your detailed clean today!',
};

const features = [
  {
    icon: Sun,
    title: 'Seasonal Refresh',
    description: 'The perfect way to reset your home after a long season. We air out, dust, and deep clean to make your space feel new again.',
  },
  {
    icon: Home,
    title: 'Complete Home Reset',
    description: 'Ideal before a special event, after renovations, or anytime you need a more intensive clean than your regular routine.',
  },
  {
    icon: Layers,
    title: 'Detailed Dust & Grime Removal',
    description: 'We go beyond surface cleaning to tackle areas that are often missed, such as behind furniture, on top of cabinets, and inside fixtures.',
  },
];

export default function SpringCleaningPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'spring-cleaning-hero');

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] max-h-[550px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container text-primary-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Meticulous Spring & Deep Cleaning
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              A comprehensive, top-to-bottom clean that revitalises your entire home.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                A Deeper Level of Clean
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our Spring/Deep Cleaning service is far more detailed than a standard clean. We focus on the accumulated dust and grime in all the hard-to-reach places, leaving your home exceptionally fresh and hygienic.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                This service is fully customisable to your needs. Whether you need a one-off deep clean or a regular seasonal refresh, we can tailor a package that is perfect for you and your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
