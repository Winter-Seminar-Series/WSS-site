'use client';

import Workshop from './Workshop';
import { workshopType } from './RegisterForm';

export default function Workshops({ workshops }: { workshops: workshopType[] }) {
  return (
    <div className={'flex gap-5 flex-nowrap overflow-auto pl-2'}>
      {workshops.sort((a, b) => a.isAttended ? -1 : 1).map((workshop) => (
        <Workshop key={workshop.name} workshop={workshop} />
      ))}
    </div>
  );
}
