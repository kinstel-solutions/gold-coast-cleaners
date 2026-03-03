"use server";

import { QuotePayload, QuotePayloadSchema } from "@/types/quote";
import { calculatePriceRange } from "@/lib/pricing";
import { ServiceId } from "@/types/quote";
import { Resend } from "resend";
import { SERVICE_CONFIGS } from "@/config/services";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(",")
  : ["support@jamesbondcleaning.au", "kinstelsolutions@gmail.com"];
const FROM_EMAIL = process.env.FROM_EMAIL || "support@jamesbondcleaning.au";

export type ActionResponse = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

export async function submitPartialLead(payload: {
  name: string;
  email: string;
  phone: string;
  services: string[];
}): Promise<ActionResponse> {
  try {
    const { name, email, phone, services } = payload;
    const servicesStr = services.join(", ");

    // 1. Admin Notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAILS,
      replyTo: email,
      subject: `New Partial Lead: ${name}`,
      html: `
        <h2>New Inquiry from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Interested Services:</strong> ${servicesStr}</p>
      `,
    });

    // 2. Customer Auto-Responder
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Thank you for reaching out to James Bond Cleaning!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for requesting a quote from James Bond Cleaning!</p>
        <p>We have received your basic details and are reviewing your inquiry. If you haven't already, you can complete your full booking on our website to get a more accurate estimate.</p>
        <p>We will be in touch with you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>James Bond Cleaning Team</strong></p>
      `,
    });

    return {
      success: true,
      message: "Lead submitted successfully.",
    };
  } catch (error) {
    console.error("Resend Error (Partial Lead):", error);
    return {
      success: false,
      message: "Failed to submit lead.",
    };
  }
}

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

  const {
    serviceIds,
    serviceSpecificData,
    selectedAddOns,
    pricingSnapshot,
    bookingDetails,
  } = validatedFields.data;

  // Re-verify the price on the server
  let serverPriceStr = "N/A";
  if (pricingSnapshot.enabled) {
    const serverPrice = calculatePriceRange(
      serviceIds as ServiceId[],
      serviceSpecificData,
      selectedAddOns,
    );
    if (serverPrice) {
      serverPriceStr =
        serverPrice.min !== serverPrice.max
          ? `$${serverPrice.min} - $${serverPrice.max}`
          : `$${serverPrice.min}`;
    }
  }

  try {
    // Format Service Details
    const servicesDesc = serviceIds
      .map((id) => {
        const config = SERVICE_CONFIGS[id as ServiceId];
        const data = serviceSpecificData[id as string] || {};
        let detailsHtml = "";

        if (config && config.fields && config.fields.length > 0) {
          detailsHtml = "<ul>";
          config.fields.forEach((field: any) => {
            if (data[field.id]) {
              detailsHtml += `<li><strong>${field.label}:</strong> ${data[field.id]}</li>`;
            }
          });
          detailsHtml += "</ul>";
        }

        return `
          <h3>${config?.name || id}</h3>
          ${detailsHtml}
        `;
      })
      .join("<hr/>");

    const addOnsDesc =
      selectedAddOns.length > 0
        ? `<ul>${selectedAddOns.map((a) => `<li>${a}</li>`).join("")}</ul>`
        : "None";

    const emailHtml = `
      <h2>New Detailed Booking Request</h2>
      
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${bookingDetails.name}</p>
      <p><strong>Email:</strong> ${bookingDetails.email}</p>
      <p><strong>Phone:</strong> ${bookingDetails.phone}</p>
      <p><strong>Property Type:</strong> ${bookingDetails.propertyType || "N/A"}</p>
      <p><strong>Preferred Date:</strong> ${
        bookingDetails.cleaningDate
          ? new Date(bookingDetails.cleaningDate).toDateString()
          : "N/A"
      }</p>
      <p><strong>Message:</strong> ${bookingDetails.message || "N/A"}</p>
      
      <h3>Estimated Price</h3>
      <p><strong style="font-size: 1.2rem; color: #2563eb;">${serverPriceStr}</strong></p>
      
      <h3>Selected Services</h3>
      ${servicesDesc}
      
      <h3>Selected Add-Ons</h3>
      ${addOnsDesc}
    `;

    // Final Email to Admins
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAILS,
      replyTo: bookingDetails.email,
      subject: `New Booking Request from ${bookingDetails.name} - ${serverPriceStr}`,
      html: emailHtml,
    });

    console.log("New Dynamic Quote Request processed via Resend.");

    return {
      message: "Thank you for your quote request! We'll be in touch shortly.",
      success: true,
    };
  } catch (error) {
    console.error("Resend Error (Submit Quote):", error);
    return {
      message: "Something went wrong sending your request. Please try again.",
      success: false,
    };
  }
}
