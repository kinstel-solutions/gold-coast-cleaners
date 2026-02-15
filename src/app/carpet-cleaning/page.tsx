import Image from 'next/image';
import { Waves, Wind, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CtaStrip } from '@/components/home/CtaStrip';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Carpet Steam Cleaning Gold Coast | Bond Cleaning Gold Coast',
    description: 'Professional carpet steam cleaning on the Gold Coast. We remove tough stains, dirt, and odours, perfect for end-of-lease requirements. Get a fresh, clean carpet today!',
};

const features = [
  {
    icon: Waves,
    title: 'Deep Steam Cleaning',
    description: 'Our powerful hot water extraction method reaches deep into carpet fibers to lift away dirt, grime, and allergens that vacuuming leaves behind.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Stain Removal',
    description: 'We treat and remove a wide variety of tough stains, from coffee and wine to pet accidents, restoring your carpet\'s appearance.',
  },
  {
    icon: Wind,
    title: 'Effective Odour Removal',
    description: 'Our cleaning process neutralises and eliminates unpleasant odours, leaving your carpets smelling fresh and clean, not just masked with perfumes.',
  },
];

export default function CarpetCleaningPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'carpet-cleaning-hero');

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
              Professional Carpet Cleaning on the Gold Coast
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              Restore the beauty and freshness of your carpets with our expert steam cleaning service.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                Bring Your Carpets Back to Life
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Over time, carpets accumulate dirt, dust, allergens, and tough stains that regular vacuuming can't handle. Our professional steam cleaning service is the solution for a truly deep clean.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                This is especially crucial for end-of-lease cleaning, as most rental agreements require a professional carpet clean. We ensure your carpets meet the strict standards of property managers, helping you secure your bond.
              </p>
            </div>
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
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
