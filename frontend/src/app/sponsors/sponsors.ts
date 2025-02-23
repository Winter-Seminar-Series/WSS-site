export type Sponsor = {
  image: string;
  name: string;
  description: string;
  links: { text: string; link: string }[];
};

export const sponsors: Record<string, Sponsor> = {
  ramzinex: {
    image: 'https://ramzinex.com/images/logo/ramzinex-logo.svg',
    name: 'Ramzinex',
    description: 'random kossher matn for sponsor',
    links: [
      { text: 'Career', link: 'https://google.com' },
      { text: 'Career', link: 'https://google.com' },
      { text: 'Career', link: 'https://google.com' },
    ],
  },
};
