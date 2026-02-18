import { Check, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { QuoteDialog } from '../QuoteDialog';
import { SITE_PHONE_HREF } from '@/lib/constants';
import { HeroQuoteForm } from '../forms/HeroQuoteForm';

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Bond_Cleaning_Hero_Video_Generated.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 sm:to-transparent" />
      <div className="relative h-full flex items-center">
        <div className="container px-4 md:px-6 pt-36 md:pt-0 pb-12 md:pb-0 h-full md:h-auto overflow-y-auto md:overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            
            {/* Right Column: Quote Form (Form First on Mobile) */}
            <div className="w-full max-w-md mx-auto lg:ml-auto animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 order-1 lg:order-2">
              <HeroQuoteForm />
            </div>

            {/* Left Column: Text Content (Text Second on Mobile) */}
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 order-2 lg:order-1 text-center lg:text-left mx-auto lg:mx-0">
              <div className="backdrop-blur-sm bg-black/40 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg leading-tight">
                  Gold Coast’s Trusted <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">Bond Cleaning</span> Experts
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Professional End-of-Lease Cleaning That Helps You Secure Your Full Bond Refund.
                </p>
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 text-left">
                  <li className="flex items-center gap-3 md:gap-4 text-white/90">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0">
                      <Check className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">100% Bond Back Focused</span>
                  </li>
                  <li className="flex items-center gap-3 md:gap-4 text-white/90">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0">
                       <Check className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">Experienced Local Cleaners</span>
                  </li>
                  <li className="flex items-center gap-3 md:gap-4 text-white/90">
                     <div className="bg-accent/20 p-1 rounded-full shrink-0">
                      <Check className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">Real Estate Approved Checklist</span>
                  </li>
                  <li className="flex items-center gap-3 md:gap-4 text-white/90">
                     <div className="bg-accent/20 p-1 rounded-full shrink-0">
                      <Check className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">Flexible Booking</span>
                  </li>
                </ul>
                
                {/* Buttons: Hidden quote button on mobile since form is visible */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-base md:text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white transition-all transform hover:-translate-y-1">
                    <a href={SITE_PHONE_HREF}>
                      <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
