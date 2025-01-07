import { ModeOfAttendance } from '../../types';
import { fetchJson } from '../fetch';

type ModeOfAttendanceResponse = {
  id: number;
  price: number;
  modeOfAttendance: {
    name: string;
    isNationalCodeRequired: boolean;
  };
}[];

export async function fetchModesOfAttendance() {
  const url = `${process.env.API_ORIGIN}/api/mode/${process.env.WSS_ORDER}/`;

  const response = await fetchJson<ModeOfAttendanceResponse>(url);

  const modesOfAttendance: ModeOfAttendance[] = response.map(
    (modeOfAttendanceResponse) => {
      return {
        id: modeOfAttendanceResponse.id,
        price: modeOfAttendanceResponse.price / 10,
        ...modeOfAttendanceResponse.modeOfAttendance,
      };
    },
  );

  return modesOfAttendance;
}
