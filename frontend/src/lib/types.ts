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
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

export enum Grade {
  BACHELOR = 'B',
  MASTER = 'M',
  PHD = 'P',
}

export enum IntroductionMethod {
  TELEGRAM = 'Telegram',
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  YOUTUBE = 'YouTube',
  QUERA = 'Quera',
  EMAIL = 'Email',
  SMS = 'SMS',
  FRIENDS = 'Friends',
  PROFESSORS = 'Professors',
  FORUMS = 'Forums',
  OTHERS = 'Others',
}

export type Profile = {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  phoneNumber?: string;
  city?: string;
  birthDate?: string;
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

export type Speaker = {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
};

export type ParticipationPlan = {
  id: number;
  paid?: boolean;
  price: number;
};

export type ModeOfAttendance = {
  id: number;
  name: string;
  isNationalCodeRequired: boolean;
} & ParticipationPlan;

export type WorkshopSession = {
  id: number;
  name: string;
  speaker: Speaker;
  startingTime: Date;
  endingTime: Date;
  date: Date;
  description: string;
};

export type Workshop = {
  paid?: boolean;
  name: string;
  poster: string;
  thumbnail: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  sessions: WorkshopSession[];
} & ParticipationPlan;

export type Participation = {
  plans: number[];
};

export type Price = {
  totalPrice: number;
  calculatedPrice: number;
}
