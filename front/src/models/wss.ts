export interface Speaker {
  id: number;
  name: string;
  picture: string;
  degree: string;
  place: string;
  bio: string;
  polymorphic_ctype: number;
}

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  url: string;
}
