"use client";

import { Check } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col overflow-hidden bg-slate-50">
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      {/* Fixed-height spacer matching the transparent header height */}
      <div className="relative h-20 sm:h-24 shrink-0" />

      {/* Content — flex-1 fills the remaining viewport below the spacer */}
      <div className="relative flex-1 flex items-center py-4 lg:pt-28 lg:pb-8">
        <div className="container px-4 md:px-6 w-full max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 text-center lg:text-left">
            <div className="bg-white/95 md:bg-transparent border border-slate-200/80 md:border-none py-6 px-6 sm:p-7 md:p-0 rounded-3xl md:rounded-none shadow-2xl md:shadow-none flex flex-col items-center lg:items-start">
              <button
                onClick={() => window.dispatchEvent(new Event("open-promo-popup"))}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-sm md:text-lg text-white font-semibold shadow-md animate-in fade-in zoom-in duration-500 delay-300 hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer text-left"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                🎉Special Offer: Upto 20% Off
              </button>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4 drop-shadow-sm leading-tight max-w-3xl">
                Hassle Free Bond Cleaning in{" "}
                <span className="bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary whitespace-nowrap">
                  Gold Coast
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Top-rated end of lease bond cleaning. Helping you secure your
                full bond refund, Guaranteed.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 text-left max-w-md lg:max-w-2xl w-full">
                {[
                  "100% Bond Back guarantee*",
                  "7 days job guarantee",
                  "Experienced Local Cleaners",
                  "REIQ Approved Checklist",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-700">
                    <div className="bg-primary/10 p-1 rounded-full shrink-0">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden rounded-full text-base px-8 py-6 bg-primary text-white hover:bg-primary/90 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto">
                  <a href="#quote-form">
                    <span>Get Instant Quote</span>
                    <div className="absolute inset-0 bg-white text-primary flex items-center justify-center font-semibold text-base animate-invert-sweep">
                      Get Instant Quote
                    </div>
                  </a>
                </Button>
              </div>
              
              <p className="text-[10px] text-slate-400 mt-4 italic text-left">
                *Terms & conditions apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
