import { NextRequest } from 'next/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchJsonWithAuth } from '../../../lib/api/fetch';
import { redirect } from 'next/navigation';

type VerifyPaymentResponse = {
  id: number;
  orderId: string;
  paid: boolean;
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  noStore();

  const { id } = await context.params;

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    throw new Error('Invalid payment id');
  }

  const url = `${process.env.API_ORIGIN}/api/payment/verify/${numericId}/`;

  await fetchJsonWithAuth<VerifyPaymentResponse>(url);

  revalidatePath('/dashboard/register');
  redirect('/dashboard/register');
}

export const dynamic = 'force-dynamic';
