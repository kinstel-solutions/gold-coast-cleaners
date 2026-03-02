import { ServiceId, PricingRange } from "@/types/quote";
import {
  PRICING_CONFIG,
  SERVICE_CONFIGS,
  FEATURE_FLAGS,
  COMMON_ADDONS,
} from "@/config/services";

export function calculatePriceRange(
  serviceIds: ServiceId[],
  data: Record<string, Record<string, any>>,
  selectedAddOns: string[] = [],
): PricingRange | null {
  if (!FEATURE_FLAGS.instantPricing || !serviceIds || serviceIds.length === 0)
    return null;

  let totalMin = 0;
  let totalMax = 0;
  let supportedServicesCount = 0;

  for (const serviceId of serviceIds) {
    const serviceConfig = SERVICE_CONFIGS[serviceId];
    if (!serviceConfig || !serviceConfig.supportsInstantPricing) {
      continue;
    }

    supportedServicesCount++;
    const serviceData = data[serviceId] || {};

    let min = 0;
    let max = 0;

    // 1. Calculate base price based on service
    switch (serviceId) {
      case "BOND_CLEANING": {
        const config = PRICING_CONFIG.BOND_CLEANING;
        const bedrooms = Number(serviceData.bedrooms) || 1;
        const bathrooms = Number(serviceData.bathrooms) || 1;

        min += config.base1BR.min;
        max += config.base1BR.max;

        if (bedrooms > 1) {
          min += (bedrooms - 1) * config.perExtraBedroom.min;
          max += (bedrooms - 1) * config.perExtraBedroom.max;
        }
        if (bathrooms > 1) {
          min += (bathrooms - 1) * config.perBathroom.min;
          max += (bathrooms - 1) * config.perBathroom.max;
        }

        const carpetRooms = Number(serviceData.carpetRooms) || 0;
        min += carpetRooms * config.carpetPerRoom.min;
        max += carpetRooms * config.carpetPerRoom.max;

        if (serviceData.condition === "very_dirty") {
          min *= config.veryDirtyMultiplier.min;
          max *= config.veryDirtyMultiplier.max;
        }
        break;
      }
      case "SPRING_CLEANING": {
        const config = PRICING_CONFIG.SPRING_CLEANING;
        const bedrooms = Number(serviceData.bedrooms) || 1;
        const bathrooms = Number(serviceData.bathrooms) || 1;

        min += config.base1BR.min;
        max += config.base1BR.max;

        if (bedrooms > 1) {
          min += (bedrooms - 1) * config.perExtraBedroom.min;
          max += (bedrooms - 1) * config.perExtraBedroom.max;
        }
        if (bathrooms > 1) {
          min += (bathrooms - 1) * config.perBathroom.min;
          max += (bathrooms - 1) * config.perBathroom.max;
        }
        break;
      }
      case "DEEP_CLEANING": {
        // Base is spring cleaning
        const springConfig = PRICING_CONFIG.SPRING_CLEANING;
        const config = PRICING_CONFIG.DEEP_CLEANING;
        const bedrooms = Number(serviceData.bedrooms) || 1;
        const bathrooms = Number(serviceData.bathrooms) || 1;

        let baseMin = springConfig.base1BR.min;
        let baseMax = springConfig.base1BR.max;

        if (bedrooms > 1) {
          baseMin += (bedrooms - 1) * springConfig.perExtraBedroom.min;
          baseMax += (bedrooms - 1) * springConfig.perExtraBedroom.max;
        }
        if (bathrooms > 1) {
          baseMin += (bathrooms - 1) * springConfig.perBathroom.min;
          baseMax += (bathrooms - 1) * springConfig.perBathroom.max;
        }

        min += baseMin * config.multiplierFromSpring.min;
        max += baseMax * config.multiplierFromSpring.max;
        break;
      }
      case "BUILDER_CLEANING": {
        const config = PRICING_CONFIG.BUILDER_CLEANING;
        const size = serviceData.propertySize || "medium";
        if (size === "small") {
          min += config.small.min;
          max += config.small.max;
        } else if (size === "large") {
          min += config.large.min;
          max += config.large.max;
        } else {
          min += config.medium.min;
          max += config.medium.max;
        }
        break;
      }
      case "CARPET_STEAM_CLEANING": {
        const config = PRICING_CONFIG.CARPET_STEAM_CLEANING;
        const carpetRooms = Number(serviceData.carpetRooms) || 1;
        min += carpetRooms * config.perRoom.min;
        max += carpetRooms * config.perRoom.max;
        break;
      }
      case "PEST_CONTROL": {
        const config = PRICING_CONFIG.PEST_CONTROL;
        // Depending on size. We use bedrooms as proxy.
        const bedrooms = Number(serviceData.bedrooms) || 1;
        min += config.base.min + (bedrooms - 1) * 10;
        max += config.base.max + (bedrooms - 1) * 20;
        break;
      }
      case "OVEN_BBQ_CLEANING": {
        const config = PRICING_CONFIG.OVEN_BBQ_CLEANING;
        const items = serviceData.items || "oven";
        if (items === "oven" || items === "both") {
          min += config.oven.min;
          max += config.oven.max;
        }
        if (items === "bbq" || items === "both") {
          min += config.bbq.min;
          max += config.bbq.max;
        }
        break;
      }
      case "AIRBNB_CLEANING": {
        const config = PRICING_CONFIG.AIRBNB_CLEANING;
        const bedrooms = Number(serviceData.bedrooms) || 1;
        if (bedrooms === 1) {
          min += config.base1BR.min;
          max += config.base1BR.max;
        } else if (bedrooms === 2) {
          min += config.base2BR.min;
          max += config.base2BR.max;
        } else {
          min += config.base3BR.min;
          max += config.base3BR.max;
        }
        break;
      }
      case "UPHOLSTERY_CLEANING": {
        const config = PRICING_CONFIG.UPHOLSTERY_CLEANING;
        const sofas = Number(serviceData.sofas) || 1;
        min += sofas * config.perSofa.min;
        max += sofas * config.perSofa.max;
        break;
      }
      case "PRESSURE_WASHING": {
        const config = PRICING_CONFIG.PRESSURE_WASHING;
        const areaSize = serviceData.areaSize || "medium";
        if (areaSize === "small") {
          min += config.base.min;
          // arbitrary scaling
          max += 300;
        } else if (areaSize === "large") {
          min += 600;
          max += config.base.max;
        } else {
          min += 300;
          max += 600;
        }
        break;
      }
      case "POOL_MAINTENANCE": {
        const config = PRICING_CONFIG.POOL_MAINTENANCE;
        min += config.oneTime.min;
        max += config.oneTime.max;
        break;
      }
    }

    totalMin += min;
    totalMax += max;
  }

  // If no selected services support instant pricing, return null
  if (supportedServicesCount === 0) {
    return null;
  }

  // 2. Add Add-ons (if enabled)
  if (FEATURE_FLAGS.addOnsEnabled) {
    for (const addOnId of selectedAddOns) {
      if (addOnId === COMMON_ADDONS.pest_control.id) {
        totalMin += PRICING_CONFIG.BOND_CLEANING.pestAddOn.min;
        totalMax += PRICING_CONFIG.BOND_CLEANING.pestAddOn.max;
      } else if (addOnId === COMMON_ADDONS.carpet_cleaning.id) {
        // Find if any selected service has carpetRooms data, otherwise default to 1
        let carpetRooms = 1;
        for (const serviceId of serviceIds) {
          if (data[serviceId]?.carpetRooms) {
            carpetRooms = Number(data[serviceId].carpetRooms);
            break;
          }
        }
        totalMin +=
          carpetRooms * PRICING_CONFIG.BOND_CLEANING.carpetPerRoom.min;
        totalMax +=
          carpetRooms * PRICING_CONFIG.BOND_CLEANING.carpetPerRoom.max;
      } else if (addOnId === COMMON_ADDONS.oven_cleaning.id) {
        totalMin += PRICING_CONFIG.OVEN_BBQ_CLEANING.oven.min;
        totalMax += PRICING_CONFIG.OVEN_BBQ_CLEANING.oven.max;
      }
    }
  }

  return {
    min: Math.round(totalMin),
    max: Math.round(totalMax),
  };
}
