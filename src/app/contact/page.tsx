import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE_HREF, SITE_PHONE_NUMBER, OPENING_HOURS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Bond Cleaning Gold Coast',
    description: 'Get a free quote for bond, carpet, or spring cleaning on the Gold Coast. Contact Bond Cleaning Gold Coast via our form, phone, or email. We\'re ready to help!',
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready for a sparkling clean property? Contact us today for a free, no-obligation quote. We're here to answer any questions you may have.
            </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Request a Quote Online</CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteForm />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <a href={SITE_PHONE_HREF} className="flex items-center gap-3 group">
                    <Phone className="h-5 w-5 text-primary"/>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{SITE_PHONE_NUMBER}</span>
                </a>
                <a href={SITE_EMAIL_HREF} className="flex items-center gap-3 group">
                    <Mail className="h-5 w-5 text-primary"/>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{SITE_EMAIL}</span>
                </a>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary"/>
                    <span className="text-muted-foreground">Servicing the entire Gold Coast</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-semibold">{OPENING_HOURS.days}</p>
                        <p className="text-muted-foreground">{OPENING_HOURS.hours}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
