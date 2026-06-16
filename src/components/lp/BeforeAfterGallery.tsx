"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryImages = [
  "1.jpg",
  "a.jpg",
  "b.jpg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpg",
  "i.jpg",
  "j.jpg",
  "k.jpg",
  "l.jpg",
  "m.jpg",
  "n.jpg",
  "o.jpg",
  "p.jpg",
  "q.jpg",
  "r.jpg",
  "s.jpg",
  "t.jpg",
  "IMG_20230415_192922.jpg",
  "IMG_20230415_193258.jpg",
  "IMG_20230415_193449-min.jpg",
  "IMG_20230415_193821-min.jpg",
  "IMG_20230418_043105.jpg",
  "IMG_20230418_043215.jpg",
  "IMG_20230418_062753.jpg",
  "IMG_20230418_062837.jpg",
  "IMG_20230418_062945.jpg",
];

// Duplicate for seamless looping
const marqueeImages = [...galleryImages, ...galleryImages];

export function BeforeAfterGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const firstItem = container.querySelector("[data-gallery-item]");
      if (!firstItem) return;

      const itemWidth = firstItem.clientWidth;
      const parent = firstItem.parentElement;
      const gap = parent ? parseFloat(window.getComputedStyle(parent).gap) || 0 : 0;
      const stepWidth = itemWidth + gap;

      if (stepWidth <= 0) return;

      let currentScroll = container.scrollLeft;
      const halfWidth = container.scrollWidth / 2;

      // Seamless wrap-around when we reach the second half
      if (currentScroll >= halfWidth - 2) {
        container.scrollLeft = currentScroll - halfWidth;
        currentScroll = container.scrollLeft;
      }

      const slideIndex = Math.round(currentScroll / stepWidth);
      const nextScroll = (slideIndex + 1) * stepWidth;

      container.scrollTo({
        left: nextScroll,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-6 sm:py-10 bg-white relative overflow-hidden">
      {/* Decorative blurs — reduced size */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl transform translate-x-1/2 translate-y-1/2" />

      {/* Horizontally scrolling marquee */}
      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-2 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-2 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-none w-full pb-4 snap-x snap-mandatory"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex w-max gap-4 sm:gap-6 px-4">
            {marqueeImages.map((img, i) => (
              <div
                key={`${img}-${i}`}
                data-gallery-item
                className="flex-shrink-0 w-[370px] sm:w-[440px] rounded-2xl overflow-hidden shadow-lg group/card hover:shadow-xl transition-all duration-300 ring-1 ring-slate-900/5 bg-white snap-center lg:snap-start"
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
