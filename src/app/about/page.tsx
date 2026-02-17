import Image from 'next/image';
import { Check, Star, Trophy, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CtaStrip } from '@/components/home/CtaStrip';

const values = [
  {
    icon: Trophy,
    title: 'Professionalism',
    description:
      'Our uniformed, trained, and insured team treats every property with the utmost respect and care.',
  },
  {
    icon: Check,
    title: 'Attention to Detail',
    description:
      'We follow a comprehensive checklist to ensure no corner is overlooked, from skirting boards to ceiling fans.',
  },
  {
    icon: Star,
    title: 'Customer Satisfaction',
    description:
      'Your satisfaction is our mission. We strive to exceed expectations and ensure a smooth handover.',
  },
  {
    icon: Users,
    title: 'Honest Pricing',
    description:
      'We provide transparent, upfront quotes with no hidden fees, so you know exactly what to expect.',
  },
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-team');

  return (
    <>
    <div className="bg-card">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Your Trusted Local Cleaning Partner in Gold Coast
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              James Bond Cleaning was founded with a commitment to delivering
              reliable and high-quality cleaning services across the Gold Coast.
              With years of industry experience, our team understands the high
              standards required by property managers and landlords for end-of-lease inspections.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We are a direct service provider, not a franchise or directory. This
              means you get a personal touch, consistent quality, and a team
              that truly cares about helping you secure your bond.
            </p>
          </div>
          <div className="relative h-80 lg:h-full rounded-lg overflow-hidden shadow-lg">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="py-16 sm:py-24">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                We Pride Ourselves On
                </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map(value => (
                    <Card key={value.title} className="text-center">
                        <CardHeader>
                            <value.icon className="h-12 w-12 text-primary mx-auto" />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">{value.title}</h3>
                            <p className="mt-2 text-muted-foreground text-sm">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
    <CtaStrip />
    </>
  );
}
