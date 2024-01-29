import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchJsonWithAuth } from '../../../lib/api/fetch';
import { redirect } from 'next/navigation';

type VerifyPaymentResponse = {
  id: number;
  orderId: string;
  paid: boolean;
};

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  noStore();

  const url = `${process.env.API_ORIGIN}/payment/verify/${params.id}/`;

  await fetchJsonWithAuth<VerifyPaymentResponse>(url);

  revalidatePath('/dashboard/register');
  redirect('/dashboard/register');
}

export const dynamic = 'force-dynamic';
