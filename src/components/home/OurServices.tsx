import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export function OurServices() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Professional Cleaning Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a range of specialized cleaning services to meet your
            needs, all performed to the highest standards.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SERVICES.map((service) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === service.imagePlaceholder
            );
            return (
              <Card
                key={service.title}
                className="flex flex-col overflow-hidden"
              >
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0">
                    <Link href={service.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              View All Services & Get a Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
