import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OurServices } from "@/components/home/OurServices";
import { BondCleaningChecklist } from "@/components/home/BondCleaningChecklist";
import { ServiceArea } from "@/components/home/ServiceArea";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaStrip } from "@/components/home/CtaStrip";
import type { Metadata } from "next";

import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bond Cleaning Gold Coast & Brisbane | James Bond Cleaning",
  description:
    "Top-rated end of lease bond cleaning, spring cleaning, and pest control across the Gold Coast and Brisbane. 100% bond back guarantee.",
};

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
      {
        "@type": "City",
        name: "Brisbane",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <WhyChooseUs />
      <OurServices />
      <BondCleaningChecklist />
      <ServiceArea />
      <HowItWorks />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
