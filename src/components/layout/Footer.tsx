import Link from 'next/link';
import { SiteLogo } from '@/components/SiteLogo';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  NAVIGATION_LINKS,
  OPENING_HOURS,
  SERVICES,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_NAME,
  SITE_PHONE_HREF,
  SITE_PHONE_NUMBER,
} from '@/lib/constants';

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
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <SiteLogo className="h-32" zoom={1.5} />
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
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
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
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact & Hours</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Service Area: Gold Coast</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={SITE_PHONE_HREF}
                  className="hover:text-primary transition-colors"
                >
                  {SITE_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={SITE_EMAIL_HREF}
                  className="hover:text-primary transition-colors"
                >
                  {SITE_EMAIL}
                </a>
              </li>
              <li className="pt-2">
                <p className="font-medium">{OPENING_HOURS.days}</p>
                <p>{OPENING_HOURS.hours}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
