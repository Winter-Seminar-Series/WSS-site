'use server';

import { unstable_noStore as noStore } from 'next/cache';
import {
  ModeOfAttendance,
  Participation,
  ParticipationPlan,
} from '../../types';
import { FetchError, fetchJsonWithAuth } from '../fetch';
import { fetchWorkshops } from '../events/workshop';

export async function setPaidParticipationPlans(
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

type ParticipationResponse = {
  plan: number;
}[];

export async function fetchParticipation() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/participation/1/`;

  const response = await fetchJsonWithAuth<ParticipationResponse>(url);

  const participation: Participation = {
    plans: response.map((participationResponse) => participationResponse.plan),
  };

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
