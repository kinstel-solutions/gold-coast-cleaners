import { ServiceId, PricingRange } from "@/types/quote";

export const FEATURE_FLAGS = {
  instantPricing: true,
  addOnsEnabled: true,
  progressBar: true,
  trustBadges: true,
};

export const PRICING_CONFIG = {
  BOND_CLEANING: {
    base1BR: { min: 250, max: 350 },
    perExtraBedroom: { min: 100, max: 150 },
    perBathroom: { min: 60, max: 90 },
    carpetPerRoom: { min: 30, max: 50 },
    pestAddOn: { min: 120, max: 180 },
    veryDirtyMultiplier: { min: 1.15, max: 1.25 },
  },
  SPRING_CLEANING: {
    base1BR: { min: 200, max: 350 },
    perExtraBedroom: { min: 50, max: 100 },
    perBathroom: { min: 40, max: 70 },
  },
  DEEP_CLEANING: {
    multiplierFromSpring: { min: 1.15, max: 1.25 },
  },
  BUILDER_CLEANING: {
    small: { min: 400, max: 700 }, // Assume small = < 2BR
    medium: { min: 700, max: 1200 }, // Assume medium = 3BR-4BR
    large: { min: 1200, max: 2500 }, // Assume large = 5+ BR
  },
  CARPET_STEAM_CLEANING: {
    perRoom: { min: 30, max: 50 },
  },
  PEST_CONTROL: {
    base: { min: 120, max: 220 },
  },
  OVEN_BBQ_CLEANING: {
    oven: { min: 120, max: 180 },
    bbq: { min: 150, max: 250 },
  },
  AIRBNB_CLEANING: {
    base1BR: { min: 120, max: 180 },
    base2BR: { min: 180, max: 250 },
    base3BR: { min: 250, max: 350 },
  },
  UPHOLSTERY_CLEANING: {
    perSofa: { min: 80, max: 150 },
  },
  PRESSURE_WASHING: {
    base: { min: 150, max: 900 },
  },
  POOL_MAINTENANCE: {
    oneTime: { min: 150, max: 400 },
  },
};

export type FieldDefinition = {
  id: string;
  label: string;
  type: "select" | "button-group" | "number" | "boolean" | "text" | "radio";
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  required?: boolean;
};

export type AddOnDefinition = {
  id: string;
  label: string;
  description?: string;
};

export type ServiceConfig = {
  id: ServiceId;
  name: string;
  supportsInstantPricing: boolean;
  fields: FieldDefinition[];
  allowedAddOns: AddOnDefinition[];
};

export const COMMON_FIELDS = {
  bedrooms: {
    id: "bedrooms",
    label: "Rooms (Bedrooms/Living)",
    type: "button-group" as const,
    required: false,
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5+", value: 5 },
    ],
  },
  kitchens: {
    id: "kitchens",
    label: "Kitchen",
    type: "button-group" as const,
    required: false,
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3+", value: 3 },
    ],
  },
  bathrooms: {
    id: "bathrooms",
    label: "Bathrooms",
    type: "button-group" as const,
    required: false,
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4+", value: 4 },
    ],
  },
  extraToilets: {
    id: "extraToilets",
    label: "Extra Toilets",
    type: "button-group" as const,
    required: false,
    options: [
      { label: "0", value: 0 },
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3+", value: 3 },
    ],
  },
  condition: {
    id: "condition",
    label: "Condition",
    type: "radio" as const,
    required: false,
    options: [
      { label: "Standard", value: "standard" },
      { label: "Very Dirty", value: "very_dirty" },
    ],
  },
  carParking: {
    id: "carParking",
    label: "Do you have car parking?",
    type: "radio" as const,
    required: false,
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
};

export const COMMON_ADDONS = {
  pest_control: {
    id: "pest_control",
    label: "Pest Control Service/Flea Treatment",
    description: "Professional pest management.",
  },
  carpet_cleaning: {
    id: "carpet_cleaning",
    label: "Carpet Steam Cleaning",
    description: "Deep steam cleaning per room.",
  },
  oven_cleaning: {
    id: "oven_cleaning",
    label: "Oven Cleaning",
    description: "Professional degreasing.",
  },
};

export const SERVICE_CONFIGS: Record<ServiceId, ServiceConfig> = {
  BOND_CLEANING: {
    id: "BOND_CLEANING",
    name: "Bond Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [
      COMMON_ADDONS.pest_control,
      COMMON_ADDONS.carpet_cleaning,
      COMMON_ADDONS.oven_cleaning,
    ],
    fields: [
      COMMON_FIELDS.bedrooms,
      COMMON_FIELDS.kitchens,
      COMMON_FIELDS.bathrooms,
      COMMON_FIELDS.extraToilets,
      COMMON_FIELDS.carParking,
      COMMON_FIELDS.condition,
      {
        id: "additionalServices",
        label: "Additional Services (Require cleaning?)",
        type: "radio",
        required: false,
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      // E.g. we might selectively render these if additionalServices = yes but for now we'll just include them as optional
      {
        id: "balcony",
        label: "Number of Balconies",
        type: "number",
        required: false,
        placeholder: "0",
      },
      {
        id: "blinds",
        label: "Number of Blinds",
        type: "number",
        required: false,
        placeholder: "0",
      },
      {
        id: "curtains",
        label: "Number of Curtains",
        type: "number",
        required: false,
        placeholder: "0",
      },
    ],
  },
  SPRING_CLEANING: {
    id: "SPRING_CLEANING",
    name: "Spring House Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [COMMON_ADDONS.oven_cleaning],
    fields: [
      COMMON_FIELDS.bedrooms,
      COMMON_FIELDS.kitchens,
      COMMON_FIELDS.bathrooms,
      COMMON_FIELDS.extraToilets,
    ],
  },
  DEEP_CLEANING: {
    id: "DEEP_CLEANING",
    name: "Deep Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [COMMON_ADDONS.oven_cleaning, COMMON_ADDONS.carpet_cleaning],
    fields: [COMMON_FIELDS.bedrooms, COMMON_FIELDS.bathrooms],
  },
  BUILDER_CLEANING: {
    id: "BUILDER_CLEANING",
    name: "Builder Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [
      {
        id: "propertySize",
        label: "Property Size",
        type: "radio",
        required: false,
        options: [
          { label: "Small (1-2 BR)", value: "small" },
          { label: "Medium (3-4 BR)", value: "medium" },
          { label: "Large (5+ BR)", value: "large" },
        ],
      },
    ],
  },
  CARPET_STEAM_CLEANING: {
    id: "CARPET_STEAM_CLEANING",
    name: "Carpet Steam Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [COMMON_ADDONS.pest_control],
    fields: [
      {
        id: "carpetRooms",
        label: "Number of Rooms with Carpet",
        type: "number",
        required: false,
        placeholder: "e.g. 3",
      },
    ],
  },
  PEST_CONTROL: {
    id: "PEST_CONTROL",
    name: "Pest Control Service/Flea Treatment",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [COMMON_FIELDS.bedrooms], // To estimate size
  },
  OVEN_BBQ_CLEANING: {
    id: "OVEN_BBQ_CLEANING",
    name: "Oven & BBQ Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [
      {
        id: "items",
        label: "What needs cleaning?",
        type: "radio",
        required: false,
        options: [
          { label: "Oven Only", value: "oven" },
          { label: "BBQ Only", value: "bbq" },
          { label: "Both", value: "both" },
        ],
      },
    ],
  },
  AIRBNB_CLEANING: {
    id: "AIRBNB_CLEANING",
    name: "AirBnB Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [COMMON_FIELDS.bedrooms, COMMON_FIELDS.bathrooms],
  },
  UPHOLSTERY_CLEANING: {
    id: "UPHOLSTERY_CLEANING",
    name: "Upholstery Cleaning",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [
      {
        id: "sofas",
        label: "Number of Sofas/Couches",
        type: "number",
        required: false,
        placeholder: "e.g. 1",
      },
    ],
  },
  PRESSURE_WASHING: {
    id: "PRESSURE_WASHING",
    name: "Pressure Washing",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [
      {
        id: "areaSize",
        label: "Approximate Area Size",
        type: "radio",
        required: false,
        options: [
          { label: "Small Driveway/Patio", value: "small" },
          { label: "Medium House Exterior", value: "medium" },
          { label: "Large Commercial", value: "large" },
        ],
      },
    ],
  },
  POOL_MAINTENANCE: {
    id: "POOL_MAINTENANCE",
    name: "Pool Maintenance",
    supportsInstantPricing: true,
    allowedAddOns: [],
    fields: [
      {
        id: "poolType",
        label: "Pool Service Type",
        type: "radio",
        required: false,
        options: [
          { label: "One-time clean", value: "one_time" },
          { label: "Regular maintenance inquiry", value: "regular" },
        ],
      },
    ],
  },
  REMOVALIST: {
    id: "REMOVALIST",
    name: "Removalist",
    supportsInstantPricing: false,
    allowedAddOns: [],
    fields: [COMMON_FIELDS.bedrooms, COMMON_FIELDS.bathrooms],
  },
  PAINTING: {
    id: "PAINTING",
    name: "Painting",
    supportsInstantPricing: false,
    allowedAddOns: [],
    fields: [
      {
        id: "projectType",
        label: "Project Type",
        type: "radio",
        required: false,
        options: [
          { label: "Interior", value: "interior" },
          { label: "Exterior", value: "exterior" },
          { label: "Both", value: "both" },
        ],
      },
    ],
  },
};

export const SERVICE_ID_MAP: Record<string, ServiceId> = {
  bond: "BOND_CLEANING",
  carpet: "CARPET_STEAM_CLEANING",
  others: "SPRING_CLEANING", // Default 'others' to Spring Cleaning as a placeholder
};
