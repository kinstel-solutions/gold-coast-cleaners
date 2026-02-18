'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sparkles, Waves, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(8, { message: 'Phone number is required.' }),
  services: z.array(z.string()).min(1, { message: 'Select at least one service.' }),
  terms: z.boolean().default(false).refine((val) => val === true, {
    message: 'You must agree to the terms.',
  }),
});

const serviceOptions = [
  { id: 'bond', label: 'Bond Clean', icon: Sparkles },
  { id: 'carpet', label: 'Carpet Clean', icon: Waves },
  { id: 'spring', label: 'Spring Clean', icon: Sun },
];

export function HeroQuoteForm() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      services: [],
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you might send this to an API route first to log the partial lead.
    // For now, we simulate success and redirect.
    toast({
      title: "Quote Request Started",
      description: "Redirecting you to complete your booking...",
    });

    const params = new URLSearchParams();
    params.set('name', values.name);
    params.set('email', values.email);
    params.set('phone', values.phone);
    params.set('services', values.services.join(',')); // Comma separated for URL
    
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Get a Free Quote</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" className="bg-gray-50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-3">
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email Address" className="bg-gray-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone Number" className="bg-gray-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Services</FormLabel>
                <div className="grid grid-cols-3 gap-3">
                  {serviceOptions.map((service) => {
                    const isSelected = field.value?.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => {
                          const newValue = isSelected
                            ? field.value.filter((v) => v !== service.id)
                            : [...field.value, service.id];
                          field.onChange(newValue);
                        }}
                        className={cn(
                          "cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 h-24",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-gray-100 hover:border-primary/30 bg-white text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <service.icon className={cn("h-6 w-6", isSelected ? "text-primary" : "text-gray-400")} />
                        <span className="text-xs font-semibold leading-tight">{service.label}</span>
                      </div>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs text-muted-foreground font-normal">
                    I agree to the <span className="underline cursor-pointer">Terms & Conditions</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-lg font-bold py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            Get Free Quote
          </Button>
        </form>
      </Form>
    </div>
  );
}
