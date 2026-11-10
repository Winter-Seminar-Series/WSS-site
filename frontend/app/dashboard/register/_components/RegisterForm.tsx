'use client';

import { Check, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

import { updateNationalCodeAction } from '@/actions/profile.actions';
import type { AddonLine } from '@/api/payment.api';
import { AddonPicker, addonUnitsLeft } from '@/app/dashboard/register/_components/AddonPicker';
import type { OfferedAddon } from '@/app/dashboard/register/_components/AddonPicker';
import { WorkshopPicker } from '@/app/dashboard/register/_components/WorkshopPicker';
import { REGISTRATION, isInPersonMode, isLunchAddOn } from '@/lib/dashboard';
import { formatToman, toLatinDigits } from '@/lib/digits';
import type { FormState } from '@/lib/form';
import { useCheckout, useQuote } from '@/queries/registration.queries';
import type { AttendanceMode, Workshop } from '@/types/event.type';
import { Alert } from '@/ui/Alert';
import { Button } from '@/ui/Button';
import { Field, TextField, inputClasses } from '@/ui/FormField';
import { Panel } from '@/ui/Panel';
import { StickyActionBar } from '@/ui/StickyActionBar';
import { SubmitButton } from '@/ui/SubmitButton';
import { ValidatedForm } from '@/ui/ValidatedForm';

interface Props {
  modes: AttendanceMode[];
  workshops: Workshop[];
  paidPlanIds: number[];
  /** Units of each add-on the participant already holds, by add-on id. */
  heldAddons: Record<number, number>;
  nationalCode: string;
  isProfileComplete: boolean;
}

const INITIAL_STATE: FormState = {};

export function RegisterForm({ modes, workshops, paidPlanIds, heldAddons, nationalCode, isProfileComplete }: Props) {
  const paid = new Set(paidPlanIds);
  const lunchMode = modes.find((mode) => isLunchAddOn(mode.name));
  const baseModes = modes.filter((mode) => mode !== lunchMode);
  const paidMode = modes.find((mode) => paid.has(mode.id));

  const [modeId, setModeId] = useState<number | null>(
    paidMode && paidMode === lunchMode
      ? (baseModes.find((mode) => isInPersonMode(mode.name))?.id ?? null)
      : (paidMode?.id ?? null),
  );
  const [withLunch, setWithLunch] = useState(paidMode === lunchMode && Boolean(paidMode));
  const [workshopIds, setWorkshopIds] = useState<number[]>([]);
  const [addonQuantities, setAddonQuantities] = useState<Record<number, number>>({});
  const [discountInput, setDiscountInput] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [clientError, setClientError] = useState('');
  const [nationalCodeState, nationalCodeAction] = useActionState(updateNationalCodeAction, INITIAL_STATE);

  const selectedMode = baseModes.find((mode) => mode.id === modeId);
  const lunchAvailable = Boolean(lunchMode && selectedMode && isInPersonMode(selectedMode.name));
  const effectiveMode = lunchAvailable && withLunch ? lunchMode : selectedMode;
  const plans = [
    ...(effectiveMode && !paid.has(effectiveMode.id) ? [effectiveMode.id] : []),
    ...workshopIds.filter((id) => !paid.has(id)),
  ];
  // Add-ons of every plan the participant holds or is buying now; quantities picked for a plan that was then
  // deselected stay in state but drop out of the order.
  const plansInHand = new Set([...paid, ...plans]);
  const offeredAddons: OfferedAddon[] = [...modes, ...workshops]
    .filter((plan) => plansInHand.has(plan.id))
    .flatMap((plan) => plan.addons.map((addon) => ({ ...addon, planName: plan.name })));
  const addons: AddonLine[] = offeredAddons.flatMap((addon) => {
    const quantity = Math.min(
      addonQuantities[addon.id] ?? 0,
      addon.isOpen ? addonUnitsLeft(addon, heldAddons[addon.id] ?? 0) : 0,
    );
    return quantity > 0 ? [{ addonId: addon.id, quantity }] : [];
  });
  const hasOrder = plans.length > 0 || addons.length > 0;
  const savedNationalCode = nationalCodeState.success ? (nationalCodeState.values?.nationalCode ?? '') : nationalCode;
  const needsNationalCode = Boolean(effectiveMode?.isNationalCodeRequired);

  const quote = useQuote({ plans, addons, discountCode });
  const checkout = useCheckout();

  const onCheckout = () => {
    setClientError('');
    if (!isProfileComplete) return setClientError('Please complete your profile before checking out.');
    if (!hasOrder) return setClientError('Choose a mode of attendance first.');
    if (needsNationalCode && !savedNationalCode) return setClientError('Please save your national code first.');
    checkout.mutate({ plans, addons, discountCode });
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {!isProfileComplete && (
        <Alert tone="warning">
          Please{' '}
          <Link href="/dashboard/profile" className="font-bold underline underline-offset-4">
            complete your profile
          </Link>{' '}
          (name and phone number) before registering.
        </Alert>
      )}

      <Panel
        id="attendance"
        title="How you attend"
        description="The first day is held in person and the second is entirely online. Take part in person or online."
      >
        <fieldset className="grid gap-3 sm:grid-cols-2" disabled={Boolean(paidMode)}>
          <legend className="sr-only">Mode of attendance</legend>
          {baseModes.map((mode) => {
            const closed = isInPersonMode(mode.name) && !REGISTRATION.inPersonOpen && !paid.has(mode.id);
            return (
              <label
                key={mode.id}
                className={`group relative flex min-h-24 flex-col justify-between gap-3 rounded-2xl border p-4 transition-[border-color,background-color,box-shadow] duration-200 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand ${
                  closed
                    ? 'cursor-not-allowed border-line-soft bg-canvas text-muted'
                    : 'cursor-pointer border-line hover:border-brand-muted has-checked:border-brand has-checked:bg-brand-soft has-checked:shadow-[0_0_0_1px] has-checked:shadow-brand'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={mode.id}
                  checked={modeId === mode.id}
                  disabled={closed}
                  onChange={() => setModeId(mode.id)}
                  className="sr-only"
                />
                <span className="flex items-start justify-between gap-3">
                  <span className={`text-lg font-bold ${closed ? 'line-through' : 'text-ink'}`}>{mode.name}</span>
                  {paid.has(mode.id) ? (
                    <span className="flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-bold text-success">
                      <Check className="size-3.5" aria-hidden />
                      Paid
                    </span>
                  ) : (
                    <span
                      className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-line transition-colors group-has-checked:border-brand group-has-checked:bg-brand"
                      aria-hidden
                    >
                      <span className="size-2 rounded-full bg-white" />
                    </span>
                  )}
                </span>
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-xl font-extrabold tracking-tight tabular-nums">{formatToman(mode.price)}</span>
                  {closed && <span className="text-sm font-semibold">Capacity is full</span>}
                </span>
              </label>
            );
          })}
        </fieldset>
        {lunchAvailable && lunchMode && selectedMode && (
          <label className="mt-3 flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line px-4 font-semibold text-ink transition-colors hover:border-brand-muted has-checked:border-brand has-checked:bg-brand-soft">
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={withLunch}
                onChange={(event) => setWithLunch(event.target.checked)}
                className="size-5 accent-brand"
              />
              Add lunch
            </span>
            <span className="tabular-nums">{formatToman(lunchMode.price - selectedMode.price)}</span>
          </label>
        )}
      </Panel>

      {needsNationalCode && (
        <Panel id="entrance" title="Entrance" description="In-person attendees are checked in by national code.">
          <ValidatedForm
            state={nationalCodeState}
            action={nationalCodeAction}
            className="flex flex-col gap-3 md:max-w-md"
          >
            <div className="grid grid-cols-[1fr_auto] items-start gap-2">
              <TextField
                label="National code"
                name="nationalCode"
                inputMode="numeric"
                maxLength={10}
                required
                defaultValue={nationalCodeState.values?.nationalCode ?? savedNationalCode}
              />
              <SubmitButton className="mt-8" size="md" variant={nationalCodeState.success ? 'soft' : 'primary'}>
                {nationalCodeState.success ? 'Saved' : 'Save'}
              </SubmitButton>
            </div>
            {nationalCodeState.error && <Alert tone="error">{nationalCodeState.error}</Alert>}
          </ValidatedForm>
        </Panel>
      )}

      {workshops.length > 0 && (
        <WorkshopPicker workshops={workshops} paid={paid} selected={workshopIds} onChange={setWorkshopIds} />
      )}

      {offeredAddons.length > 0 && (
        <AddonPicker
          addons={offeredAddons}
          held={heldAddons}
          quantities={addonQuantities}
          onChange={setAddonQuantities}
        />
      )}

      <Panel
        id="discount"
        title="Discount code"
        description="Have a code from a sponsor or the organisers? Apply it here."
      >
        <form
          className="flex flex-col gap-3 md:max-w-md"
          onSubmit={(event) => {
            event.preventDefault();
            setDiscountCode(toLatinDigits(discountInput.trim()));
          }}
        >
          <Field label="Code" htmlFor="discountCode">
            <div className="flex gap-2">
              <input
                id="discountCode"
                name="discountCode"
                maxLength={50}
                aria-invalid={quote.data?.discountInvalid ? true : undefined}
                aria-describedby={quote.data?.discountInvalid ? 'discountCode-error' : undefined}
                value={discountInput}
                onChange={(event) => setDiscountInput(event.target.value)}
                autoComplete="off"
                className={inputClasses}
              />
              <Button type="submit" variant={quote.data?.discountApplied ? 'soft' : 'primary'}>
                {quote.data?.discountApplied && discountCode === toLatinDigits(discountInput.trim())
                  ? 'Applied'
                  : 'Apply'}
              </Button>
            </div>
          </Field>
          {quote.data?.discountInvalid && (
            <p id="discountCode-error" role="alert" className="text-sm font-medium text-danger">
              This discount code is not valid.
            </p>
          )}
        </form>
      </Panel>

      {(clientError || checkout.error || quote.error) && (
        <Alert tone="error">{clientError || checkout.error?.message || quote.error?.message}</Alert>
      )}

      <StickyActionBar>
        <div className="min-w-0 grow ps-3">
          <p className="text-xs font-semibold text-muted">Total</p>
          <p
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink tabular-nums"
            aria-live="polite"
          >
            {formatToman(hasOrder ? (quote.data?.price.payable ?? 0) : 0)}
            {quote.isFetching && (
              <LoaderCircle className="size-4 animate-spin text-muted" aria-label="Updating price" />
            )}
            {quote.data && quote.data.discountApplied && quote.data.price.payable < quote.data.price.total && (
              <span className="text-sm font-medium text-muted line-through">{formatToman(quote.data.price.total)}</span>
            )}
          </p>
        </div>
        <Button size="lg" className="shrink-0" onClick={onCheckout} disabled={checkout.isPending || !hasOrder}>
          {checkout.isPending && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
          Check out
        </Button>
      </StickyActionBar>
    </div>
  );
}
