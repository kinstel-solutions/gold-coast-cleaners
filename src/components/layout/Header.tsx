'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gem,
  Menu,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NAVIGATION_LINKS,
  SITE_NAME,
  SITE_PHONE_HREF,
  SITE_PHONE_NUMBER,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      {NAVIGATION_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-sm transition-all',
        isScrolled && 'border-border'
      )}
    >
      <div className="container flex h-16 items-center">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 font-bold text-lg"
        >
          <Gem className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Button asChild className="hidden md:flex" variant="outline" >
             <a href={SITE_PHONE_HREF}>
              <Phone className="mr-2 h-4 w-4" />
              {SITE_PHONE_NUMBER}
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Gem className="h-6 w-6 text-primary" />
                  <span className="sr-only">{SITE_NAME}</span>
                </Link>
                {navLinks}
                 <Button asChild size="lg">
                    <a href={SITE_PHONE_HREF}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
