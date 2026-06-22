"use client";

import Image from "next/image";

const galleryImages = [
  "1.jpg",
  "a.jpg",
  "b.jpg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpg",
  "j.jpg",
];

// Duplicate for seamless looping
const marqueeImages = [...galleryImages, ...galleryImages];

export function BeforeAfterGallery() {
  return (
    <section className="py-6 sm:py-10 bg-white relative overflow-hidden">
      {/* Decorative blurs — reduced size */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl transform translate-x-1/2 translate-y-1/2" />

      {/* Horizontally scrolling marquee */}
      <div className="relative group overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-container">
          <div className="animate-marquee-track gap-4 sm:gap-6 pl-4">
            {marqueeImages.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="flex-shrink-0 w-[370px] sm:w-[440px] rounded-2xl overflow-hidden shadow-lg group/card hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5 bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`/images/gallery/${img}`}
                    alt={`Gallery image ${(i % galleryImages.length) + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    sizes="(max-width: 640px) 370px, 440px"
                  />
                  {/* Watermark on hover */}
                  <div className="absolute bottom-0 left-0 w-full bg-slate-900/0 backdrop-blur-sm py-2 px-4 flex justify-center items-center pointer-events-none z-10 transition-opacity duration-300 group-hover/card:bg-slate-900/40">
                    <Image
                      src="/logos/JBC-logo-JB-with-full-name-noBG.png"
                      alt="James Bond Cleaning"
                      width={120}
                      height={40}
                      className="w-auto h-6 sm:h-8 drop-shadow-md opacity-90"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
