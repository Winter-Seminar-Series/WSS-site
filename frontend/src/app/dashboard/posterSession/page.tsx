import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import ProfileCompletionWarning from '../register/ProfileCompletionWarning';
import React from 'react';
import PosterSessionForm from './PosterSessionForm';

export default async function PosterSessionPanel() {
  const [
    {
      profile: { firstName, lastName, phoneNumber },
    },
  ] = await Promise.all([fetchEmailAndProfile()]);
  const { email, profile } = await fetchEmailAndProfile();

  const isProfileComplete = Boolean(firstName && lastName && phoneNumber);
  return (
    <>
      <div className="space-y-7">
        {!isProfileComplete && <ProfileCompletionWarning />}
      </div>
      <PosterSessionForm
        profile={profile}
        email={email}
        currentPoster={'moeein.pdf'}
      />
    </>
  );
}
