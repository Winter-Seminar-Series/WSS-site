'use client';

import WorkshopCard from './WorkshopCard';
import { Workshop } from '../../../lib/types';

export default function Workshops({
  workshops,
  selectPlan,
  removePlan,
}: {
  workshops: Workshop[];
  selectPlan: (planId: number) => Promise<void>;
  removePlan: (planId: number) => Promise<void>;
}) {
  return (
    <>
      <p className="mb-4 text-lg leading-relaxed text-lightslategray">
        Important points:
        <ol className="list-inside list-decimal">
          <li>
            The workshops serve as additional sessions, held outside the main
            event schedule.
          </li>
          <li>
            Participation in these supplementary workshops requires registration
            for the main event.
          </li>
        </ol>
      </p>
      <div className={'grid grid-cols-1 gap-5 pl-2 md:grid-cols-3'}>
        {workshops
          .sort((a, b) => (a.paid ? -1 : 1))
          .map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              selectPlan={selectPlan}
              removePlan={removePlan}
            />
          ))}
      </div>
    </>
  );
}
