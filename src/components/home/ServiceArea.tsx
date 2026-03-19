"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  SERVICE_AREA_GOLD_COAST,
  SERVICE_AREA_BRISBANE,
} from "@/lib/constants";
import { useInView } from "@/hooks/use-in-view";

export function ServiceArea() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gcRef, gcInView] = useInView({ threshold: 0.1 });
  const [bneRef, bneInView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-12 sm:py-32 bg-white overflow-hidden relative">
      <div className="container relative z-10">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 sm:mb-24 fill-mode-both ${headerInView ? "animate-in fade-in slide-in-from-bottom-8 duration-500 opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
            Our Cleaning Service Areas
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From the heart of the Gold Coast to all across Brisbane, our professional 
            cleaning teams provide prompt, high-quality service wherever you are.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-40">
          {/* Gold Coast Section - Text Left, Map Right */}
          <div 
            ref={gcRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className={`lg:col-span-7 fill-mode-both ${gcInView ? "animate-in fade-in slide-in-from-left-8 duration-500 opacity-100" : "opacity-0"}`}>
              <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Gold Coast Suburbs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {SERVICE_AREA_GOLD_COAST.map((suburb) => (
                  <div key={suburb} className="flex items-center gap-2 group cursor-default">
                    <MapPin className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base text-slate-600 group-hover:text-primary transition-colors font-medium">
                      {suburb}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`lg:col-span-5 relative fill-mode-both ${gcInView ? "animate-in fade-in slide-in-from-right-12 duration-500 delay-150 opacity-100" : "opacity-0"}`}>
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl transform rotate-3" />
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-8">
                <Image
                  src="/images/reference/suburbs-map.svg"
                  alt="Gold Coast Service Areas Map"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Brisbane Section - Map Left, Text Right (Zig-Zag) */}
          <div 
            ref={bneRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className={`lg:col-span-5 order-2 lg:order-1 relative fill-mode-both ${bneInView ? "animate-in fade-in slide-in-from-left-12 duration-500 delay-150 opacity-100" : "opacity-0"}`}>
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl transform -rotate-3" />
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-8">
                <Image
                  src="/images/reference/suburbs-map.svg"
                  alt="Brisbane Service Areas Map"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className={`lg:col-span-7 order-1 lg:order-2 fill-mode-both ${bneInView ? "animate-in fade-in slide-in-from-right-8 duration-500 opacity-100" : "opacity-0"}`}>
              <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Brisbane Suburbs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {SERVICE_AREA_BRISBANE.map((suburb) => (
                  <div key={suburb} className="flex items-center gap-2 group cursor-default">
                    <MapPin className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base text-slate-600 group-hover:text-primary transition-colors font-medium">
                      {suburb}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 inline-block">
                <p className="text-sm font-semibold text-primary">
                  And surrounding areas... If your suburb isn't listed, we likely clean there too!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
