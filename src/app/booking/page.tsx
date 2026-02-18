import { Suspense } from 'react';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata = {
  title: 'Book Your Clean | James Bond Cleaning',
  description: 'Finalize your booking request with James Bond Cleaning.',
};

export default function BookingPage() {
  return (
    <div className="container py-16 sm:py-24 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-primary">
          Complete Your Booking
        </h1>
        <p className="text-lg text-muted-foreground">
          Please provide a few more details so we can give you an accurate quote and confirm your slot.
        </p>
      </div>
      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
        <Suspense fallback={<div>Loading form...</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
