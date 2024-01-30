'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import {
  fetchParticipation,
  setPaidParticipationPlans,
} from '../../../lib/api/dashboard/register';
import { fetchModesOfAttendance } from '../../../lib/api/events/modeOfAttendance';
import { fetchWorkshops } from '../../../lib/api/events/workshop';
import RegisterForm from './RegisterForm';

export default async function Register() {
  const [
    participation,
    workshops,
    modesOfAttendance,
    {
      profile: { firstName, lastName, phoneNumber, nationalCode },
    },
  ] = await Promise.all([
    fetchParticipation(),
    fetchWorkshops(),
    fetchModesOfAttendance(),
    fetchEmailAndProfile(),
  ]);

  const isProfileComplete = Boolean(firstName && lastName && phoneNumber);

  setPaidParticipationPlans(participation, workshops, modesOfAttendance);

  return (
    <RegisterForm
      workshops={workshops}
      modesOfAttendance={modesOfAttendance}
      profileNationalCode={nationalCode}
      isProfileComplete={isProfileComplete}
    />
  );
}
