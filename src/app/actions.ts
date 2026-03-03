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
const SENDER_NAME = "James Bond Cleaning";
const FROM_STRING = `${SENDER_NAME} <${FROM_EMAIL}>`;

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
      from: FROM_STRING,
      to: ADMIN_EMAILS,
      replyTo: email,
      subject: `New Quick Inquiry from ${name}`,
      html: `
        <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          New inquiry from ${name} for ${servicesStr}. Contact: ${phone}
        </div>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0c4a6e; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Inquiry from Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Interested Services:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${servicesStr}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // 2. Customer Auto-Responder
    await resend.emails.send({
      from: FROM_STRING,
      to: [email],
      subject: "Thank you for reaching out to James Bond Cleaning!",
      html: `
        <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          We have received your inquiry. Our team is reviewing it and will contact you shortly.
        </div>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h3 style="color: #0c4a6e;">Hi ${name},</h3>
          <p>Thank you for requesting a quote from James Bond Cleaning!</p>
          <p>We have received your basic details and are reviewing your inquiry. If you haven't already, you can complete your full customized booking on our website to get an accurate estimate instantly.</p>
          <p>Our team will be in touch with you shortly to assist.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong style="color: #0c4a6e;">James Bond Cleaning Team</strong></p>
        </div>
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
      <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
        New detailed booking request from ${bookingDetails.name} for ${bookingDetails.propertyType || "cleaning"}. Estimated: ${serverPriceStr}.
      </div>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Detailed Booking Request</h2>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #0f172a;">Customer Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${bookingDetails.name}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${bookingDetails.email}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td>${bookingDetails.phone}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Property Type:</strong></td><td>${bookingDetails.propertyType || "N/A"}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Preferred Date:</strong></td><td>${
              bookingDetails.cleaningDate
                ? new Date(bookingDetails.cleaningDate).toDateString()
                : "N/A"
            }</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Message:</strong></td><td>${bookingDetails.message || "N/A"}</td></tr>
          </table>
        </div>
        
        <h3 style="color: #0f172a;">Estimated Price</h3>
        <p><strong style="font-size: 1.4rem; color: #2563eb; background-color: #eff6ff; padding: 5px 10px; border-radius: 4px;">${serverPriceStr}</strong></p>
        
        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Selected Services</h3>
        <div style="margin-bottom: 20px;">
          ${servicesDesc}
        </div>
        
        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Selected Add-Ons</h3>
        <div style="margin-bottom: 20px;">
          ${addOnsDesc}
        </div>
      </div>
    `;

    // Final Email to Admins
    await resend.emails.send({
      from: FROM_STRING,
      to: ADMIN_EMAILS,
      replyTo: bookingDetails.email,
      subject: `New Booking Request: ${bookingDetails.name} - ${bookingDetails.propertyType || "Gold Coast"}`,
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
