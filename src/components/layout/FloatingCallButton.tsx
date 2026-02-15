import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_PHONE_HREF } from '@/lib/constants';

export function FloatingCallButton() {
  return (
    <a
      href={SITE_PHONE_HREF}
      className="md:hidden fixed bottom-4 right-4 z-50"
      aria-label="Call Now"
    >
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </a>
  );
}
