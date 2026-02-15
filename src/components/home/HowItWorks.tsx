import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const steps = [
  {
    step: 1,
    title: 'Request a Quote',
    description: 'Fill out our simple form or call us directly.',
  },
  {
    step: 2,
    title: 'Get Confirmation',
    description: 'We confirm your booking and cleaning schedule.',
  },
  {
    step: 3,
    title: 'We Clean',
    description: 'Our professionals complete the job thoroughly and efficiently.',
  },
  {
    step: 4,
    title: 'Inspection Ready',
    description: 'Your property is ready for final inspection.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Simple 4-Step Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Getting your property professionally cleaned has never been easier.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            className="absolute top-10 left-1/2 -ml-[1px] h-[calc(100%-5rem)] w-0.5 bg-border"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex gap-6 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  {step.step}
                </div>
                <Card className={`w-full ${
                  index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                }`}>
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
