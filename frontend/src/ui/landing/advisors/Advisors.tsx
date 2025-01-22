import React from 'react';
import Background from './assets/background.svg';
import Link from 'next/link';
import Image from 'next/image';
import AdvisorCard from './AdvisorCard';
import Marquee from 'react-fast-marquee';

export const advisorsData = [
  {
    id: 3,
    name: 'Vahab Mirrokni',
    designation: 'VP @ Google Research',
    description: '',
    image: './advisors/mirrokni.jpg',
    team: 'Scientific Advisors',
  },
  {
    id: 4,
    name: 'Solmaz Salimi',
    designation: 'Postdoctoral Fellow @ Eurecom',
    description: '',
    image: './advisors/salimi.jpg',
    team: 'Scientific Advisors',
  },
  {
    id: 5,
    name: 'Ehsaneddin Asgari',
    designation: 'Research Scientist @ Qatar Computing Research Institute',
    description: '',
    image: './advisors/asgari.png',
    team: 'Scientific Advisors',
  },
  {
    id: 1,
    name: 'Hamid R. Rabiee',
    designation: 'Professor @ Sharif University of Technology',
    description: '',
    image: './advisors/rabiee.jpg',
    team: 'Scientific Advisors',
  },
  {
    id: 2,
    name: 'Mohammad Hossein Rohban',
    designation: 'Assistant Professor @ Sharif University of Technology',
    description: '',
    image: './advisors/rohban.png',
    team: 'Scientific Advisors',
  },
];

export default function Advisors() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background.src})`,
      }}
      className={
        'flex-col items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat pb-14'
      }
    >
      <div
        className={
          'flex items-center justify-between gap-y-6 px-32 pb-10 pt-20 max-md:flex-col'
        }
      >
        <div>
          <div className="text-lg font-medium uppercase tracking-wide text-neutral-400">
            {/*Our Guides*/}
          </div>
          <div
            className={
              'font-manrope mt-2 text-5xl font-bold text-darkslategray-100'
            }
          >
            Scientific Advisors
          </div>
        </div>
        {/*<Link*/}
        {/*  href="/advisors"*/}
        {/*  className={*/}
        {/*    'font-manrope mb-3 flex items-center justify-center rounded-md bg-secondary px-8 py-5 text-lg font-bold text-white hover:bg-secondary-400'*/}
        {/*  }*/}
        {/*>*/}
        {/*  <div>{'View All'}</div>*/}
        {/*  <Image*/}
        {/*    src={'/source/arrow_right_white.svg'}*/}
        {/*    alt={'view all arrow'}*/}
        {/*    width={20}*/}
        {/*    height={20}*/}
        {/*    className={'ml-3'}*/}
        {/*  />*/}
        {/*</Link>*/}
      </div>
      <div className="flex flex-wrap justify-between gap-0 px-10">
        {advisorsData
          .filter((staff) => staff.image)
          .map((staff, index) => (
            <AdvisorCard key={index} person={staff} />
          ))}
      </div>
    </div>
  );
}
