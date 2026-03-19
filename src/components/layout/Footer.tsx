import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import {
  NAVIGATION_LINKS,
  OPENING_HOURS,
  SERVICES,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_NAME,
  SITE_PHONE_HREF,
  SITE_PHONE_NUMBER,
  SITE_ADDRESS,
  SITE_INSTAGRAM_HREF,
  SITE_FACEBOOK_HREF,
} from "@/lib/constants";
import { AgencyCredit } from "@/components/AgencyCredit";

export function Footer() {
  const serviceLinks = SERVICES.map((service) => ({
    name: service.title,
    href: service.href,
  }));
  const quickLinks = NAVIGATION_LINKS;

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2 font-bold text-xl">
              <SiteLogo
                priority
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-muted-foreground">
              Your trusted partner for reliable and professional cleaning
              services on the Gold Coast.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact & Hours</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2 max-w-[200px]">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span>{SITE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={SITE_PHONE_HREF}
                  className="hover:text-primary transition-colors">
                  {SITE_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={SITE_EMAIL_HREF}
                  className="hover:text-primary transition-colors">
                  {SITE_EMAIL}
                </a>
              </li>
              <li className="pt-2">
                <p className="font-medium">{OPENING_HOURS.days}</p>
                <p>{OPENING_HOURS.hours}</p>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SITE_FACEBOOK_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={SITE_INSTAGRAM_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
            <p>
              Copyright &copy; {new Date().getFullYear()} jamesbondcleaningptyltd. All Rights Reserved.
            </p>
            <span className="hidden md:inline text-muted-foreground/40">|</span>
            <p>ABN: 94694137874</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <AgencyCredit className="text-card select-none cursor-default hover:text-card pointer-events-none" />
          </div>
        </div>
      </div>
    </footer>
  );
}
