export type Staff = {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  team?: string;
};

export type StaffTeam = {
  id: number;
  name: string;
  members: { id: number; staff: Staff }[];
};

export type Gender = 'Male' | 'Female' | 'Other';

export type Grade = 'Bachelor' | 'Master' | 'PhD or higher';

export type IntroductionMethod =
  | 'None'
  | 'Telegram'
  | 'Instagram'
  | 'Facebook'
  | 'Twitter'
  | 'LinkedIn'
  | 'YouTube'
  | 'Quera'
  | 'Email'
  | 'SMS'
  | 'Friends'
  | 'Others';

export type Profile = {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  phoneNumber?: string;
  city?: string;
  birthDate?: Date;
  gender?: Gender;
  university?: string;
  major?: string;
  job?: string;
  isOpenToWork?: boolean;
  fieldsOfInterest?: string;
  grade?: Grade;
  introductionMethod?: IntroductionMethod;
  linkedin?: string;
  github?: string;
};
