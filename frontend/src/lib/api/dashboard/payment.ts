'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { cleanInput } from '../../error';
import { fetchJsonWithAuth } from '../fetch';
import { redirect } from 'next/navigation';

type CreatePaymentResponse = {
  redirectUrl: string;
};

async function callCreatePaymentAPI(plans: number[], discountCode?: string) {
  const url = `${process.env.API_ORIGIN}/api/payment/create`;

  const body = { plans, discountCode };

  return await fetchJsonWithAuth<CreatePaymentResponse>(url, body, {
    method: 'POST',
  });
}

const FormSchema = z.object({
  plans: z.number({ required_error: 'Choose at least one plan.' }).array(),
  discountCode: z.string().optional(),
});

type FormInput = z.infer<typeof FormSchema>;

export async function createPayment(input: FormInput) {
  noStore();

  const { cleanedInput, errorMessage } = cleanInput(FormSchema, input);
  if (errorMessage) {
    return { error: errorMessage };
  }

  const { plans, discountCode } = cleanedInput;

  let redirectUrl: string;
  try {
    ({ redirectUrl } = await callCreatePaymentAPI(plans, discountCode));
  } catch (error) {
    return { error: error.message };
  }

  redirect(redirectUrl);
}
