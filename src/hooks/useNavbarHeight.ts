"use client";

import { useEffect, useState } from "react";

/**
 * Hook to dynamically measure the height of the fixed header navbar.
 * Useful for adjusting page layouts to prevent content from being covered.
 */
export function useNavbarHeight() {
  const [height, setHeight] = useState(80); // Default/fallback height

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeight = () => {
      setHeight(header.offsetHeight);
    };

    // Initial measurement
    updateHeight();

    // Setup ResizeObserver to detect header size changes (e.g. mobile menu expand, screen resize, etc.)
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(header);

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return height;
}
