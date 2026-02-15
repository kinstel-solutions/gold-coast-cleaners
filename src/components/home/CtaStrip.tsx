import { Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { QuoteDialog } from '../QuoteDialog';
import { SITE_PHONE_HREF } from '@/lib/constants';

export function CtaStrip() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Moving Out? Let Us Handle the Cleaning.
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Focus on your move while we ensure your property is spotless and
          inspection-ready.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <QuoteDialog
            trigger={
              <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get a Free Quote
              </Button>
            }
          />
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <a href={SITE_PHONE_HREF}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
