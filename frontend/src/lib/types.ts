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
  name: string;
  price: number;
  paid?: boolean;
};

export type ModeOfAttendance = {
  id: number;
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
  poster: string;
  thumbnail: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  sessions: WorkshopSession[];
} & ParticipationPlan;

export type PaidParticipationPlan = {
  plan: number;
  licenseKey: string;
};

export type Participation = {
  plans: PaidParticipationPlan[];
};

export type Seminar = {
  id: number;
  name: string;
  description: string;
  startingTime: Date;
  endingTime: Date;
  date: Date;
  poster: string;
  thumbnail: string;
  speaker: Speaker;
};

export type RoundTable = {
  id: number;
  name: string;
  description: string;
  startingTime: Date;
  endingTime: Date;
  date: Date;
  poster: string;
  thumbnail: string;
  speakers: Speaker[];
};

export type Price = {
  totalPrice: number;
  calculatedPrice: number;
};

export type StreamEvent = {
  id: number;
  room: {
    roomId: number;
    name: string;
    title: string;
  };
  plan: number;
  title: string;
  description: string;
  startingTime: Date;
};

export type StreamEventLicense = {
  title: string;
  licenseKey: string;
};
