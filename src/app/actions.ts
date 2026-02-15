'use server';

import { z } from 'zod';

const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  propertyType: z.string().min(1, { message: 'Please select a property type.' }),
  bedrooms: z.string().min(1, { message: 'Please select the number of bedrooms.' }),
  cleaningDate: z.date({ required_error: 'Please select a preferred date.' }),
  message: z.string().optional(),
});

export type QuoteFormState = {
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    propertyType?: string[];
    bedrooms?: string[];
    cleaningDate?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitQuote(
  prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  
  const validatedFields = quoteSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    propertyType: formData.get('propertyType'),
    bedrooms: formData.get('bedrooms'),
    cleaningDate: new Date(formData.get('cleaningDate') as string),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  // For now, we'll just log the data.
  // In a real application, you would send an email, save to a database, etc.
  console.log('New Quote Request:', validatedFields.data);

  return {
    message: "Thank you for your quote request! We'll be in touch shortly.",
    success: true,
  };
}
