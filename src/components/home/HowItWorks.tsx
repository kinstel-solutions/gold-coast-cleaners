'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useInView } from '@/hooks/use-in-view';

const steps = [
  {
    step: 1,
    title: 'Request a Quote',
    description: 'Fill out our simple form or call us directly.',
    imageUrl: '/images/how-it-works-1-quote.png',
  },
  {
    step: 2,
    title: 'Get Confirmation',
    description: 'We confirm your booking and cleaning schedule.',
    imageUrl: '/images/how-it-works-2-confirm.png',
  },
  {
    step: 3,
    title: 'We Clean',
    description: 'Our professionals complete the job thoroughly and efficiently.',
    imageUrl: '/images/how-it-works-3-clean.png',
  },
  {
    step: 4,
    title: 'Inspection Ready',
    description: 'Your property is ready for final inspection.',
    imageUrl: '/images/how-it-works-4-ready.png',
  },
];

export function HowItWorks() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [stepsRef, stepsInView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 sm:py-32 bg-white relative">
      <div className="container px-4 md:px-6">
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 fill-mode-both ${headerInView ? 'animate-in fade-in slide-in-from-bottom-8 duration-700 opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 mb-6 font-heading">
            Our Simple 4-Step Process
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Getting your property professionally cleaned has never been easier.
            We handle the details so you can focus on moving.
          </p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 rounded-full hidden md:block" />
          
          <div ref={stepsRef} className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Text Content Side */}
                <div 
                  className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center fill-mode-both ${stepsInView ? `animate-in fade-in ${index % 2 === 0 ? 'md:slide-in-from-left-12' : 'md:slide-in-from-right-12'} duration-700 opacity-100` : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 1200}ms` }}
                >
                  <div className={`inline-block p-6 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-secondary hover:border-primary/30 transition-all duration-300 w-full max-w-md ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>

                {/* Center Circle */}
                <div 
                  className={`relative flex items-center justify-center fill-mode-both ${stepsInView ? 'animate-in fade-in zoom-in duration-500 opacity-100' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 1200 + 300}ms` }}
                >
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(var(--primary),0.4)] z-10 border-4 border-white">
                    {step.step}
                  </div>
                   {/* Mobile connecting line for vertical stacking */}
                   {index !== steps.length - 1 && (
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gray-200 md:hidden" />
                   )}
                </div>

                {/* Image Side */}
                <div 
                  className={`flex-1 fill-mode-both ${stepsInView ? `animate-in fade-in ${index % 2 === 0 ? 'md:slide-in-from-right-12' : 'md:slide-in-from-left-12'} duration-700 opacity-100` : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 1200 + 500}ms` }}
                >
                  <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}>
                    <Image
                      src={step.imageUrl}
                      alt={step.title}
                      fill
                      className="object-cover"
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
