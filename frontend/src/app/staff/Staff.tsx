import React from 'react';
import Background from './assets/background.svg';
import StaffHeader from './StaffHeader';
import StaffLine from './StaffLine';

export default function Staff() {
  return (
    <div
      style={{ backgroundImage: `url(${Background.src})` }}
      className={
        'flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-14'
      }
    >
      <StaffHeader />
      <StaffLine />
    </div>
  );
}
