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
    <div className="bg-card pt-32 pb-16 sm:pt-40 sm:pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="container relative z-10">
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
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl w-full">
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
    <div className="py-16 sm:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                We Pride Ourselves On
                </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map(value => (
                    <Card key={value.title} className="group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden hover:-translate-y-1">
                        <CardContent className="p-6 flex flex-col items-center gap-4 text-center relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
                            
                            <div className="h-16 w-16 rounded-xl bg-accent/20 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 z-10">
                                <value.icon className="h-8 w-8 transition-colors duration-300 text-accent-foreground group-hover:text-white" />
                            </div>
                            <div className="z-10 flex flex-col items-center">
                                <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors">{value.title}</h3>
                                <div className="mt-2 h-0.5 w-8 bg-primary/20 group-hover:w-full transition-all duration-500" />
                                <p className="mt-4 text-slate-600 text-sm">{value.description}</p>
                            </div>
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
