import Image from 'next/image';
import { Check, Star, Users, Clock } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CtaStrip } from '@/components/home/CtaStrip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Professional Bond Cleaning Gold Coast | James Bond Cleaners',
    description: 'Specialised end-of-lease and bond cleaning in Gold Coast. We follow a real estate-approved checklist to help you secure your full bond refund. Get a free quote!',
};


const inclusions = {
  Kitchen: ['Oven deep cleaning', 'Rangehood cleaning', 'Cabinet interiors & exteriors', 'Benchtops & sinks'],
  Bathrooms: ['Shower & glass scrubbing', 'Tile & grout cleaning', 'Mirrors & vanities', 'Toilets scrubbed & sanitised'],
  'Bedrooms & Living Areas': ['Detailed dusting', 'Skirting boards wiped down', 'Light switches & power points', 'Wardrobe interiors & shelves'],
  General: ['Internal windows & frames', 'Vacuuming & mopping all floors', 'Cobweb removal throughout', 'Spot clean walls'],
};

const standOuts = [
  {
    icon: Check,
    title: 'Real Estate Checklist Based',
    description: 'We use a comprehensive checklist approved by property managers to ensure nothing is missed.',
  },
  {
    icon: Star,
    title: 'Attention to Hidden Areas',
    description: 'Our team focuses on the details that matter, like inside cupboards, behind appliances, and on top of door frames.',
  },
  {
    icon: Clock,
    title: 'Reliable and Punctual',
    description: 'We respect your time. Our cleaners arrive on schedule and work efficiently to meet your deadline.',
  },
  {
    icon: Users,
    title: 'Competitive, Transparent Pricing',
    description: 'Receive a fair, all-inclusive quote with no surprise fees. Quality service that fits your budget.',
  },
];

export default function BondCleaningPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'bond-cleaning-hero');

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
              Professional Bond Cleaning in Gold Coast
            </h1>
            <p className="mt-4 mx-auto max-w-3xl text-lg md:text-xl text-primary-foreground/90">
              We specialise in end-of-lease cleaning designed to help tenants secure their full bond refund, guaranteed.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What’s Included in Our Bond Clean
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our bond cleaning service is a complete, top-to-bottom clean of the entire property.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(inclusions).map(([category, items]) => (
                <Card key={category}>
                    <CardHeader>
                        <CardTitle>{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {items.map(item => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-card">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Our Bond Cleaning Stands Out
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {standOuts.map(item => (
                <div key={item.title} className="text-center">
                    <item.icon className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
