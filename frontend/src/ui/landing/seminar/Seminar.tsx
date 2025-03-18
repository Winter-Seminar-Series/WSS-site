import React from 'react';
import SeminarHeader from './SeminarHeader';
import Background from './assets/background.svg';
import SeminarLine from './SeminarLine';
import ViewAllButton from './ViewAllButton';
import { fetchSeminarSpeakers } from '../../../lib/api/events/seminar';
import { fetchAllSpeakers } from '../../../lib/api/events/speaker';
import { shuffle } from '../../../lib/collections';

export default async function Seminar() {
  const allSpeakers = await fetchAllSpeakers();

  return (
    <div
      style={{ backgroundImage: `url(${Background.src})` }}
      className={
        'flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-0'
      }
    >
      <SeminarHeader />
      <SeminarLine speakers={shuffle(allSpeakers)} />
      {/*<ViewAllButton text={'View All Seminars'} width={20} />*/}
    </div>
  );
}
