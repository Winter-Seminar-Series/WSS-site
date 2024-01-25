'use client';

import { useState } from 'react';
import { ModeOfAttendance, Workshop } from '../../../lib/types';

export default function RegisterForm({
  workshops,
  modesOfAttendance,
  nationalCode,
}: {
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  nationalCode?: string;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);

  return <></>;
}
