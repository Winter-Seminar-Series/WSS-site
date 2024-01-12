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

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Grade {
  BACHELOR = 'Bachelor',
  MASTER = 'Master',
  PHD = 'PhD or higher',
}

export enum IntroductionMethod {
  NONE = 'None',
  TELEGRAM = 'Telegram',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  TWITTER = 'Twitter',
  LINKEDIN = 'LinkedIn',
  YOUTUBE = 'YouTube',
  QUERA = 'Quera',
  EMAIL = 'Email',
  SMS = 'SMS',
  FRIENDS = 'Friends',
  OTHERS = 'Others',
}

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
