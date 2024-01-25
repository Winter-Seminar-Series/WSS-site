'use client';

import { useState } from 'react';
import {
  ModeOfAttendance,
  Participation,
  Workshop,
} from '../../../lib/types';

export default function RegisterForm({
  participation,
  workshops,
  modesOfAttendance,
  nationalCode,
}: {
  participation: Participation;
  workshops: Workshop[];
  modesOfAttendance: ModeOfAttendance[];
  nationalCode?: string;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);

  return <></>;
}
