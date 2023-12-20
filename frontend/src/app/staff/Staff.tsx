import React from 'react';
import StaffHeader from './StaffHeader';
import StaffLine from './StaffLine';

export type Staff = {
  name: string,
  surname: string,
  team: string,
  image: string,
}

export default function Staff() {
  return (
    <div className={'flex-col justify-center items-center bg-no-repeat bg-cover bg-center pb-14'}>
      <StaffHeader />
      <StaffLine />
    </div>
  );
}
