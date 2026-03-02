import { z } from "zod";

export type ServiceId =
  | "BOND_CLEANING"
  | "SPRING_CLEANING"
  | "DEEP_CLEANING"
  | "BUILDER_CLEANING"
  | "CARPET_STEAM_CLEANING"
  | "PEST_CONTROL"
  | "OVEN_BBQ_CLEANING"
  | "AIRBNB_CLEANING"
  | "UPHOLSTERY_CLEANING"
  | "PRESSURE_WASHING"
  | "POOL_MAINTENANCE"
  | "REMOVALIST"
  | "PAINTING";

// Schema for the pricing snapshot in the form payload
export const PricingSnapshotSchema = z.object({
  enabled: z.boolean(),
  estimateMin: z.number().optional(),
  estimateMax: z.number().optional(),
});
export type PricingSnapshot = z.infer<typeof PricingSnapshotSchema>;

// Contact Info schema
export const ContactInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  propertyType: z.string().optional(),
  cleaningDate: z.date().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
});
export type ContactInfo = z.infer<typeof ContactInfoSchema>;

// The final submission payload schema
export const QuotePayloadSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Please select at least one service."),
  serviceSpecificData: z.record(z.string(), z.record(z.string(), z.any())),
  selectedAddOns: z.array(z.string()),
  bookingDetails: ContactInfoSchema,
  pricingSnapshot: PricingSnapshotSchema,
});
export type QuotePayload = z.infer<typeof QuotePayloadSchema>;

export type PricingRange = {
  min: number;
  max: number;
};
