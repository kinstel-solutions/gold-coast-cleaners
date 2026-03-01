"use client";

import Image from "next/image";
import {
  SERVICE_AREA_GOLD_COAST,
  SERVICE_AREA_BRISBANE,
} from "@/lib/constants";
import { Badge } from "../ui/badge";
import { useInView } from "@/hooks/use-in-view";

export function ServiceArea() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gcContentRef, gcContentInView] = useInView({ threshold: 0.2 });
  const [gcImageRef, gcImageInView] = useInView({ threshold: 0.2 });
  const [bneContentRef, bneContentInView] = useInView({ threshold: 0.2 });
  const [bneImageRef, bneImageInView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-12 sm:py-32 bg-accent/5 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container relative z-10 space-y-12 sm:space-y-24">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto fill-mode-both ${headerInView ? "animate-in fade-in slide-in-from-bottom-8 duration-500 opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 font-heading text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Gold Coast & Brisbane Cleaning Service Areas
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            If you need end of lease bond cleaning, spring cleaning, or pest
            control, our local teams have in-depth knowledge of the Gold Coast
            and Brisbane areas. We're stationed locally to ensure we're always
            on time and familiar with the specific standards of your local real
            estate agencies.
          </p>
        </div>

        {/* Gold Coast Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div
            ref={gcContentRef}
            className={`fill-mode-both ${gcContentInView ? "animate-in fade-in slide-in-from-left-8 duration-500 opacity-100" : "opacity-0"}`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">
              Gold Coast
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SERVICE_AREA_GOLD_COAST.map((suburb, index) => (
                <Badge
                  key={suburb}
                  variant="outline"
                  className={`py-1.5 px-3 text-sm sm:py-2.5 sm:px-5 sm:text-base bg-white/80 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 hover:border-primary shadow-sm hover:shadow-md cursor-default rounded-full fill-mode-both ${gcContentInView ? "animate-in fade-in zoom-in-75 duration-300 opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 1) * 20}ms` }}>
                  {suburb}
                </Badge>
              ))}
            </div>
          </div>

          <div
            ref={gcImageRef}
            className={`relative fill-mode-both ${gcImageInView ? "animate-in fade-in slide-in-from-right-12 duration-500 delay-75 opacity-100" : "opacity-0"}`}>
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl transform rotate-3" />
            <div className="relative aspect-[14/12] rounded-3xl overflow-hidden shadow-2xl bg-white/20">
              <Image
                src="/images/gold-coast-service-areas.png"
                alt="Gold Coast Service Areas"
                fill
                className="object-fill p-[0.5px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Brisbane Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div
            ref={bneImageRef}
            className={`order-2 lg:order-1 relative fill-mode-both ${bneImageInView ? "animate-in fade-in slide-in-from-left-12 duration-500 delay-75 opacity-100" : "opacity-0"}`}>
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl transform -rotate-3" />
            <div className="relative aspect-[14/12] rounded-3xl overflow-hidden shadow-2xl bg-white/20">
              <Image
                src="/images/brisbane-service-areas.png"
                alt="Brisbane Service Areas"
                fill
                className="object-fill p-[0.5px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div
            ref={bneContentRef}
            className={`order-1 lg:order-2 fill-mode-both ${bneContentInView ? "animate-in fade-in slide-in-from-right-8 duration-500 opacity-100" : "opacity-0"}`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">
              Brisbane
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SERVICE_AREA_BRISBANE.map((suburb, index) => (
                <Badge
                  key={suburb}
                  variant="outline"
                  className={`py-1.5 px-3 text-sm sm:py-2.5 sm:px-5 sm:text-base bg-white/80 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 hover:border-primary shadow-sm hover:shadow-md cursor-default rounded-full fill-mode-both ${bneContentInView ? "animate-in fade-in zoom-in-75 duration-300 opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 1) * 20}ms` }}>
                  {suburb}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
