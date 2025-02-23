'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Profile } from '../../../lib/types';

interface IPosterSessionForm {
  email: string;
  profile: Profile;
  currentPoster: string;
  accessToken: string;
  API_ORIGIN: string;
}

export default function PosterSessionForm(props: IPosterSessionForm) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(null);

  async function updatePosterSessionImage(body: FormData, accessToken: string) {
    const url = `${props.API_ORIGIN}/api/poster-session/image/`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });
    const data = await response.json();
    return data;
  }

  async function createPosterSessionImage(body: FormData, accessToken: string) {
    const url = `${props.API_ORIGIN}/api/poster-session/image/create/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });
    const data = await response.json();
    return data;
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  return (
    <>
      {!error && successful && (
        <p className="w-full rounded-md bg-green-50 p-3 font-medium text-green-600">
          Profile updated successfully!
        </p>
      )}
      {error && (
        <p className="bg-red-50 text-red-600 w-full rounded-md p-3 font-medium">
          {error}
        </p>
      )}
      <form
        className="flex flex-col items-start gap-5 self-stretch"
        action={async () => {
          setError('');
          setSuccessful(false);
          const formData = new FormData();
          formData.append('image', file);
          if (props.currentPoster) {
            updatePosterSessionImage(formData, props.accessToken)
              .then(() => {
                setSuccessful(true);
                setError('');
              })
              .catch((e) => {
                setSuccessful(false);
              });
          } else {
            createPosterSessionImage(formData, props.accessToken)
              .then(() => {
                setError('Not Successful');
                setSuccessful(true);
                setError('');
              })
              .catch(() => {
                setError('Not Successful');
                setSuccessful(false);
              });
          }
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <label className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
          Poster Session Competition
        </label>

        <div className="flex items-start gap-6 self-stretch max-md:flex-col">
          <div className="flex flex-[1_0_0] flex-col items-start gap-2 self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[.64px] text-[#8A8998]">
              Upload File
            </label>
            <p className="text-sm tracking-[0.64px] text-[#8A8998]">
              Supported format: <strong>.pdf</strong> (Max: 10MB)
            </p>
            <div>
              <button
                onClick={handleClick}
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white shadow-md transition hover:bg-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5m-4-4l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <span>Upload file</span>
              </button>

              <input
                type="file"
                accept={'application/pdf'}
                ref={fileInputRef}
                onChange={handleFileChange}
                name={'image'}
                className="hidden"
              />
            </div>

            {props.currentPoster && (
              <p className="text-sm text-[#8A8998] ">
                Current File:{' '}
                <Link
                  target={'_blank'}
                  className={
                    'font-bold text-secondary underline hover:cursor-pointer'
                  }
                  href={props.currentPoster}
                >
                  Current Uploaded File
                </Link>
              </p>
            )}
          </div>
        </div>

        <button className="mb-8 flex h-[72px] items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-8 py-0 text-xl font-bold not-italic leading-[normal] tracking-[-0.2px] text-white">
          Update Poster File
        </button>
      </form>
    </>
  );
}
