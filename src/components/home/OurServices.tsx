'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useInView } from '@/hooks/use-in-view';

export function OurServices() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 sm:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="container relative z-10">
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-opacity duration-700 ${headerInView ? 'animate-in fade-in slide-in-from-bottom-8 opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            Our Professional Cleaning Services
          </h2>
          <p className="text-xl text-muted-foreground/80 leading-relaxed">
            We offer a range of specialized cleaning services to meet your
            needs, all performed to the highest standards.
          </p>
        </div>
        
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {SERVICES.map((service, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === service.imagePlaceholder
            );
            return (
              <Card
                key={service.title}
                className={`group flex flex-col overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-3xl bg-card/50 backdrop-blur-sm fill-mode-both ${gridInView ? 'animate-in fade-in slide-in-from-bottom-12 opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${(index + 1) * 100}ms`, animationDuration: '700ms' }}
              >
                {image && (
                  <div className="relative h-64 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 text-primary group-hover:text-accent transition-colors font-semibold text-lg hover:bg-transparent">
                    <Link href={service.href} className="flex items-center gap-2">
                      Learn More <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-primary hover:bg-primary/90">
            <Link href="/contact">
              View All Services & Get a Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
