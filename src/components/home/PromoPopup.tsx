"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Gift } from "lucide-react";
import { SITE_PHONE_HREF, SITE_PHONE_NUMBER } from "@/lib/constants";
import Link from "next/link";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has seen the popup recently
    const hasSeenPopup = sessionStorage.getItem("promo-popup-seen");
    
    if (!hasSeenPopup) {
      // Delay the popup so it doesn't immediately interrupt the user
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500); // 3.5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that the user has seen it for this session
    sessionStorage.setItem("promo-popup-seen", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) handleClose();
    }}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-0 bg-transparent shadow-none [&>button]:hidden" aria-describedby="promo-popup-description">
        <DialogTitle className="sr-only">Special 20% Off Offer</DialogTitle>
        <div className="relative bg-background rounded-2xl shadow-2xl border border-white/10 dark:border-white/5 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-60" />
          
          <div className="relative p-6 sm:p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/40 hover:bg-background/80 transition-colors backdrop-blur-md z-10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-5 sm:mb-6 shadow-xl ring-4 ring-primary/20 animate-in zoom-in duration-700 delay-200">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" />
              </div>
              
              <h2 className="text-2xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent">
                Wait! Don't Leave Without Your Discount
              </h2>
              
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 sm:p-5 w-full mb-5 sm:mb-6 shadow-sm">
                <p className="text-4xl sm:text-5xl font-black text-primary mb-2 tracking-tighter">
                  20% OFF
                </p>
                <p className="font-semibold text-foreground/80 text-sm sm:text-base">
                  On All Bond & Carpet Steam Cleaning
                </p>
              </div>

              <div id="promo-popup-description" className="w-full text-left bg-background/60 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 text-sm sm:text-base border border-foreground/5 shadow-inner backdrop-blur-sm">
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "100% Bond Back Guarantee*", 
                    "REIQ Approved Checklist", 
                    "No Hidden Charges"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 sm:gap-3 text-foreground/80 font-medium">
                      <div className="bg-accent/20 p-1 rounded-full shrink-0">
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full flex flex-col gap-3">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full rounded-full font-bold shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 h-12 sm:h-14 text-base" 
                  onClick={handleClose}
                >
                  <Link href="/contact#quote-form">
                    Claim 20% Off Now
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild 
                  size="lg" 
                  className="w-full rounded-full transition-all hover:bg-secondary/50 font-semibold h-12"
                >
                  <a href={SITE_PHONE_HREF}>
                    Or Call {SITE_PHONE_NUMBER}
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                *Terms and conditions apply. Limited time offer.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
