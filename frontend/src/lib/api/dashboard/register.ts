'use server';

import { unstable_noStore as noStore } from 'next/cache';
import {
  ModeOfAttendance,
  Participation,
  ParticipationPlan,
  ParticipationPlanKind,
  Workshop,
} from '../../types';
import { fetchJsonWithAuth } from '../fetch';

type ParticipationPlanResponse = {
  id: number;
} & (ModeOfAttendance | Workshop);

export function setPaidParticipationPlans(
  participation: Participation,
  ...participationPlansArray: ParticipationPlan[][]
) {
  const planIds = new Set(participation.plans);

  participationPlansArray.forEach((participationPlans) => {
    participationPlans.forEach((plan) => {
      plan.paid = planIds.has(plan.id);
    });
  });
}

export async function fetchParticipationPlans() {
  const url = `${process.env.API_ORIGIN}/api/plan/1/`;

  const participationPlans =
    await fetchJsonWithAuth<ParticipationPlanResponse[]>(url);

  // @ts-ignore
  const workshops: Workshop[] = participationPlans.filter(
    (plan) => plan.kind === ParticipationPlanKind.WORKSHOP,
  );

  // @ts-ignore
  const modesOfAttendance: ModeOfAttendance[] = participationPlans.filter(
    (plan) => plan.kind === ParticipationPlanKind.MODE_OF_ATTENDANCE,
  );

  return { workshops, modesOfAttendance };
}

export async function fetchParticipation() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/participation/1/`;

  const participation = await fetchJsonWithAuth<Participation>(url);

  return participation;
}

type PriceResponse = {
  price: number;
};

export async function fetchPrice(plans: number[], discountCode?: string) {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/price`;

  // @ts-ignore
  const searchParams = new URLSearchParams({ plans });

  if (discountCode) {
    searchParams.append('discount', discountCode);
  }

  const { price } = await fetchJsonWithAuth<PriceResponse>(
    `${url}?${searchParams}`,
  );

  return price;
}
