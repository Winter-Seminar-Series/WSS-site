'use server';

import {
  Participation,
  ParticipationPlan,
  StreamEventLicense,
} from '../../types';
import { fetchModesOfAttendance } from '../events/modeOfAttendance';
import { fetchWorkshops } from '../events/workshop';
import { fetchParticipation } from './register';

function getStreamLicensesFromResponse(
  participation: Participation,
  ...participationPlansArray: ParticipationPlan[][]
) {
  const plansDictionary = participation.plans.reduce((dictionary, plan) => {
    dictionary[plan.plan] = plan.licenseKey;
    return dictionary;
  });

  const streamLicenses: StreamEventLicense[] = participationPlansArray
    .flat()
    .map((plan) => {
      return { title: plan.name, licenseKey: plansDictionary[plan.id] };
    });

  return streamLicenses;
}

type ParticipationResponse = {
  plan: number;
  licenseKey: string;
}[];

export async function fetchStreamLicenses() {
  const [participation, workshops, modesOfAttendance] = await Promise.all([
    fetchParticipation(),
    fetchWorkshops(),
    fetchModesOfAttendance(),
  ]);

  return getStreamLicensesFromResponse(
    participation,
    workshops,
    modesOfAttendance,
  );
}
