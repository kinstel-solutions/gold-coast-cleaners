"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageSquare, X, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_PHONE_HREF, SITE_WHATSAPP_HREF, SITE_PHONE_NUMBER } from "@/lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { useState, useEffect, useRef } from "react";

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

  const smsHref = "sms:+61485878343?body=Hi%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20cleaning%20services.";
  const emailHref = "mailto:jamesbondcleaningau@gmail.com";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu Options */}
      <div 
        className={`flex flex-col gap-3 transition-all duration-300 ease-out origin-bottom ${
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

        {/* SMS Option */}
        <div className="relative group flex items-center gap-2">
          <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            Text / SMS Us
          </span>
          <a
            href={smsHref}
            onClick={() => {
              sendGTMEvent({
                event: "sms_click",
                placement: "floating_menu",
                journey_string: pathname,
              });
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-white shadow-lg transition-transform hover:scale-105"
          >
            <MessageSquare className="h-5 w-5" />
          </a>
        </div>

        {/* Email Option */}
        <div className="relative group flex items-center gap-2">
          <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            Email Us
          </span>
          <a
            href={emailHref}
            onClick={() => {
              sendGTMEvent({
                event: "email_click",
                placement: "floating_menu",
                journey_string: pathname,
              });
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-transform hover:scale-105"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* WhatsApp Option */}
        <div className="relative group flex items-center gap-2">
          <span className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp Chat
          </span>
          <a
            href={SITE_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sendGTMEvent({
                event: "whatsapp_click",
                placement: "floating_menu",
                journey_string: pathname,
              });
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#2EE370] text-white shadow-lg transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Main Toggle Button */}
      <div className="relative group">
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
  );
}
