"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { useInView } from "@/hooks/use-in-view";
import { Button } from "../ui/button";

const features = [
  {
    name: "Detailed & Thorough Cleaning",
  },
  {
    name: "Local Gold Coast Team",
  },
  {
    name: "Transparent Pricing",
  },
  {
    name: "On-Time Service",
  },
  {
    name: "Satisfaction Guarantee",
  },
  {
    name: "REIQ Approved Checklist",
  },
];

export function WhyChooseUs() {
  const [imageRef, imageInView] = useInView({ threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ threshold: 0.1 });
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-12 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div
            ref={imageRef}
            className={`relative group fill-mode-both ${imageInView ? "animate-in fade-in slide-in-from-left-12 duration-500 opacity-100" : "opacity-0"}`}>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/why-choose-us-team.png"
                alt="Our Professional Cleaning Team"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Satisfaction Badge */}
            <div className={`mt-10 flex justify-center fill-mode-both ${imageInView ? "animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 opacity-100" : "opacity-0"}`}>
              <img 
                src="/images/satisfaction-badge.png" 
                alt="100% Satisfaction Guaranteed" 
                className="w-32 h-32 md:w-48 md:h-48 object-contain hover:scale-110 transition-transform duration-500 cursor-pointer" 
              />
            </div>
          </div>

          <div ref={contentRef}>
            <div
              className={`text-left mb-6 sm:mb-12 fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-right-8 duration-500 delay-100 opacity-100" : "opacity-0"}`}>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl mb-4 sm:mb-6 font-heading text-slate-900 leading-[1.1]">
                Why Choose{" "}
                <span className="text-primary">James Bond Cleaning</span>?
              </h2>
              <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                At James Bond Cleaning, we understand the importance of making
                your property inspection-ready. Our experienced team follows a
                strict, real estate-approved checklist.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const isHiddenOnMobile = !showAll && index >= 3;
                return (
                  <Card
                    key={feature.name}
                    className={`group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden hover:-translate-y-1 fill-mode-both ${isHiddenOnMobile ? "hidden sm:block" : ""} ${contentInView ? "animate-in fade-in slide-in-from-bottom-8 duration-300 opacity-100" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 150 + 100}ms` }}>
                    <CardContent className="p-4 sm:p-6 flex flex-col items-start gap-3 sm:gap-4 text-left relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors mt-2">
                          {feature.name}
                        </h3>
                        <div className="mt-2 h-0.5 w-8 bg-primary/20 group-hover:w-full transition-all duration-500" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {!showAll && (
              <div className="mt-8 text-center sm:hidden">
                <Button 
                  onClick={() => setShowAll(true)} 
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-primary/20 hover:bg-primary/5"
                >
                  Show More Reasons
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
