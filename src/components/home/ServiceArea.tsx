'use client';

import Image from 'next/image';
import { SERVICE_AREA_GOLD_COAST, SERVICE_AREA_BRISBANE } from '@/lib/constants';
import { Badge } from '../ui/badge';
import { useInView } from '@/hooks/use-in-view';

export function ServiceArea() {
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });
  const [imageRef, imageInView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 sm:py-32 bg-accent/5 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={contentRef}
            className={`fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-left-8 duration-700 opacity-100' : 'opacity-0'}`}
          >
            <div className="text-left mb-12">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                 Proudly Serving Gold Coast & Brisbane
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our local team has in-depth knowledge of the Gold Coast and Brisbane areas,
                ensuring we're always on time and familiar with the standards of
                local real estate agencies.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Gold Coast</h3>
                <div className="flex flex-wrap gap-3">
                  {SERVICE_AREA_GOLD_COAST.map((suburb, index) => (
                    <Badge
                      key={suburb}
                      variant="outline"
                      className={`py-2.5 px-5 text-base bg-white/80 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 hover:border-primary shadow-sm hover:shadow-md cursor-default rounded-full fill-mode-both ${contentInView ? 'animate-in fade-in zoom-in-75 duration-500 opacity-100' : 'opacity-0'}`}
                      style={{ animationDelay: `${(index + 1) * 20}ms` }}
                    >
                      {suburb}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Brisbane</h3>
                <div className="flex flex-wrap gap-3">
                  {SERVICE_AREA_BRISBANE.map((suburb, index) => (
                    <Badge
                      key={suburb}
                      variant="outline"
                      className={`py-2.5 px-5 text-base bg-white/80 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 hover:border-primary shadow-sm hover:shadow-md cursor-default rounded-full fill-mode-both ${contentInView ? 'animate-in fade-in zoom-in-75 duration-500 opacity-100' : 'opacity-0'}`}
                      style={{ animationDelay: `${(index + 1 + SERVICE_AREA_GOLD_COAST.length) * 20}ms` }}
                    >
                      {suburb}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={imageRef}
            className={`relative fill-mode-both ${imageInView ? 'animate-in fade-in slide-in-from-right-12 duration-1000 delay-100 opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl transform rotate-3" />
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/service-area-gc.png"
                alt="Clean Gold Coast Apartment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
