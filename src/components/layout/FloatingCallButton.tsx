"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Calendar, X, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_PHONE_HREF, SITE_WHATSAPP_HREF, SITE_PHONE_NUMBER } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export function FloatingCallButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-none hidden md:flex"
      >
        {/* Expanded Menu Options */}
        <div 
          className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out origin-bottom ${
            isOpen 
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
              : "opacity-0 translate-y-4 scale-75 pointer-events-none"
          }`}
        >
          {/* Phone Call Option */}
          <div className="relative group flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              Call: {SITE_PHONE_NUMBER}
            </span>
            <a
              href={SITE_PHONE_HREF}
              onClick={() => {
                sendGTMEvent({
                  event: "phone_call",
                  placement: "floating_menu",
                  journey_string: pathname,
                });
                setIsOpen(false);
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>

          {/* Book Online Option */}
          <div className="relative group flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              Book Online
            </span>
            <Link
              href="/booking"
              onClick={() => {
                sendGTMEvent({
                  event: "booking_click",
                  placement: "floating_menu",
                  journey_string: pathname,
                });
                setIsOpen(false);
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-transform hover:scale-105"
            >
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Main Toggle Button */}
        <div className="relative group pointer-events-auto">
          {/* Glow ring */}
          <div className={`absolute -inset-1 rounded-full bg-primary opacity-30 blur-md transition-opacity duration-300 ${
            isOpen ? "opacity-10" : "group-hover:opacity-50 animate-pulse-glow"
          }`} />
          
          {/* Tooltip (only when closed) */}
          {!isOpen && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg translate-x-2 group-hover:translate-x-0">
              Contact Us
              <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-slate-900 rotate-45" />
            </span>
          )}

          <Button
            onClick={toggleMenu}
            size="icon"
            aria-label="Contact options"
            className={`w-[60px] h-[60px] rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
              isOpen 
                ? "bg-slate-800 text-white hover:bg-slate-700 rotate-90" 
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Visible across the site on mobile screens) */}
      {pathname !== "/booking" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B2D6E]/80 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex gap-3 md:hidden shadow-[0_-4px_16px_rgba(11,45,110,0.35)] pointer-events-auto">
          <a
            href={SITE_PHONE_HREF}
            onClick={() => {
              sendGTMEvent({
                event: "phone_call",
                placement: "mobile_sticky_bar",
                journey_string: pathname,
              });
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white text-primary font-semibold text-center transition-all hover:scale-[1.02] shadow-md"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-primary">Call Now</span>
          </a>
          <Link
            href="/booking"
            onClick={() => {
              sendGTMEvent({
                event: "booking_click",
                placement: "mobile_sticky_bar",
                journey_string: pathname,
              });
            }}
            className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-center transition-all hover:scale-[1.02] shadow-md border border-white/5 animate-pulse-glow-white"
          >
            <div className="animate-shimmer-sweep-sync" />
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>Get Quote</span>
          </Link>
        </div>
      )}
    </>
  );
}
