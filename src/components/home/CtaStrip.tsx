'use client';

import { Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { QuoteDialog } from '../QuoteDialog';
// import { SITE_PHONE_HREF } from '@/lib/constants';
import { useInView } from '@/hooks/use-in-view';
import { usePathname } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';
import { CallbackDialog } from '../CallbackDialog';

export function CtaStrip() {
  const pathname = usePathname();
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-12 sm:py-24 overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div ref={contentRef} className="container relative z-10 text-center">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 drop-shadow-md font-heading fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-500 opacity-100' : 'opacity-0'}`}>
          Moving Out? Let Us Handle the Cleaning.
        </h2>
        <p className={`text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100 opacity-100' : 'opacity-0'}`}>
          Focus on your move while we ensure your property is spotless and
          inspection-ready.
        </p>
        <div className={`flex flex-col sm:flex-row justify-center gap-6 fill-mode-both ${contentInView ? 'animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200 opacity-100' : 'opacity-0'}`}>
          <QuoteDialog
            placement="cta_strip_modal"
            trigger={
              <Button size="lg" className="relative overflow-hidden rounded-full px-6 py-5 sm:px-10 sm:py-7 text-base sm:text-lg bg-white text-primary hover:bg-white/90 shadow-xl border-2 border-transparent transition-all transform hover:-translate-y-1 animate-border-beam">
                <div className="animate-shimmer-sweep-sync" />
                <span>Get a Free Quote</span>
              </Button>
            }
          />
          {/* Backup of original CTA Call Now button:
          <Button asChild size="lg" variant="outline" className="relative overflow-hidden rounded-full px-6 py-5 sm:px-10 sm:py-7 text-base sm:text-lg bg-transparent border-2 border-white text-white hover:bg-white/20 hover:text-white hover:border-white transition-all transform hover:-translate-y-1 animate-pulse-glow">
            <a
              href={SITE_PHONE_HREF}
              onClick={() =>
                sendGTMEvent({
                  event: "phone_call",
                  placement: "cta_strip",
                  journey_string: pathname,
                })
              }>
              <div className="animate-shimmer-sweep-sync" />
              <div className="relative z-10 flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </div>
            </a>
          </Button>
          */}
          <CallbackDialog
            placement="cta_strip"
            trigger={
              <Button size="lg" variant="outline" className="relative overflow-hidden rounded-full px-6 py-5 sm:px-10 sm:py-7 text-base sm:text-lg bg-transparent border-2 border-white text-white hover:bg-white/20 hover:text-white hover:border-white transition-all transform hover:-translate-y-1 animate-pulse-glow cursor-pointer">
                <div className="animate-shimmer-sweep-sync" />
                <div className="relative z-10 flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Request Callback
                </div>
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
