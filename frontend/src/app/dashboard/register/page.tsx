'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import {
  fetchParticipation,
  fetchParticipationPlans,
  setPaidParticipationPlans,
} from '../../../lib/api/dashboard/register';
import RegisterForm from './RegisterForm';

export default async function Register() {
  // const [
  //   participation,
  //   { workshops, modesOfAttendance },
  //   {
  //     profile: { nationalCode },
  //   },
  // ] = await Promise.all([
  //   fetchParticipation(),
  //   fetchParticipationPlans(),
  //   fetchEmailAndProfile(),
  // ]);

  // setPaidParticipationPlans(participation, workshops, modesOfAttendance);

  return (
    <RegisterForm
      // workshops={workshops}
      // modesOfAttendance={modesOfAttendance}
      // nationalCode={nationalCode}
    />
  );
}
