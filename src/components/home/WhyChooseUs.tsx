import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const features = [
  {
    name: 'Detailed & Thorough Cleaning',
  },
  {
    name: 'Local Gold Coast Team',
  },
  {
    name: 'Transparent Pricing',
  },
  {
    name: 'On-Time Service',
  },
  {
    name: 'Satisfaction Guarantee',
  },
  {
    name: 'Real-Estate Approved',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose James Bond Cleaners?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At James Bond Cleaners, we understand the importance of leaving your
            property spotless. Our experienced team follows a strict real
            estate–approved cleaning checklist to ensure your property meets
            inspection standards.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">{feature.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
