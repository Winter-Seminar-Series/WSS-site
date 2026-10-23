'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { WorkshopMeta } from '@/components/events/EventMeta';
import { formatToman } from '@/lib/digits';
import { blurProps } from '@/lib/images';
import type { Workshop } from '@/types/event.type';
import { Button } from '@/ui/Button';

interface Props {
  workshops: Workshop[];
  paid: Set<number>;
  selected: number[];
  onChange: (selected: number[]) => void;
}

export function WorkshopPicker({ workshops, paid, selected, onChange }: Props) {
  const toggle = (id: number) =>
    onChange(selected.includes(id) ? selected.filter((selectedId) => selectedId !== id) : [...selected, id]);

  return (
    <section aria-labelledby="workshops" className="flex flex-col gap-4">
      <h3 id="workshops" className="text-2xl font-bold text-ink">
        Workshops
      </h3>
      <p className="text-muted">
        Workshops are extra sessions held outside the main schedule, and require registration for the main event.
      </p>
      <ul className="grid gap-5 md:grid-cols-3">
        {workshops.map((workshop) => {
          const isPaid = paid.has(workshop.id);
          const isSelected = isPaid || selected.includes(workshop.id);
          return (
            <li
              key={workshop.id}
              className={`flex flex-col overflow-hidden rounded-lg border ${isSelected ? 'border-brand' : 'border-line-soft'}`}
            >
              {workshop.thumbnail && (
                <Image
                  src={workshop.thumbnail}
                  alt=""
                  {...blurProps(workshop.thumbnailBlur)}
                  width={298}
                  height={199}
                  sizes="(min-width: 768px) 298px, 100vw"
                  className="aspect-3/2 w-full object-cover"
                />
              )}
              <div className="flex grow flex-col gap-3 p-4">
                <WorkshopMeta
                  startDate={workshop.startDate}
                  endDate={workshop.endDate}
                  modules={workshop.sessions.length}
                  className="text-xs"
                />
                <p className="line-clamp-2 font-semibold text-ink">{workshop.name}</p>
                <p className="text-xl font-semibold text-ink">{formatToman(workshop.price)}</p>
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/workshops/${workshop.id}`}
                    target="_blank"
                    className="flex min-h-11 grow items-center justify-center rounded-md bg-brand-soft text-sm font-bold text-brand"
                  >
                    Details
                  </Link>
                  <Button
                    size="sm"
                    className="min-h-11 grow"
                    variant={isPaid ? 'soft' : 'primary'}
                    disabled={isPaid}
                    aria-pressed={isSelected}
                    onClick={() => toggle(workshop.id)}
                  >
                    {isPaid ? (
                      <>
                        <Check className="size-4" aria-hidden /> Registered
                      </>
                    ) : isSelected ? (
                      'Remove'
                    ) : (
                      'Add'
                    )}
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
