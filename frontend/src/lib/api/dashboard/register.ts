'use server';

import { unstable_noStore as noStore } from 'next/cache';
import {
  ModeOfAttendance,
  Participation,
  ParticipationPlan,
  Price,
} from '../../types';
import { FetchError, fetchJsonWithAuth } from '../fetch';
import { fetchWorkshops } from '../events/workshop';
import camelcaseKeys from 'camelcase-keys';

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

function getIsDiscountCodeValidFromResponse(response: {
  nonFieldErrors: string[];
}) {
  return !response.nonFieldErrors?.includes('Invalid discount code') ?? true;
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

    return { price, isDiscountCodeValid: true };
  } catch (error) {
    const errorResponse = camelcaseKeys(error.message);
    const isDiscountCodeValid =
      getIsDiscountCodeValidFromResponse(errorResponse);

    return {
      price: { totalPrice: 0, calculatedPrice: 0 },
      error: error.message,
      isDiscountCodeValid,
    };
  }
}
