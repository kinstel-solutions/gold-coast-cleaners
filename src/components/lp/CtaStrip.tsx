"use client";

import { useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { HeroQuoteForm } from "../forms/HeroQuoteForm";

export function CtaStrip() {
  const [contentRef, contentInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href") === "#quote-form") {
        e.preventDefault();
        
        // Scroll to form
        const element = document.getElementById("quote-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          
          // Focus the input
          setTimeout(() => {
            const input = document.getElementById("form-name-input");
            if (input) {
              input.focus();
            }
          }, 800); // Allow smooth scroll animation to finish
        }
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <section id="quote-form" className="relative py-16 sm:py-24 overflow-hidden bg-primary">
      {/* Decorative dot background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div ref={contentRef} className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-md font-heading fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-bottom-6 duration-500 opacity-100" : "opacity-0"}`}>
          Ready for a Stress-Free Move?
        </h2>
        <p className={`text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100 opacity-100" : "opacity-0"}`}>
          Get your instant, obligation-free bond cleaning quote now. It takes less than 60 seconds to lock in your cleaning schedule.
        </p>
        
        <div className={`w-full max-w-xl mx-auto text-left fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200 opacity-100" : "opacity-0"}`}>
          <HeroQuoteForm title="Get Your Free Quote" redirectOnSubmit={true} />
        </div>
      </div>
    </section>
  );
}
