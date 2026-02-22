"use client";

import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const testimonials = [
  {
    name: "Melanie P",
    service: "Bond Cleaning",
    quote:
      "James Bond Cleaning Gold Coast team did an amazing job on our property. They were professional, efficient, and left the place spotless. Highly recommended for stress-free bond cleaning.",
  },
  {
    name: "Steve Hawkins",
    service: "Move-Out / End-of-Lease Cleaning",
    quote:
      "We were blown away by the James Bond Cleaning Gold Coast team. They were thorough, friendly, and ensured our apartment sparkled for the move-out inspection. Highly recommend for a hassle-free experience.",
  },
  {
    name: "Chantel D",
    service: "Carpet Steam Cleaning",
    quote:
      "Exceptional carpet steam cleaning service in Brisbane. The team arrived on time and transformed our dirty carpets into like-new condition. Thorough, efficient, and with no sticky residue left behind. Highly recommended.",
  },
  {
    name: "Ethan Wilson",
    service: "Builder / Post-Construction Cleaning",
    quote:
      "James Bond Cleaning Services provided a top-quality builder clean on our Gold Coast home. They removed all construction dust and debris with great attention to detail. Professional, punctual, and left the property sparkling.",
  },
  {
    name: "Rose Harrison",
    service: "Bond Back Result",
    quote:
      "Fantastic end-of-lease cleaning in the Gold Coast. The team was thorough and ensured our property passed inspection with flying colours. I received my full bond back. Great communication and competitive pricing — would definitely use again.",
  },
  {
    name: "Liam Thomas",
    service: "Upholstery & Deep Cleaning",
    quote:
      "James Bond Cleaning transformed our Gold Coast home with their upholstery and deep cleaning services. The team was skilled, friendly, and meticulous. Our furniture looks refreshed and the house feels noticeably cleaner.",
  },
  {
    name: "Cooper Patrick",
    service: "Painting Services",
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
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 fill-mode-both ${
            headerInView
              ? "animate-in fade-in slide-in-from-bottom-8 duration-700 opacity-100"
              : "opacity-0"
          }`}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-heading">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground/80 leading-relaxed">
            Don&apos;t just take our word for it — hear from satisfied customers
            across the Gold Coast.
          </p>
        </div>
      </div>

      {/* Auto-scrolling marquee */}
      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="flex-shrink-0 w-[360px] sm:w-[400px]">
              <div className="h-full rounded-3xl border border-primary/10 bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col gap-5 relative overflow-hidden group/card">
                {/* Decorative quote icon */}
                <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/5 group-hover/card:text-primary/10 transition-colors duration-500" />

                <StarRating />

                <p className="text-slate-600 leading-relaxed text-[15px] flex-grow italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    {/* Avatar circle with initials */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-semibold text-slate-800">
                      {t.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                    {t.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
