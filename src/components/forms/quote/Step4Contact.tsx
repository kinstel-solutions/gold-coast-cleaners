import { useState } from "react";
import { ContactInfo, ServiceId } from "@/types/quote";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICE_CONFIGS, FEATURE_FLAGS } from "@/config/services";

interface Step4Props {
  data: Partial<ContactInfo>;
  onChange: (key: keyof ContactInfo, value: any) => void;
  serviceIds: ServiceId[];
  selectedAddOns: string[];
  priceRange: { min: number; max: number } | null;
  formErrors: Record<string, string>;
}

export function Step4Contact({
  data,
  onChange,
  serviceIds,
  selectedAddOns,
  priceRange,
  formErrors,
}: Step4Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const selectedConfigNames = serviceIds
    .map((id) => SERVICE_CONFIGS[id]?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2 text-primary">
          Final Details
        </h2>
        <p className="text-muted-foreground text-lg">
          Where and when do you need our service?
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Summary Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full bg-muted/30 rounded-xl px-4 border">
          <AccordionItem
            value="summary"
            className="border-none">
            <AccordionTrigger className="text-base font-semibold hover:no-underline py-4">
              Quote Summary
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block">Services</span>
                  <span className="font-medium">
                    {selectedConfigNames || "Not selected"}
                  </span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block">Add-ons</span>
                    <span className="font-medium">
                      {selectedAddOns.length} selected
                    </span>
                  </div>
                )}
              </div>
              {FEATURE_FLAGS.instantPricing && priceRange && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 flex flex-col items-center justify-center">
                  <span className="text-sm font-medium text-primary mb-1">
                    Estimated Price Range
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    $
                    {priceRange.min !== priceRange.max
                      ? `${priceRange.min} - $${priceRange.max}`
                      : priceRange.min}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">
                    Final price confirmed upon inspection
                  </span>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={data.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className={cn(
                "py-6 rounded-xl",
                formErrors.name && "border-destructive",
              )}
            />
            {formErrors.name && (
              <p className="text-sm text-destructive">{formErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="0400 123 456"
              value={data.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              className={cn(
                "py-6 rounded-xl",
                formErrors.phone && "border-destructive",
              )}
            />
            {formErrors.phone && (
              <p className="text-sm text-destructive">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className={cn(
              "py-6 rounded-xl",
              formErrors.email && "border-destructive",
            )}
          />
          {formErrors.email && (
            <p className="text-sm text-destructive">{formErrors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select
              value={data.propertyType || ""}
              onValueChange={(val) => onChange("propertyType", val)}>
              <SelectTrigger
                className={cn(
                  "py-6 rounded-xl",
                  formErrors.propertyType && "border-destructive",
                )}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.propertyType && (
              <p className="text-sm text-destructive">
                {formErrors.propertyType}
              </p>
            )}
          </div>

          <div className="space-y-2 flex flex-col">
            <Label className="mb-2">Preferred Date</Label>
            <Popover
              open={isCalendarOpen}
              onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal py-6 rounded-xl",
                    !data.cleaningDate && "text-muted-foreground",
                    formErrors.cleaningDate && "border-destructive",
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.cleaningDate ? (
                    format(data.cleaningDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start">
                <Calendar
                  mode="single"
                  selected={data.cleaningDate}
                  onSelect={(date) => {
                    onChange("cleaningDate", date);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formErrors.cleaningDate && (
              <p className="text-sm text-destructive">
                {formErrors.cleaningDate}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Tell us about any specific requirements or property access instructions..."
            value={data.message || ""}
            onChange={(e) => onChange("message", e.target.value)}
            className="rounded-xl resize-none min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
