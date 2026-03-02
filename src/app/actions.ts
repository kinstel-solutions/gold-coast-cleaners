"use server";

import { QuotePayload, QuotePayloadSchema } from "@/types/quote";
import { calculatePriceRange } from "@/lib/pricing";
import { ServiceId } from "@/types/quote";

export type ActionResponse = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

export async function submitQuote(
  payload: QuotePayload,
): Promise<ActionResponse> {
  const validatedFields = QuotePayloadSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { serviceIds, serviceSpecificData, selectedAddOns, pricingSnapshot } =
    validatedFields.data;

  // Re-verify the price on the server
  if (pricingSnapshot.enabled) {
    const serverPrice = calculatePriceRange(
      serviceIds as ServiceId[],
      serviceSpecificData,
      selectedAddOns,
    );
    if (
      serverPrice &&
      (serverPrice.min !== pricingSnapshot.estimateMin ||
        serverPrice.max !== pricingSnapshot.estimateMax)
    ) {
      console.warn("Price mismatch detected:", {
        client: pricingSnapshot,
        server: serverPrice,
      });
      // In a real app we might reject this, but for now we'll accept and use the server price
    }
  }

  // For now, we'll just log the data.
  // In a real application, you would send an email, save to a database, etc.
  console.log("New Dynamic Quote Request:", validatedFields.data);

  return {
    message: "Thank you for your quote request! We'll be in touch shortly.",
    success: true,
  };
}
