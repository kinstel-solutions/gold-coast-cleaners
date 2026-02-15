import { SERVICE_AREA_SUBURBS } from '@/lib/constants';
import { Badge } from '../ui/badge';

export function ServiceArea() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Proudly Serving the Entire Gold Coast
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our local team has in-depth knowledge of the Gold Coast area,
            ensuring we're always on time and familiar with the standards of
            local real estate agencies.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {SERVICE_AREA_SUBURBS.map((suburb) => (
            <Badge
              key={suburb}
              variant="outline"
              className="py-2 px-4 text-base bg-card"
            >
              {suburb}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
