'use client';

import { Minus, Plus } from 'lucide-react';

import { formatToman } from '@/lib/digits';
import type { PlanAddon } from '@/types/event.type';

export interface OfferedAddon extends PlanAddon {
  planName: string;
}

interface Props {
  addons: OfferedAddon[];
  /** Units the participant already holds, by add-on id. */
  held: Record<number, number>;
  quantities: Record<number, number>;
  onChange: (quantities: Record<number, number>) => void;
}

/** How many more units the participant may buy: their own limit, then what is left to sell. */
export function addonUnitsLeft(addon: PlanAddon, held: number): number {
  const own = addon.maxPerParticipant - held;
  return Math.max(0, addon.remaining === null ? own : Math.min(own, addon.remaining));
}

/** Why no more units can be picked, or null when some can. */
function unavailableReason(addon: PlanAddon, left: number): string | null {
  if (!addon.isOpen) return 'Not available right now';
  if (addon.remaining === 0) return 'Sold out';
  if (left === 0) return 'Limit reached';
  return null;
}

export function AddonPicker({ addons, held, quantities, onChange }: Props) {
  const showPlan = new Set(addons.map((addon) => addon.planId)).size > 1;
  const setQuantity = (id: number, quantity: number) => onChange({ ...quantities, [id]: quantity });

  return (
    <section aria-labelledby="addons" className="flex flex-col gap-4">
      <h3 id="addons" className="text-2xl font-bold text-ink">
        Extras
      </h3>
      <p className="text-muted">Optional extras for your registration. You can also come back and add them later.</p>
      <ul className="flex flex-col divide-y divide-line-soft rounded-lg border border-line-soft">
        {addons.map((addon) => {
          const owned = held[addon.id] ?? 0;
          const left = addon.isOpen ? addonUnitsLeft(addon, owned) : 0;
          const quantity = Math.min(quantities[addon.id] ?? 0, left);
          const status = unavailableReason(addon, left);
          const nameId = `addon-${addon.id}`;

          return (
            <li key={addon.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <p id={nameId} className="text-lg font-semibold text-ink">
                  {addon.name}
                  {showPlan && <span className="text-sm font-medium text-muted"> · {addon.planName}</span>}
                </p>
                {addon.description && <p className="text-sm text-muted">{addon.description}</p>}
                <p className="text-sm text-muted">
                  {formatToman(addon.price)} each
                  {addon.maxPerParticipant > 1 && ` · up to ${addon.maxPerParticipant}`}
                  {!addon.discountable && ' · discount codes do not apply'}
                </p>
                {owned > 0 && <p className="text-sm font-medium text-success">You have {owned}</p>}
              </div>

              {status ? (
                <p className="text-sm font-medium text-muted">{status}</p>
              ) : (
                <div className="flex items-center gap-2" role="group" aria-labelledby={nameId}>
                  <button
                    type="button"
                    onClick={() => setQuantity(addon.id, quantity - 1)}
                    disabled={quantity === 0}
                    aria-label={`One fewer ${addon.name}`}
                    className="flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Minus className="size-4" aria-hidden />
                  </button>
                  <output className="w-8 text-center text-lg font-semibold text-ink" aria-live="polite">
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQuantity(addon.id, quantity + 1)}
                    disabled={quantity >= left}
                    aria-label={`One more ${addon.name}`}
                    className="flex size-11 items-center justify-center rounded-md bg-brand-soft text-brand disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Plus className="size-4" aria-hidden />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
