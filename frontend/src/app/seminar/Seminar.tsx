import React from 'react';
import SeminarHeader from './SminarHeader';
import Background from './assets/background.svg';
import SeminarLine from './SeminarLine';
import ViewAllButton from './ViewAllButton';

export type Person = {
  name: string,
  surname: string,
  linkedin: string,
  instagram: string,
  facebook: string,
  image: string,
  position: string,
  university: string,
}

export default function Seminar() {
  return (
    <div style={{ backgroundImage: `url(${Background.src})` }} className={'flex-col justify-center items-center bg-no-repeat bg-cover bg-center pb-14'}>
      <SeminarHeader />
      <SeminarLine/>
      <ViewAllButton text={'View All Seminars'} width={20}/>
    </div>
  );
}
