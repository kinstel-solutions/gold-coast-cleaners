"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Sparkles,
  MapPin,
  DollarSign,
  Clock,
  ThumbsUp,
  ShieldCheck,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const features = [
  {
    name: "Detailed & Thorough Cleaning",
    icon: Sparkles,
  },
  {
    name: "Local Gold Coast Team",
    icon: MapPin,
  },
  {
    name: "Transparent Pricing",
    icon: DollarSign,
  },
  {
    name: "On-Time Service",
    icon: Clock,
  },
  {
    name: "Satisfaction Guarantee",
    icon: ThumbsUp,
  },
  {
    name: "REIQ Approved Checklist",
    icon: ShieldCheck,
  },
];

export function WhyChooseUs() {
  const [imageRef, imageInView] = useInView({ threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={imageRef}
            className={`relative group fill-mode-both ${imageInView ? "animate-in fade-in slide-in-from-left-12 duration-1000 opacity-100" : "opacity-0"}`}>
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl transform -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/why-choose-us-team.png"
                alt="Our Professional Cleaning Team"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/30 rounded-full blur-3xl shadow-primary/20" />
          </div>

          <div ref={contentRef}>
            <div
              className={`text-left mb-12 fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-right-8 duration-700 delay-200 opacity-100" : "opacity-0"}`}>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 font-heading text-slate-900 leading-[1.1]">
                Why Choose{" "}
                <span className="text-primary">James Bond Cleaning</span>?
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                At James Bond Cleaning, we understand the importance of making
                your property inspection-ready. Our experienced team follows a
                strict, real estate-approved checklist.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={feature.name}
                  className={`group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden hover:-translate-y-1 fill-mode-both ${contentInView ? "animate-in fade-in slide-in-from-bottom-8 duration-500 opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 400 + 200}ms` }}>
                  <CardContent className="p-6 flex flex-col items-start gap-4 text-left relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />

                    <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feature.icon className="h-6 w-6 transition-colors duration-300 text-accent-foreground group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-slate-900 leading-tight group-hover:text-primary transition-colors">
                        {feature.name}
                      </h3>
                      <div className="mt-2 h-0.5 w-8 bg-primary/20 group-hover:w-full transition-all duration-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
