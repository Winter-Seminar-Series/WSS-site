import React from 'react';
import { Staff } from './Staff';
import StaffCard from './StaffCard';
import Sample from './assets/Sample.svg';
import Marquee from 'react-fast-marquee';

export default function StaffLine() {
  const staff: Staff[] = [
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
    {
      name: 'John Doe',
      surname: 'Doe',
      team: 'Team',
      image: Sample.src,
    },
  ];

  return (
    <Marquee /*className={'flex flex-wrap items-center justify-center pt-10'}*/>
      {staff.map((person, index) => (
        <StaffCard key={index} person={person} />
      ))}
    </Marquee>
  );
}
