import { Check, Phone, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { SITE_PHONE_HREF } from "@/lib/constants";
import { HeroQuoteForm } from "../forms/HeroQuoteForm";
import Link from "next/link";

export function HeroSection() {
  return (
    // h-[100dvh] = hard cap at true viewport height (dvh accounts for mobile browser chrome).
    // overflow-hidden ensures nothing bleeds outside.
    // flex flex-col so the spacer + content stack vertically within the fixed height.
    <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover">
        <source
          src="/Bond_Cleaning_Hero_Video_Generated.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 sm:to-transparent" />

      {/* Fixed-height spacer matching the transparent header height */}
      <div className="relative h-20 sm:h-24 shrink-0" />

      {/* Content — flex-1 fills the remaining viewport below the spacer */}
      <div className="relative flex-1 flex items-center py-6 lg:py-0 overflow-hidden">
        <div className="container px-4 md:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
            {/* Right Column: Quote Form — hidden on small/medium, visible side-by-side on lg+ */}
            <div className="hidden lg:flex w-full max-w-md mx-auto lg:ml-auto animate-in fade-in slide-in-from-right-8 duration-1000 delay-100 order-2">
              <HeroQuoteForm />
            </div>

            {/* Left Column: Text Content */}
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 order-1 text-center lg:text-left mx-auto lg:mx-0">
              <div className="backdrop-blur-sm bg-black/40 border border-white/10 p-5 sm:p-7 md:p-8 rounded-3xl shadow-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-3 sm:mb-5 drop-shadow-lg leading-tight">
                  Gold Coast&apos;s Trusted{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
                    Bond Cleaning
                  </span>{" "}
                  Experts
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-5 sm:mb-6 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Professional End-of-Lease Cleaning That Helps You Secure Your
                  Full Bond Refund.
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-7 text-left">
                  {[
                    "100% Bond Back Focused",
                    "Experienced Local Cleaners",
                    "REIQ Approved Checklist",
                    "Flexible Booking",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-white/90">
                      <div className="bg-accent/20 p-1 rounded-full shrink-0">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTAs — on mobile: Call + Get Quote dialog; on lg+ only Call (form is inline) */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full text-sm sm:text-base px-6 py-5 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white transition-all hover:-translate-y-0.5">
                    <a href={SITE_PHONE_HREF}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>

                  {/* Only shown on smaller screens where the inline form is hidden */}
                  <div className="lg:hidden w-full sm:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto rounded-full text-sm sm:text-base px-6 py-5 bg-accent hover:bg-accent/90 text-white transition-all hover:-translate-y-0.5">
                      <Link href="/contact">
                        <Calendar className="mr-2 h-4 w-4" />
                        Get Free Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
