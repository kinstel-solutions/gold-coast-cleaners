"use client";

import { useNavbarHeight } from "@/hooks/useNavbarHeight";

interface BookingClientWrapperProps {
  children: React.ReactNode;
}

export function BookingClientWrapper({ children }: BookingClientWrapperProps) {
  const navbarHeight = useNavbarHeight();

  return (
    <div style={{ paddingTop: `${navbarHeight}px` }} className="transition-[padding-top] duration-300">
      {children}
    </div>
  );
}
