'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QuoteForm } from './forms/QuoteForm';

type QuoteDialogProps = {
  trigger: React.ReactNode;
};

export function QuoteDialog({ trigger }: QuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get a Free, No-Obligation Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below, and our team will get back to you with a
            transparent price.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <QuoteForm onSuccess={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
