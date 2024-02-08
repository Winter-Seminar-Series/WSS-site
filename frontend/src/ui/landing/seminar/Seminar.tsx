import React from 'react';
import SeminarHeader from './SeminarHeader';
import Background from './assets/background.svg';
import SeminarLine from './SeminarLine';
import ViewAllButton from './ViewAllButton';
import { fetchSeminarSpeakers } from '../../../lib/api/events/seminar';

export default async function Seminar() {
  const seminarSpeakers = await fetchSeminarSpeakers();

  return (
    <div
      style={{ backgroundImage: `url(${Background.src})` }}
      className={
        'flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-14'
      }
    >
      <SeminarHeader />
      <SeminarLine speakers={seminarSpeakers} />
      <ViewAllButton text={'View All Seminars'} width={20} />
    </div>
  );
}
