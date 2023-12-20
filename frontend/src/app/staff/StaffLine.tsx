import React from 'react';
import { Staff } from './Staff';
import StaffCard from './StaffCard';
import Sample from './assets/Sample.svg';

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
  ];

  return (
    <div className={'flex flex-wrap justify-center items-center pt-10'}>
      {
        staff.map((person, index) => (
          <StaffCard key={index} person={person} />
        ))
      }
    </div>
  );
}