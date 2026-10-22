'use client';

import { useActionState } from 'react';

import { updateProfileAction } from '@/actions/profile.actions';
import type { FormState } from '@/lib/form';
import { GENDERS, GRADES, INTRODUCTION_METHODS, JOBS, MAJORS, PROVINCES } from '@/lib/profile-options';
import type { Profile } from '@/types/participant.type';
import { Alert } from '@/ui/Alert';
import { ChoiceGroup } from '@/ui/ChoiceGroup';
import { Field, SelectField, TextField } from '@/ui/FormField';
import { SubmitButton } from '@/ui/SubmitButton';

interface Props {
  profile: Profile;
}

const INITIAL_STATE: FormState = {};

export function ProfileForm({ profile }: Props) {
  const [state, formAction] = useActionState(updateProfileAction, INITIAL_STATE);
  // After a failed submit React resets the form; fall back to what the user typed, then to the saved profile.
  const value = (name: keyof Profile): string => state.values?.[name] ?? String(profile[name] ?? '');

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <section aria-labelledby="personal" className="flex flex-col gap-6">
        <h2 id="personal" className="text-3xl font-bold text-ink">
          Personal Info
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Email" htmlFor="email">
            <p id="email" className="rounded-lg bg-canvas px-4 py-3 font-semibold text-ink">
              {profile.email}
            </p>
          </Field>
          <TextField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="09123456789"
            defaultValue={value('phoneNumber')}
            required
          />
          <TextField
            label="First name"
            name="firstName"
            autoComplete="given-name"
            defaultValue={value('firstName')}
            required
          />
          <TextField
            label="Last name"
            name="lastName"
            autoComplete="family-name"
            defaultValue={value('lastName')}
            required
          />
          <SelectField
            label="Province"
            name="city"
            options={PROVINCES}
            placeholder="Choose your province"
            defaultValue={value('city')}
          />
          <TextField label="Birthday" name="birthDate" type="date" defaultValue={value('birthDate')} />
          <TextField
            label="National code"
            name="nationalCode"
            inputMode="numeric"
            maxLength={10}
            hint="Required for in-person attendance."
            defaultValue={value('nationalCode')}
          />
          <ChoiceGroup legend="Gender" name="gender" options={GENDERS} defaultValue={value('gender')} />
        </div>
      </section>

      <hr className="border-line" />

      <section aria-labelledby="professional" className="flex flex-col gap-6">
        <h2 id="professional" className="text-3xl font-bold text-ink">
          Professional Info
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            label="University"
            name="university"
            autoComplete="organization"
            defaultValue={value('university')}
            required
          />
          <SelectField
            label="Major"
            name="major"
            options={MAJORS}
            placeholder="Choose your major"
            defaultValue={value('major')}
          />
          <SelectField
            label="Job"
            name="job"
            options={JOBS}
            placeholder="Choose your job"
            defaultValue={value('job')}
          />
          <Field label="Status" htmlFor="isOpenToWork">
            <label className="flex min-h-12 items-center gap-3 text-lg font-semibold text-ink">
              <input
                id="isOpenToWork"
                name="isOpenToWork"
                type="checkbox"
                defaultChecked={state.values ? state.values.isOpenToWork === 'on' : profile.isOpenToWork}
                className="size-5 accent-brand"
              />
              I&apos;m open to work
            </label>
          </Field>
          <TextField
            label="Fields of interest"
            name="fieldsOfInterest"
            placeholder="e.g. Machine learning, Systems"
            defaultValue={value('fieldsOfInterest')}
            className="md:col-span-2"
          />
          <ChoiceGroup legend="Grade" name="grade" options={GRADES} defaultValue={value('grade')} />
          <SelectField
            label="How did you hear about us?"
            name="introductionMethod"
            options={INTRODUCTION_METHODS}
            placeholder="Choose one"
            defaultValue={value('introductionMethod')}
          />
          <TextField
            label="LinkedIn"
            name="linkedin"
            placeholder="linkedin.com/in/…"
            defaultValue={value('linkedin')}
          />
          <TextField label="GitHub" name="github" placeholder="github.com/…" defaultValue={value('github')} />
        </div>
      </section>

      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.success && <Alert tone="success">{state.success}</Alert>}
      <SubmitButton className="w-full">Update Profile</SubmitButton>
    </form>
  );
}
