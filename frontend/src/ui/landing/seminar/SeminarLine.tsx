import React from 'react';
import SeminarCard from './SeminarCard';
import Marquee from 'react-fast-marquee';
import { Speaker } from '../../../lib/types';

export default function SeminarLine({ speakers }: { speakers: Speaker[] }) {
  return (
    <Marquee>
      {speakers.map((speaker, index) => (
        <SeminarCard key={index} speaker={speaker} />
      ))}
    </Marquee>
  );
}
