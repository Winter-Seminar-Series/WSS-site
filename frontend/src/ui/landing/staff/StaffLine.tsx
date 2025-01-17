import React from 'react';
import StaffCard from './StaffCard';
import Marquee from 'react-fast-marquee';
import { fetchStaffs } from '../../../lib/api/about/staff';
import { shuffle } from '../../../lib/collections';

export default async function StaffLine() {
  const staff = shuffle(await fetchStaffs());

  return (
    <Marquee>
      {staff
        .filter(staff => staff.image)
        .map((staff, index) => (
          <StaffCard key={index} person={staff} />
        ))}
    </Marquee>
  );
}
