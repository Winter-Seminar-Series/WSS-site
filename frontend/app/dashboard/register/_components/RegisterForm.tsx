'use client';

import { Check, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useState } from 'react';

import { updateNationalCodeAction } from '@/actions/profile.actions';
import { WorkshopPicker } from '@/app/dashboard/register/_components/WorkshopPicker';
import { REGISTRATION, isInPersonMode, isLunchAddOn } from '@/lib/dashboard';
import { formatToman, toLatinDigits } from '@/lib/digits';
import type { FormState } from '@/lib/form';
import { useCheckout, useQuote } from '@/queries/registration.queries';
import type { AttendanceMode, Workshop } from '@/types/event.type';
import { Alert } from '@/ui/Alert';
import { Button } from '@/ui/Button';
import { Field, inputClasses } from '@/ui/FormField';
import { SubmitButton } from '@/ui/SubmitButton';

interface Props {
  modes: AttendanceMode[];
  workshops: Workshop[];
  paidPlanIds: number[];
  nationalCode: string;
  isProfileComplete: boolean;
}

const INITIAL_STATE: FormState = {};

export function RegisterForm({ modes, workshops, paidPlanIds, nationalCode, isProfileComplete }: Props) {
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
  const savedNationalCode = nationalCodeState.success ? (nationalCodeState.values?.nationalCode ?? '') : nationalCode;
  const needsNationalCode = Boolean(effectiveMode?.isNationalCodeRequired);

  const quote = useQuote(plans, discountCode);
  const checkout = useCheckout();

  const onCheckout = () => {
    setClientError('');
    if (!isProfileComplete) return setClientError('Please complete your profile before checking out.');
    if (plans.length === 0) return setClientError('Choose a mode of attendance first.');
    if (needsNationalCode && !savedNationalCode) return setClientError('Please save your national code first.');
    checkout.mutate({ plans, discountCode });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-ink">Registration</h2>

      {!isProfileComplete && (
        <Alert tone="warning">
          Please{' '}
          <Link href="/dashboard/profile" className="underline">
            complete your profile
          </Link>{' '}
          (name and phone number) before registering.
        </Alert>
      )}

      <div className="text-lg leading-relaxed text-muted">
        <p>
          The main event spans two days: the first day is held in person and the second day is entirely virtual. You can
          take part in person or online.
        </p>
      </div>

      <fieldset className="flex flex-col gap-3" disabled={Boolean(paidMode)}>
        <legend className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">Mode of attendance</legend>
        {baseModes.map((mode) => {
          const closed = isInPersonMode(mode.name) && !REGISTRATION.inPersonOpen && !paid.has(mode.id);
          return (
            <label
              key={mode.id}
              className={`flex min-h-11 items-center gap-3 text-lg font-semibold ${closed ? 'text-muted' : 'text-ink'}`}
            >
              <input
                type="radio"
                name="mode"
                value={mode.id}
                checked={modeId === mode.id}
                disabled={closed}
                onChange={() => setModeId(mode.id)}
                className="size-4 accent-brand"
              />
              <span className={closed ? 'line-through' : undefined}>
                {mode.name} — {formatToman(mode.price)}
              </span>
              {closed && <span className="text-sm font-medium no-underline">Capacity is full</span>}
              {paid.has(mode.id) && <Check className="size-5 text-success" aria-label="Paid" />}
            </label>
          );
        })}
        {lunchAvailable && lunchMode && selectedMode && (
          <label className="ms-7 flex min-h-11 items-center gap-3 text-lg font-semibold text-ink">
            <input
              type="checkbox"
              checked={withLunch}
              onChange={(event) => setWithLunch(event.target.checked)}
              className="size-4 accent-brand"
            />
            Add lunch — {formatToman(lunchMode.price - selectedMode.price)}
          </label>
        )}
      </fieldset>

      {needsNationalCode && (
        <form action={nationalCodeAction} className="flex flex-col gap-3 md:max-w-md">
          <Field label="National code (needed for entrance)" htmlFor="nationalCode" required>
            <div className="flex gap-2">
              <input
                id="nationalCode"
                name="nationalCode"
                inputMode="numeric"
                maxLength={10}
                required
                defaultValue={nationalCodeState.values?.nationalCode ?? savedNationalCode}
                className={inputClasses}
              />
              <SubmitButton size="md" variant={nationalCodeState.success ? 'soft' : 'primary'}>
                {nationalCodeState.success ? 'Saved' : 'Save'}
              </SubmitButton>
            </div>
          </Field>
          {nationalCodeState.error && <Alert tone="error">{nationalCodeState.error}</Alert>}
        </form>
      )}

      {workshops.length > 0 && (
        <WorkshopPicker workshops={workshops} paid={paid} selected={workshopIds} onChange={setWorkshopIds} />
      )}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-muted uppercase">Price</p>
          <p className="flex items-center gap-3 text-4xl font-semibold text-ink" aria-live="polite">
            {formatToman(plans.length > 0 ? (quote.data?.price.payable ?? 0) : 0)}
            {quote.isFetching && (
              <LoaderCircle className="size-6 animate-spin text-muted" aria-label="Updating price" />
            )}
          </p>
          {quote.data && quote.data.discountApplied && quote.data.price.payable < quote.data.price.total && (
            <p className="text-muted line-through">{formatToman(quote.data.price.total)}</p>
          )}
        </div>

        <form
          className="flex flex-col gap-2 md:w-1/2"
          onSubmit={(event) => {
            event.preventDefault();
            setDiscountCode(toLatinDigits(discountInput.trim()));
          }}
        >
          <Field label="Discount code" htmlFor="discountCode">
            <div className="flex gap-2">
              <input
                id="discountCode"
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
          {quote.data?.discountInvalid && <Alert tone="error">This discount code is not valid.</Alert>}
        </form>
      </div>

      {(clientError || checkout.error || quote.error) && (
        <Alert tone="error">{clientError || checkout.error?.message || quote.error?.message}</Alert>
      )}

      <Button size="lg" className="w-full" onClick={onCheckout} disabled={checkout.isPending || plans.length === 0}>
        {checkout.isPending && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
        Checkout
      </Button>
    </div>
  );
}
