'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { WorkshopMeta } from '@/components/events/EventMeta';
import { formatToman } from '@/lib/digits';
import { blurProps } from '@/lib/images';
import type { Workshop } from '@/types/event.type';
import { Button, buttonClasses } from '@/ui/Button';
import { Panel } from '@/ui/Panel';

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
    <Panel
      id="workshops"
      title="Workshops"
      description="Extra sessions outside the main schedule. They need a registration for the main event."
    >
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {workshops.map((workshop) => {
          const isPaid = paid.has(workshop.id);
          const isSelected = isPaid || selected.includes(workshop.id);
          return (
            <li
              key={workshop.id}
              className={`flex flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-200 ${isSelected ? 'border-brand shadow-[0_0_0_1px] shadow-brand' : 'border-line-soft'}`}
            >
              {workshop.thumbnail && (
                <Image
                  src={workshop.thumbnail}
                  alt=""
                  {...blurProps(workshop.thumbnailBlur)}
                  width={360}
                  height={240}
                  sizes="(min-width: 640px) 360px, 100vw"
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
                <p className="line-clamp-2 font-bold text-ink">{workshop.name}</p>
                <p className="text-lg font-extrabold tracking-tight text-ink tabular-nums">
                  {formatToman(workshop.price)}
                </p>
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/workshops/${workshop.id}`}
                    target="_blank"
                    className={`${buttonClasses('soft', 'sm')} grow`}
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
    </Panel>
  );
}
