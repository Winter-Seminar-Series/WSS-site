'use server';

import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';
import ProfileCompletionWarning from '../register/ProfileCompletionWarning';
import React from 'react';
import PosterSessionForm from './PosterSessionForm';
import { getPosterSessionImage } from '../../../lib/api/dashboard/posterSession';
import { getAccessToken } from '../../../lib/api/session';

export default async function PosterSessionPanel() {
  const [
    {
      profile: { firstName, lastName, phoneNumber },
    },
  ] = await Promise.all([fetchEmailAndProfile()]);
  const { email, profile } = await fetchEmailAndProfile();

  const { image } = await getPosterSessionImage();
  const accessToken = await getAccessToken();
  const isProfileComplete = Boolean(firstName && lastName && phoneNumber);
  return (
    <>
      <div className="space-y-7">
        {!isProfileComplete && <ProfileCompletionWarning />}
      </div>
      <PosterSessionForm
        API_ORIGIN={process.env.API_ORIGIN}
        accessToken={accessToken}
        profile={profile}
        email={email}
        currentPoster={image}
      />
    </>
  );
}
