import React from 'react';
import StaffHeader from './StaffHeader';
import StaffLine from './StaffLine';

export type Staff = {
  name: string;
  surname: string;
  team: string;
  image: string;
};

export default function Staff() {
  return (
    <div
      className={
        'flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-14'
      }
    >
      <StaffHeader />
      <StaffLine />
    </div>
  );
}
