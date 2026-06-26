import { HeroSection } from "@/components/lp/HeroSection";
import { BeforeAfterGallery } from "@/components/lp/BeforeAfterGallery";
import { WhyChooseUs } from "@/components/lp/WhyChooseUs";
import { OurServices } from "@/components/lp/OurServices";
import { Testimonials } from "@/components/lp/Testimonials";
import { CtaStrip } from "@/components/lp/CtaStrip";
import type { Metadata } from "next";

import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bond Cleaning Gold Coast | James Bond Cleaning",
  description:
    "Top-rated end of lease bond cleaning, spring cleaning, and pest control service/flea treatment across the Gold Coast. 100% bond back guarantee.",
};

import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: "James Bond Cleaning",
    image:
      "https://jamesbondcleaning.au/logos/JBC-logo-JB-with-full-name-noBG.png",
    "@id": "https://jamesbondcleaning.au/#organization",
    url: "https://jamesbondcleaning.au",
    telephone: "07 5620 1066",
    email: "support@jamesbondcleaning.au",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 501, 18 Cypress Avenue",
      addressLocality: "Surfers Paradise",
      addressRegion: "QLD",
      postalCode: "4217",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.9996,
      longitude: 153.4295,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Gold Coast",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `https://jamesbondcleaning.au${service.href}`,
        },
      })),
    },
    sameAs: [
      "https://www.facebook.com/share/1FtNkUCPgM/?mibextid=wwXIfr",
      "https://www.instagram.com/jamesbondcleaning?igsh=cW9nNXk2OWZ1NzF5",
    ],
  };

  return (
    <div className="pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <BeforeAfterGallery />

      <Testimonials />
      <OurServices />
      <WhyChooseUs />

      <StatsSection />
      <CtaStrip />
    </div>
  );
}
