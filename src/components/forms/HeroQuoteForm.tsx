"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Waves, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitPartialLead } from "@/app/actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(8, { message: "Phone number is required." }),
  services: z
    .array(z.string())
    .min(1, { message: "Select at least one service." }),
  terms: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the terms.",
    }),
});

const serviceOptions = [
  { id: "bond", label: "Bond Clean", icon: Sparkles },
  { id: "carpet", label: "Carpet Clean", icon: Waves },
  { id: "others", label: "Others", icon: Sun },
];

interface HeroQuoteFormProps {
  redirectOnSubmit?: boolean;
  title?: string;
  onSuccess?: () => void;
}

export function HeroQuoteForm({
  redirectOnSubmit = true,
  title = "Get a Free Quote",
  onSuccess,
}: HeroQuoteFormProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: [],
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Send the partial lead to Resend
      const response = await submitPartialLead({
        name: values.name,
        email: values.email,
        phone: values.phone,
        services: values.services,
      });

      if (!response.success) {
        toast({
          title: "Error",
          description:
            "There was an issue sending your details. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (redirectOnSubmit) {
        toast({
          title: "Quote Request Started",
          description: "Redirecting you to complete your booking...",
        });

        const params = new URLSearchParams();
        params.set("name", values.name);
        params.set("email", values.email);
        params.set("phone", values.phone);
        params.set("services", values.services.join(",")); // Comma separated for URL

        router.push(`/booking?${params.toString()}`);
      } else {
        toast({
          title: "Message Sent",
          description:
            "We've received your request and will contact you shortly.",
        });
        form.reset();
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-white/60 p-6 md:p-8 rounded-3xl shadow-2xl relative">
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/80 focus:border-primary"
                    {...field}
                  />
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
                    <Input
                      placeholder="Email Address"
                      className="bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/80 focus:border-primary"
                      {...field}
                    />
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
                    <Input
                      placeholder="Phone Number"
                      className="bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white/80 focus:border-primary"
                      {...field}
                    />
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
                          "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 h-24",
                          isSelected
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-slate-200 hover:border-primary/50 bg-white/50 text-slate-700 hover:bg-white/80",
                        )}>
                        <service.icon
                          className={cn(
                            "h-6 w-6",
                            isSelected ? "text-primary" : "text-slate-500",
                          )}
                        />
                        <span className="text-xs font-semibold leading-tight">
                          {service.label}
                        </span>
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
                  <FormLabel className="text-xs text-slate-600 font-normal">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-primary transition-colors cursor-pointer">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-primary transition-colors cursor-pointer">
                      Privacy Policy
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-lg font-bold py-6 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all">
            Get Free Quote
          </Button>
        </form>
      </Form>
    </div>
  );
}
