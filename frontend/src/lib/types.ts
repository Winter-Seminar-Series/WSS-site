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
  type: ParticipationPlanKind;
  paid: boolean;
}

export type ModeOfAttendance = {
  kind: ParticipationPlanKind.MODE_OF_ATTENDANCE;
  paid: boolean;
  name: string;
} & ParticipationPlan;

export type Workshop = {
  kind: ParticipationPlanKind.WORKSHOP;
  paid: boolean;
  name: string;
  image: string;
  speakers: Speaker[];
} & ParticipationPlan;

export enum ParticipationPlanKind {
  WORKSHOP = 'W',
  MODE_OF_ATTENDANCE = 'M',
}

export type Participation = {
  plans: number[];
};
