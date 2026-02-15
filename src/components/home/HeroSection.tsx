import Image from 'next/image';
import { Check, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { QuoteDialog } from '../QuoteDialog';
import { SITE_PHONE_HREF } from '@/lib/constants';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-living-room');

  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[700px] w-full">
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
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex items-center">
        <div className="container text-white">
          <div className="max-w-3xl text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Gold Coast’s Trusted Bond Cleaning Experts
            </h1>
            <p className="mt-4 text-lg md:text-xl text-neutral-200">
              Professional End-of-Lease Cleaning That Helps You Secure Your Full Bond Refund.
            </p>
            <ul className="mt-6 space-y-2 text-left inline-block">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="font-semibold">100% Bond Back Focused</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="font-semibold">Experienced Local Cleaners</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="font-semibold">Real Estate Approved Checklist</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-accent" />
                <span className="font-semibold">Flexible Booking</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <QuoteDialog
                trigger={
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get a Free Quote
                  </Button>
                }
              />
              <Button asChild size="lg" variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <a href={SITE_PHONE_HREF}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
