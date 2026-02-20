'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Phone,
  Calendar,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NAVIGATION_LINKS,
  SITE_NAME,
  SITE_PHONE_HREF,
  SITE_PHONE_NUMBER,
  SERVICES,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { QuoteDialog } from '../QuoteDialog';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  // Use scroll state if on home, otherwise always show solid background
  const showSolidBackground = isScrolled || !isHome;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        showSolidBackground
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-primary/10 py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl group"
        >
          <div className="relative h-10 w-40 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logos/JBcleaning-logo-NoBG%207%20(1).svg"
              alt={SITE_NAME}
              fill
              className={cn(
                "object-contain transition-all duration-300",
                !showSolidBackground && "brightness-0 invert"
              )}
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-sm">
          {NAVIGATION_LINKS.map((link) => {
            if (link.name === 'Services') {
              return (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 outline-none',
                        showSolidBackground ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.name}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56 p-2 rounded-xl border border-primary/10 bg-white/95 backdrop-blur-md shadow-xl">
                    {SERVICES.map((service) => (
                      <DropdownMenuItem key={service.href} asChild>
                        <Link 
                          href={service.href}
                          className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary"
                        >
                          {service.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : showSolidBackground ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="ghost" 
            className={cn(
              "hidden lg:flex font-medium gap-2",
              showSolidBackground ? "text-slate-700 hover:text-primary hover:bg-primary/5" : "text-white hover:text-white hover:bg-white/20"
            )}
          >
             <a href={SITE_PHONE_HREF}>
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{SITE_PHONE_NUMBER}</span>
            </a>
          </Button>

          <QuoteDialog
            trigger={
              <Button 
                className={cn(
                  "rounded-full shadow-lg transition-all hover:-translate-y-0.5",
                  showSolidBackground ? "bg-primary hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            }
          />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "md:hidden ml-1",
                  showSolidBackground ? "text-slate-900" : "text-white hover:bg-white/20"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <div className="relative h-10 w-32">
                    <Image
                      src="/logos/JBcleaning-logo-NoBG%207%20(1).svg"
                      alt={SITE_NAME}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {NAVIGATION_LINKS.map((link) => {
                    if (link.name === 'Services') {
                      return (
                        <div key={link.name} className="flex flex-col gap-1">
                          <div className="p-4 rounded-xl text-slate-900 font-semibold mb-1">
                            {link.name}
                          </div>
                          <div className="pl-6 flex flex-col gap-1 border-l-2 border-primary/10 ml-6">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className={cn(
                                  'p-3 rounded-lg transition-all text-sm font-medium',
                                  pathname === service.href 
                                    ? 'bg-primary/5 text-primary' 
                                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                                )}
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between p-4 rounded-xl transition-all',
                          pathname === link.href 
                            ? 'bg-primary/5 text-primary font-semibold border border-primary/20' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                        )}
                      >
                        {link.name}
                        {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm text-muted-foreground mb-3 text-center">Ready to get your bond back?</p>
                    <Button asChild className="w-full gap-2 shadow-sm" size="lg">
                      <a href={SITE_PHONE_HREF}>
                        <Phone className="h-4 w-4" />
                        Call {SITE_PHONE_NUMBER}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
