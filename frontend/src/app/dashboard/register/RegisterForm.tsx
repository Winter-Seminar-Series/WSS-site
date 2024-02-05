'use client';

import { useCallback, useEffect, useState } from 'react';
import ProfileCompletionWarning from './ProfileCompletionWarning';
import Workshops from './Workshops';
import AttendanceInfo from './AttendanceInfo';
import { ModeOfAttendance, Workshop } from '../../../lib/types';
import { fetchPrice } from '../../../lib/api/dashboard/register';
import { createPayment } from '../../../lib/api/dashboard/payment';

export default function RegisterForm({
  workshops,
  modesOfAttendance,
  profileNationalCode,
  isProfileComplete,
}: {
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  profileNationalCode?: string;
  isProfileComplete: boolean;
}) {
  const [error, setError] = useState('');
  const [price, setPrice] = useState(0);
  const [inputDiscountCode, setInputDiscountCode] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountCodeValid, setDiscountCodeValid] = useState(true);
  const [discountCodeApplied, setDiscountCodeApplied] = useState(false);
  const [nationalCode, setNationalCode] = useState(profileNationalCode);
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(
    modesOfAttendance.findIndex((mode) => mode.paid),
  );

  const selectPlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) => [...selectedPlans, planId]);
  }, []);

  const removePlan = useCallback(async (planId: number) => {
    setSelectedPlans((selectedPlans) =>
      selectedPlans.filter((selectedPlanId) => selectedPlanId !== planId),
    );
  }, []);

  const updatePrice = useCallback(async () => {
    if (!selectedPlans || !selectedPlans.length) {
      setPrice(0);
      return;
    }
    const {
      price: { calculatedPrice },
      isDiscountCodeValid,
      error,
    } = await fetchPrice(selectedPlans, discountCode);
    if (!isDiscountCodeValid) {
      setDiscountCodeValid(false);
      return;
    }
    setDiscountCodeValid(true);
    setDiscountCodeApplied(discountCode && isDiscountCodeValid);
    setPrice(calculatedPrice);
  }, [discountCode, selectedPlans]);

  useEffect(() => {
    const doUpdatePrice = async () => {
      await updatePrice();
    };

    doUpdatePrice();
  }, [updatePrice]);

  const onCheckoutClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    setError('');

    if (!isProfileComplete) {
      setError('Please complete your profile before proceeding to checkout.');
      scrollToTop();
      return;
    }
    if (!modesOfAttendance[selectedModeIndex]) {
      setError('Please select a mode of attendance.');
      scrollToTop();
      return;
    }
    if (
      modesOfAttendance[selectedModeIndex]?.isNationalCodeRequired &&
      !nationalCode
    ) {
      setError('Please enter your national code.');
      scrollToTop();
      return;
    }

    const response = await createPayment({
      plans: selectedPlans,
      ...(isDiscountCodeValid ? { discountCode } : {}),
    });

    if (response.error) {
      setError(response.error);
      scrollToTop();
    }
  };

  const onDiscountCodeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setDiscountCodeValid(true);
    setInputDiscountCode(event.target.value);
    setDiscountCodeApplied(false);
  };

  const applyDiscountCode = () => {
    setDiscountCode(inputDiscountCode);
  };

  return (
    <>
      {!isProfileComplete && <ProfileCompletionWarning />}
      {error && (
        <p className="w-full rounded-md bg-red-50 p-3 font-medium text-red-600">
          {error}
        </p>
      )}
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Registeration
        </div>
        <AttendanceInfo
          modesOfAttendance={modesOfAttendance}
          selectPlan={selectPlan}
          removePlan={removePlan}
          nationalCode={nationalCode}
          setNationalCode={setNationalCode}
          price={price}
          updatePrice={updatePrice}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          selectedModeIndex={selectedModeIndex}
          setSelectedModeIndex={setSelectedModeIndex}
          isDiscountCodeValid={isDiscountCodeValid}
          setDiscountCodeValid={setDiscountCodeValid}
        />
        <div
          className={
            'mt-8 py-4 text-4xl font-bold tracking-[-0.72px] text-darkslategray-100'
          }
        >
          Workshops
        </div>
        <Workshops
          workshops={workshops}
          selectPlan={selectPlan}
          removePlan={removePlan}
        />

        <div className="mb-8 flex w-full items-end justify-between gap-y-4 max-md:flex-col max-md:items-stretch">
          <div
            className={
              'grow flex-col text-base font-medium text-lightslategray'
            }
          >
            PRICE
            <div className={'flex items-end font-semibold text-black'}>
              <div className={'text-4xl'}>{price.toLocaleString()}</div>
              <div className={'text-base'}>&nbsp;Rial</div>
            </div>
          </div>

          <div className="flex-col text-base font-medium text-lightslategray max-md:grow md:w-1/2">
            <p
              className={`mb-3 w-full rounded-md bg-red-50 p-3 font-medium text-red-600 ${
                isDiscountCodeValid ? 'hidden' : ''
              }`}
            >
              Discount code is invalid.
            </p>
            <div>DISCOUNT CODE</div>
            <div
              className={
                'm-0 mt-2 flex rounded-lg outline outline-1 outline-lightslategray/[0.3]'
              }
            >
              <input
                type={'text'}
                className={
                  'h-14 w-full px-5 py-4 text-lg font-semibold text-darkslategray-100 focus:outline-none'
                }
                name="discountCode"
                id="discountCode"
                defaultValue={discountCode}
                onChange={onDiscountCodeChange}
                onBlur={applyDiscountCode}
              />
              <button
                className={`mr-5 text-lg font-semibold uppercase ${
                  discountCodeApplied ? 'text-green-600' : 'text-primary'
                }`}
                onClick={applyDiscountCode}
              >
                {discountCodeApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
        <button
          className={
            'w-full rounded-lg bg-secondary py-6 text-xl font-bold text-white'
          }
          onClick={onCheckoutClick}
          disabled={!isProfileComplete}
        >
          Checkout
        </button>
      </div>
    </>
  );
}
