"use client";

import { useInView } from "@/hooks/use-in-view";
import { Users, UserCheck, CheckCircle2, Trophy } from "lucide-react";

const stats = [
  {
    value: "3,500+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    icon: UserCheck,
  },
  {
    value: "1,000+",
    label: "Successful Projects",
    icon: CheckCircle2,
  },
  {
    value: "150+",
    label: "Bond Cleaners",
    icon: Trophy,
  },
];

export function StatsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/reference/stats-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center transition-all duration-700 ${inView ? "animate-in fade-in slide-in-from-bottom-8 opacity-100" : "opacity-0"}`}
              style={{ animationDelay: `${index * 150}ms` }}>
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base font-medium text-white/80 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
