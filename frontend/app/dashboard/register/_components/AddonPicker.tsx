'use client';

import { Minus, Plus } from 'lucide-react';

import { formatToman } from '@/lib/digits';
import type { PlanAddon } from '@/types/event.type';
import { Panel } from '@/ui/Panel';

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
    <Panel id="addons" title="Extras" description="Optional. You can also come back and add them later.">
      <ul className="flex flex-col divide-y divide-line-soft rounded-2xl border border-line-soft">
        {addons.map((addon) => {
          const owned = held[addon.id] ?? 0;
          const left = addon.isOpen ? addonUnitsLeft(addon, owned) : 0;
          const quantity = Math.min(quantities[addon.id] ?? 0, left);
          const status = unavailableReason(addon, left);
          const nameId = `addon-${addon.id}`;

          return (
            <li key={addon.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex flex-col gap-1">
                <p id={nameId} className="font-bold text-ink">
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
                <p className="shrink-0 rounded-full bg-canvas px-3 py-1.5 text-xs font-semibold text-muted">{status}</p>
              ) : (
                <div
                  className="flex shrink-0 items-center gap-1 rounded-full bg-canvas p-1"
                  role="group"
                  aria-labelledby={nameId}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(addon.id, quantity - 1)}
                    disabled={quantity === 0}
                    aria-label={`One fewer ${addon.name}`}
                    className="flex size-11 items-center justify-center rounded-full bg-surface text-brand shadow-sm transition-transform active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Minus className="size-4" aria-hidden />
                  </button>
                  <output className="w-7 text-center text-lg font-bold text-ink tabular-nums" aria-live="polite">
                    {quantity}
                  </output>
                  <button
                    type="button"
                    onClick={() => setQuantity(addon.id, quantity + 1)}
                    disabled={quantity >= left}
                    aria-label={`One more ${addon.name}`}
                    className="flex size-11 items-center justify-center rounded-full bg-surface text-brand shadow-sm transition-transform active:scale-90 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Plus className="size-4" aria-hidden />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
