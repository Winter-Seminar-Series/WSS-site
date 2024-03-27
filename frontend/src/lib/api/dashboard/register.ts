'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { Participation, ParticipationPlan, Price } from '../../types';
import { fetchJsonWithAuth } from '../fetch';
import camelcaseKeys from 'camelcase-keys';
import { getAPIErrorMessage } from '../../error';

export async function setPaidParticipationPlans(
  participation: Participation,
  ...participationPlansArray: ParticipationPlan[][]
) {
  const planIds = new Set(participation.plans.map((plan) => plan.plan));

  participationPlansArray.forEach((participationPlans) => {
    participationPlans.forEach((plan) => {
      plan.paid = planIds.has(plan.id);
    });
  });
}

type ParticipationResponse = {
  plan: number;
  licenseKey: string;
}[];

export async function fetchParticipation() {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/participation/1/`;

  const response = await fetchJsonWithAuth<ParticipationResponse>(url);

  const participation: Participation = {
    plans: response,
  };

  return participation;
}

function getIsDiscountCodeValidFromResponse(error: any) {
  return error.message.errors[0].code === 'invalid';
}

export async function fetchPrice(plans: number[], discountCode?: string) {
  noStore();

  const url = `${process.env.API_ORIGIN}/api/payment/price/`;

  if (!discountCode) {
    discountCode = undefined;
  }

  const body = { plans, discountCode, totalPrice: 0, calculatedPrice: 0 };

  try {
    const price = await fetchJsonWithAuth<Price>(url, body, {
      method: 'POST',
    });

    return {
      price: {
        totalPrice: price.totalPrice / 10,
        calculatedPrice: price.calculatedPrice / 10,
      },
      isDiscountCodeValid: true,
    };
  } catch (error) {
    const isDiscountCodeValid = getIsDiscountCodeValidFromResponse(error);

    return {
      price: { totalPrice: 0, calculatedPrice: 0 },
      error: getAPIErrorMessage(error),
      isDiscountCodeValid,
    };
  }
}
