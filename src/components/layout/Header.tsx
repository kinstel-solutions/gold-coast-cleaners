"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteLogo } from "@/components/SiteLogo";
import { Menu, Phone, Calendar, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroQuoteForm } from "@/components/forms/HeroQuoteForm";
import {
  NAVIGATION_LINKS,
  SITE_NAME,
  SITE_PHONE_HREF,
  SITE_PHONE_NUMBER,
  SERVICES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  // Use scroll state if on home, otherwise always show solid background
  const showSolidBackground = isScrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        showSolidBackground
          ? "bg-white/50 backdrop-blur-xl shadow-md border-b border-white/60 py-3 sm:py-5"
          : "bg-white/50 backdrop-blur-xl py-3 sm:py-5",
      )}>
      <div className="container flex items-center justify-between">
        {/* Logo Section */}
        <Link
          href="/"
          aria-label="Home"
          className="z-10 relative">
          <SiteLogo
            className="w-28 h-12 sm:w-32 sm:h-16 lg:w-48 lg:h-20 transition-transform duration-300 group-hover:scale-105"
            priority
            variant="dark"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50 shadow-sm">
          {NAVIGATION_LINKS.map((link) => {
            if (link.name === "Services") {
              return (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1 outline-none",
                        "text-slate-600 hover:text-primary hover:bg-slate-50",
                      )}>
                      {link.name}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="w-56 p-2 rounded-xl border border-primary/10 bg-white/95 backdrop-blur-md shadow-xl">
                    {SERVICES.map((service) => (
                      <DropdownMenuItem
                        key={service.href}
                        asChild>
                        <Link
                          href={service.href}
                          className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary">
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
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50",
                )}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className={cn(
              "hidden xl:flex items-center gap-3 rounded-full bg-primary text-white hover:bg-slate-900 hover:text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 pl-1 pr-6 py-1 h-11 sm:h-12 cursor-pointer",
            )}>
            <a
              href={SITE_PHONE_HREF}
              aria-label="Call Us">
              <div className="bg-white rounded-full p-2.5 flex items-center justify-center shadow-sm shrink-0">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary fill-current" />
              </div>
              <span className="font-bold text-lg sm:text-xl whitespace-nowrap">{SITE_PHONE_NUMBER}</span>
            </a>
          </Button>

          <Dialog
            open={isBookModalOpen}
            onOpenChange={setIsBookModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "group rounded-full border-none bg-white text-slate-900 shadow-md transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5",
                  "pl-0.5 pr-3 sm:pr-6 py-1 h-9 sm:h-11 lg:h-12 cursor-pointer flex items-center gap-1.5 sm:gap-3",
                )}>
                <div className="bg-white rounded-full p-1.5 sm:p-2.5 flex items-center justify-center border border-slate-200 group-hover:border-transparent group-hover:shadow-sm shrink-0 transition-all">
                  <Calendar className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                </div>
                <span className="font-bold text-[10px] sm:text-sm lg:text-base whitespace-nowrap">Get a Quote</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[550px] p-0 border-none bg-transparent shadow-none">
              <DialogTitle className="sr-only">Get a Quote</DialogTitle>
              <HeroQuoteForm
                title="Quick Request"
                redirectOnSubmit={true}
                onSuccess={() => setIsBookModalOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Mobile Menu */}
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden ml-1 text-slate-900")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Quick access to our services, about us, and contact information.
              </SheetDescription>
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="flex items-center gap-2 mb-8">
                  <SiteLogo
                    className="h-10"
                    variant="dark"
                  />
                </div>

                <nav className="flex flex-col gap-2">
                  {NAVIGATION_LINKS.map((link) => {
                    if (link.name === "Services") {
                      return (
                        <div
                          key={link.name}
                          className="flex flex-col gap-1">
                          <div className="p-4 rounded-xl text-slate-900 font-semibold mb-1">
                            {link.name}
                          </div>
                          <div className="pl-6 flex flex-col gap-1 border-l-2 border-primary/10 ml-6">
                            {SERVICES.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setSheetOpen(false)}
                                className={cn(
                                  "p-3 rounded-lg transition-all text-sm font-medium",
                                  pathname === service.href
                                    ? "bg-primary/5 text-primary"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-50",
                                )}>
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
                        onClick={() => setSheetOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl transition-all",
                          pathname === link.href
                            ? "bg-primary/5 text-primary font-semibold border border-primary/20"
                            : "text-slate-600 hover:bg-slate-50 hover:text-primary",
                        )}>
                        {link.name}
                        {pathname === link.href && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm text-muted-foreground mb-3 text-center">
                      Ready to get your bond back?
                    </p>
                    <Button
                      asChild
                      className="w-full gap-2 shadow-sm"
                      size="lg">
                      <a href={SITE_PHONE_HREF}>
                        <Phone className="h-5 w-5 fill-current" />
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
