'use client';

import { Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { QuoteDialog } from '../QuoteDialog';
import { SITE_PHONE_HREF } from '@/lib/constants';
import { useInView } from '@/hooks/use-in-view';

export function CtaStrip() {
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-24 overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div ref={contentRef} className="container relative z-10 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 drop-shadow-md font-heading fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-700 opacity-100' : 'opacity-0'}`}>
          Moving Out? Let Us Handle the Cleaning.
        </h2>
        <p className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 opacity-100' : 'opacity-0'}`}>
          Focus on your move while we ensure your property is spotless and
          inspection-ready.
        </p>
        <div className={`flex flex-col sm:flex-row justify-center gap-6 fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400 opacity-100' : 'opacity-0'}`}>
          <QuoteDialog
            trigger={
              <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-white text-primary hover:bg-white/90 shadow-xl border-2 border-transparent transition-all transform hover:-translate-y-1">
                Get a Free Quote
              </Button>
            }
          />
          <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg bg-transparent border-2 border-white text-white hover:bg-white/20 hover:text-white hover:border-white transition-all transform hover:-translate-y-1">
            <a href={SITE_PHONE_HREF}>
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
