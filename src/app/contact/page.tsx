import { Suspense } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE_HREF, SITE_PHONE_NUMBER, OPENING_HOURS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | James Bond Cleaning',
    description: 'Get a free quote for bond, carpet, or spring cleaning on the Gold Coast. Contact James Bond Cleaning via our form, phone, or email. We\'re ready to help!',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-secondary/30 relative overflow-hidden min-h-screen">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      <div className="container relative z-10">
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
            <Card className="group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <CardContent className="p-8 relative z-10">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl text-slate-900 leading-tight group-hover:text-primary transition-colors">Request a Quote Online</h3>
                  <div className="mt-2 h-0.5 w-12 bg-primary/20 group-hover:w-32 transition-all duration-500" />
                </div>
                <Suspense fallback={<div>Loading form...</div>}>
                  <QuoteForm />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden relative hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
              <CardContent className="p-6 relative z-10 space-y-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors">Contact Details</h3>
                  <div className="mt-2 h-0.5 w-8 bg-primary/20 group-hover:w-16 transition-all duration-500" />
                </div>
                <div className="space-y-4">
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
                </div>
              </CardContent>
            </Card>

            <Card className="group border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-2xl bg-gradient-to-br from-white/80 to-primary/10 backdrop-blur-md overflow-hidden relative hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />
              <CardContent className="p-6 relative z-10 space-y-6">
                <div>
                  <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors">Business Hours</h3>
                  <div className="mt-2 h-0.5 w-8 bg-primary/20 group-hover:w-16 transition-all duration-500" />
                </div>
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
