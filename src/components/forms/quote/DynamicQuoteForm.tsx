"use client";

import { useState, useTransition, useEffect } from "react";
import { ServiceId, ContactInfo, QuotePayload } from "@/types/quote";
import { FEATURE_FLAGS, SERVICE_CONFIGS } from "@/config/services";
import { calculatePriceRange } from "@/lib/pricing";
import { submitQuote } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Step1ServiceSelection } from "./Step1ServiceSelection";
import { Step2ServiceDetails } from "./Step2ServiceDetails";
import { Step3AddOns } from "./Step3AddOns";
import { Step4Contact } from "./Step4Contact";
import { ContactInfoSchema } from "@/types/quote";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useSearchParams } from "next/navigation";

export function DynamicQuoteForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serviceIds, setServiceIds] = useState<ServiceId[]>([]);
  // Store data per service: { BOND_CLEANING: { bedrooms: 2 }, SPRING_CLEANING: { kitchens: 1 } }
  const [serviceData, setServiceData] = useState<
    Record<string, Record<string, any>>
  >({});
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState<Partial<ContactInfo>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const services = searchParams.get("services");

    if (name || email || phone) {
      setContactInfo((prev) => ({
        ...prev,
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      }));
    }

    if (services) {
      const { SERVICE_ID_MAP } = require("@/config/services");
      const urlIds = services.split(",");
      const internalIds = urlIds
        .map((id) => SERVICE_ID_MAP[id])
        .filter(Boolean) as ServiceId[];

      if (internalIds.length > 0) {
        setServiceIds(internalIds);
      }
    }
  }, [searchParams]);

  const priceRange =
    serviceIds.length > 0
      ? calculatePriceRange(serviceIds, serviceData, selectedAddOns)
      : null;

  // Determine total steps based on config
  const validConfigs = serviceIds
    .map((id) => SERVICE_CONFIGS[id])
    .filter(Boolean);

  const hasServiceFields = validConfigs.some(
    (config) => config.fields.length > 0,
  );

  const hasAddOns =
    validConfigs.some((config) => config.allowedAddOns.length > 0) &&
    FEATURE_FLAGS.addOnsEnabled;

  const activeSteps = ["service"];
  if (hasServiceFields) activeSteps.push("details");
  if (hasAddOns) activeSteps.push("addons");
  activeSteps.push("contact");

  const currentStepKey = activeSteps[step - 1];

  useEffect(() => {
    // When step changes, smooth scroll
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {}
  }, [step]);

  const handleNext = () => {
    if (currentStepKey === "service" && serviceIds.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one service to continue.",
        variant: "destructive",
      });
      return;
    }

    // validate service details across all selected services
    if (currentStepKey === "details" && validConfigs.length > 0) {
      let valid = true;
      for (const config of validConfigs) {
        // If the service hasn't had any data recorded yet, defaults to empty object
        const dataForService = serviceData[config.id] || {};

        for (const field of config.fields) {
          // Skip validation for fields that are optionally hidden
          if (
            ["balcony", "blinds", "curtains"].includes(field.id) &&
            dataForService.additionalServices !== "yes"
          ) {
            continue;
          }

          if (
            field.required &&
            (dataForService[field.id] === undefined ||
              dataForService[field.id] === "")
          ) {
            valid = false;
          }
        }
      }
      if (!valid) {
        toast({
          title: "Missing Information",
          description: "Please fill out all required fields to proceed.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step < activeSteps.length) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    setServiceIds([]);
    setServiceData({});
    setSelectedAddOns([]);
  };

  const handleSubmit = () => {
    const parsed = ContactInfoSchema.safeParse(contactInfo);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      toast({
        title: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    setFormErrors({});

    const snapshot = {
      enabled: !!priceRange && FEATURE_FLAGS.instantPricing,
      estimateMin: priceRange?.min,
      estimateMax: priceRange?.max,
    };

    const payload: QuotePayload = {
      serviceIds,
      serviceSpecificData: serviceData,
      selectedAddOns,
      bookingDetails: parsed.data,
      pricingSnapshot: snapshot,
    };

    startTransition(async () => {
      const res = await submitQuote(payload);
      if (res.success) {
        toast({
          title: "🎉 Request Sent Successfully!",
          description: "Our team will be in touch shortly.",
        });
        setIsSubmitted(true);
        onSuccess?.();
      } else {
        toast({
          title: "Submission Error",
          description: res.message,
          variant: "destructive",
        });
        if (res.errors) {
          const flatErrors: Record<string, string> = {};
          Object.entries(res.errors).forEach(([k, v]) => {
            if (Array.isArray(v)) {
              flatErrors[k] = v[0];
            }
          });
          setFormErrors({ ...formErrors, ...flatErrors });
        }
      }
    });
  };

  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col min-h-[500px] items-center justify-center py-12 px-4 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Request Received!
        </h2>
        <p className="text-lg text-slate-600 max-w-lg mb-8 leading-relaxed">
          Thank you,{" "}
          <span className="font-semibold text-slate-900">
            {contactInfo.name}
          </span>
          . We've received your detailed booking request. Our team is reviewing
          your requirements and will contact you via email or phone shortly to
          confirm your booking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <Button
            size="lg"
            onClick={handleReset}
            className="w-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[500px] relative pb-20 sm:pb-0">
      {FEATURE_FLAGS.progressBar && (
        <div className="mb-8">
          <Progress
            value={(step / activeSteps.length) * 100}
            className="h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium px-1">
            <span>
              Step {step} of {activeSteps.length}
            </span>
            {FEATURE_FLAGS.instantPricing && priceRange && (
              <span className="text-primary font-bold">
                Est: $
                {priceRange.min !== priceRange.max
                  ? `${priceRange.min} - $${priceRange.max}`
                  : priceRange.min}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 min-h-[400px]">
        {currentStepKey === "service" && (
          <Step1ServiceSelection
            values={serviceIds}
            onChange={(vals) => {
              setServiceIds(vals);
              // We intentionally don't clear serviceData here, so if a user accidentally unselects
              // a service and reselects it, they don't lose their data answers.
              // However we could reset addons if needed:
              setSelectedAddOns([]);
              // We remove the auto-forward because it's a multi-select now.
            }}
          />
        )}

        {currentStepKey === "details" && (
          <Step2ServiceDetails
            serviceIds={serviceIds}
            data={serviceData}
            onChange={(serviceId, fieldId, val) =>
              setServiceData((prev) => ({
                ...prev,
                [serviceId]: {
                  ...(prev[serviceId] || {}),
                  [fieldId]: val,
                },
              }))
            }
          />
        )}

        {currentStepKey === "addons" && (
          <Step3AddOns
            serviceIds={serviceIds}
            selectedAddOns={selectedAddOns}
            onChange={setSelectedAddOns}
          />
        )}

        {currentStepKey === "contact" && (
          <Step4Contact
            data={contactInfo}
            onChange={(k, val) => {
              setContactInfo((prev) => ({ ...prev, [k]: val }));
              if (formErrors[k])
                setFormErrors((prev) => ({ ...prev, [k]: "" }));
            }}
            serviceIds={serviceIds}
            selectedAddOns={selectedAddOns}
            priceRange={priceRange}
            formErrors={formErrors}
          />
        )}
      </div>

      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-card z-20 p-4 sm:p-0 sm:relative shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] sm:shadow-none -mx-6 px-6 sm:mx-0">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1 || isPending}
          className="w-full sm:w-auto order-2 sm:order-1"
          size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {step < activeSteps.length ? (
          <Button
            onClick={handleNext}
            className="w-full sm:w-auto order-1 sm:order-2"
            size="lg">
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            size="lg">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit Request
          </Button>
        )}
      </div>

      {currentStepKey === "contact" && FEATURE_FLAGS.trustBadges && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-3 animate-in fade-in">
          <p className="flex items-center text-sm text-muted-foreground font-medium">
            <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
            Fully insured • Bond Back Guarantee • Gold Coast locals
          </p>
          <a
            href="tel:0756201066"
            className="flex items-center text-sm font-medium text-primary hover:underline">
            <PhoneCall className="mr-2 h-4 w-4" />
            Prefer to talk? Call 07 5620 1066
          </a>
        </div>
      )}
    </div>
  );
}
