"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { Button } from "../ui/button";

const testimonials = [
  {
    name: "Melanie P",
    service: "Bond Cleaning",
    avatarUrl: "/images/testimonials/customer_1.png",
    quote:
      "James Bond Cleaning Gold Coast team did an amazing job on our property. They were professional, efficient, and left the place spotless. Highly recommended for stress-free bond cleaning.",
  },
  {
    name: "Steve Hawkins",
    service: "Move-Out / End-of-Lease Cleaning",
    avatarUrl: "/images/testimonials/customer_2.png",
    quote:
      "We were blown away by the James Bond Cleaning Gold Coast team. They were thorough, friendly, and ensured our apartment sparkled for the move-out inspection. Highly recommend for a hassle-free experience.",
  },
  {
    name: "Chantel D",
    service: "Carpet Steam Cleaning",
    avatarUrl: "/images/testimonials/customer_3.png",
    quote:
      "Exceptional carpet steam cleaning service in Gold Coast. The team arrived on time and transformed our dirty carpets into like-new condition. Thorough, efficient, and with no sticky residue left behind. Highly recommended.",
  },
  {
    name: "Ethan Wilson",
    service: "Builder / Post-Construction Cleaning",
    avatarUrl: "/images/testimonials/customer_4.png",
    quote:
      "James Bond Cleaning Services provided a top-quality builder clean on our Gold Coast home. They removed all construction dust and debris with great attention to detail. Professional, punctual, and left the property sparkling.",
  },
  {
    name: "Rose Harrison",
    service: "Bond Back Result",
    avatarUrl: "/images/testimonials/customer_5.png",
    quote:
      "Fantastic end-of-lease cleaning in the Gold Coast. The team was thorough and ensured our property passed inspection with flying colours. I received my full bond back. Great communication and competitive pricing — would definitely use again.",
  },
  {
    name: "Liam Thomas",
    service: "Upholstery & Deep Cleaning",
    avatarUrl: "/images/testimonials/customer_6.png",
    quote:
      "James Bond Cleaning transformed our Gold Coast home with their upholstery and deep cleaning services. The team was skilled, friendly, and meticulous. Our furniture looks refreshed and the house feels noticeably cleaner.",
  },
  {
    name: "Cooper Patrick",
    service: "Painting Services",
    avatarUrl: "/images/testimonials/customer_7.png",
    quote:
      "James Painting Services did an excellent job on our Gold Coast property. The team was professional and efficient, and the paintwork looks flawless with impressive attention to detail. Highly recommended for quality painting services.",
  },
];

// Duplicate the list so the marquee loops seamlessly
const marqueeItems = [...testimonials, ...testimonials];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });

  return (
    <section className="py-12 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 fill-mode-both ${
            headerInView
              ? "animate-in fade-in slide-in-from-bottom-8 duration-500 opacity-100"
              : "opacity-0"
          }`}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-playfair">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground/80 leading-relaxed">
            Don&apos;t just take our word for it — hear from satisfied customers
            across the Gold Coast.
          </p>
        </div>
      </div>

      {/* CSS marquee container */}
      <div className="relative group overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee-container">
          <div className="animate-marquee-track">
            {marqueeItems.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex-shrink-0 w-[280px] sm:w-[360px] mr-4 sm:mr-6">
                <div className="h-full rounded-2xl sm:rounded-3xl border border-primary/10 bg-white shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col relative overflow-hidden group/card">
                  {/* Top color bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />
                  
                  <div className="p-6 sm:p-8 flex flex-col gap-6 flex-grow relative">
                    {/* Decorative quote icon */}
                    <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/5 group-hover/card:text-primary/10 transition-colors duration-500 z-0" />

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                        <Image
                          src={t.avatarUrl}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-lg leading-tight">
                          {t.name}
                        </span>
                        <span className="text-xs font-medium text-primary mt-1 bg-primary/5 self-start px-2 py-0.5 rounded-md">
                          {t.service}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="relative z-10">
                      <StarRating />
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-700 leading-relaxed text-[16px] flex-grow relative z-10 font-playfair italic">
                      "{t.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <Button
          asChild
          size="lg"
          className="rounded-full px-6 py-5 sm:px-10 sm:py-7 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-primary hover:bg-primary/90">
          <a href="#quote-form">
            Get a Free Quote
          </a>
        </Button>
      </div>
    </section>
  );
}
