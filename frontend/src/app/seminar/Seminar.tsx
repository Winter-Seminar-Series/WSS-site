import React from 'react';
import SeminarHeader from './SeminarHeader';
import Background from './assets/background.svg';
import SeminarLine from './SeminarLine';
import ViewAllButton from './ViewAllButton';

export type Person = {
  name: string;
  surname: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  image: string;
  position: string;
  university: string;
};

export default function Seminar() {
  return (
    <div
      style={{ backgroundImage: `url(${Background.src})` }}
      className={
        'flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-14'
      }
    >
      <SeminarHeader />
      <SeminarLine />
      <ViewAllButton text={'View All Seminars'} width={20} />
    </div>
  );
}