'use client';

import { useState } from 'react';
import { updateProfile } from '../../../lib/api/dashboard/profile';
import { Gender, Grade, IntroductionMethod, Profile } from '../../../lib/types';

export default function ProfileForm({
  email,
  profile,
}: {
  email: string;
  profile: Profile;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);

  return (
    <>
      {!error && successful && (
        <p className="w-full rounded-md bg-green-50 p-3 font-medium text-green-600">
          Profile updated successfully!
        </p>
      )}
      {error && (
        <p className="w-full rounded-md bg-red-50 p-3 font-medium text-red-600">
          {error}
        </p>
      )}
      <form
        action={async (data) => {
          setError('');
          setSuccessful(false);
          try {
            await updateProfile(data);
            setSuccessful(true);
          } catch (error) {
            setError(error.message);
          }
        }}
        className="flex flex-col items-start gap-5 self-stretch"
      >
        <label className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
          Personal Info
        </label>
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-start gap-6 self-stretch">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                EMAIL
              </label>
              <p className="flex items-center gap-2 self-stretch rounded-lg bg-[#8A89981A] px-5 py-4">
                {email}
              </p>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Phone Number
              </label>
              <input
                className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="^(\+98|0)9\d{9}$"
                placeholder="09123456789"
                defaultValue={profile.phoneNumber}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-6 self-stretch">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              First name
            </label>
            <input
              className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="fName"
              minLength={3}
              maxLength={15}
              defaultValue={profile.firstName}
              name="firstName"
              required
            />
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Last name
            </label>
            <input
              className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="lName"
              minLength={3}
              maxLength={20}
              defaultValue={profile.lastName}
              name="lastName"
              required
            />
          </div>
        </div>
        <div className="flex items-start gap-6 self-stretch">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              CITY
            </label>
            <input
              className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="city"
              name="city"
              minLength={3}
              maxLength={15}
              defaultValue={profile.city}
            />
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Birthday
            </label>
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="black-text min-w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px]"
                type="date"
                id="birthday"
                name="birthDate"
                defaultValue={profile.birthDate}
              ></input>
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Gender
            </label>
            <div className="flex items-center gap-5 px-0 py-1">
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                className="h-3 w-3 shrink-0 accent-primary-400"
                defaultChecked={profile.gender === Gender.MALE}
              />
              <label
                htmlFor="male"
                className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              >
                Male
              </label>
              <br />
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                className="h-3 w-3 shrink-0 accent-primary-400"
                defaultChecked={profile.gender === Gender.FEMALE}
              />
              <label
                htmlFor="female"
                className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              >
                Female
              </label>
              <br />
              <input
                type="radio"
                id="other"
                name="gender"
                value="O"
                className="h-3 w-3 shrink-0 accent-primary-400"
                defaultChecked={profile.gender === Gender.OTHER}
              />
              <label
                htmlFor="other"
                className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              >
                Other
              </label>
            </div>
          </div>
        </div>
        <hr className="h-px max-w-[1055px] bg-[#8A89984D]"></hr>
        <div className="flex flex-col items-start gap-5 self-stretch">
          <p className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
            Professional Info
          </p>
        </div>
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-start gap-6 self-stretch">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                University
              </label>
              <input
                className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="University"
                minLength={5}
                maxLength={100}
                defaultValue={profile.university}
                name="university"
              />
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Major
              </label>
              <input
                className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="Major"
                minLength={5}
                maxLength={100}
                defaultValue={profile.major}
                name="major"
              />
            </div>
          </div>
          <div className="flex items-start gap-8 self-stretch">
            <div className="flex h-[88px] flex-[1_0_0] flex-col items-start gap-[9px]">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                job
              </label>
              <input
                className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="Job"
                minLength={5}
                maxLength={100}
                defaultValue={profile.job}
                name="job"
              />
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Status
              </label>
              <div className="flex items-center gap-2 px-0 py-1">
                <input
                  defaultChecked={profile.isOpenToWork}
                  type="checkbox"
                  id="openToWork"
                  name="isOpenToWork"
                  value="open"
                  className="h-4 w-4 shrink-0"
                />
                <label className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]">
                  I’m open to work
                </label>
              </div>
            </div>
          </div>
          <div className="flex h-[88px] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Fields of interest
            </label>
            <input
              className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              name="fieldOfInterest"
              id="field"
              defaultValue={profile.fieldsOfInterest}
            />
          </div>
          <div className="flex items-start gap-6 self-stretch">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                grade
              </label>
              <div className="flex items-center gap-5 px-0 py-1">
                <input
                  defaultChecked={profile.grade === Grade.BACHELOR}
                  type="radio"
                  id="Bachelor"
                  name="grade"
                  value="B"
                  className="accent-purple h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                />
                <label
                  htmlFor="Bachelor"
                  className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                >
                  Bachelor
                </label>
                <br />
                <input
                  defaultChecked={profile.grade === Grade.MASTER}
                  type="radio"
                  id="Master"
                  name="grade"
                  value="M"
                  className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                />
                <label
                  htmlFor="Master"
                  className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                >
                  Master
                </label>
                <br />
                <input
                  defaultChecked={profile.grade === Grade.PHD}
                  type="radio"
                  id="PhD"
                  name="grade"
                  value="P"
                  className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                />
                <label
                  htmlFor="PhD"
                  className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                >
                  PhD or Higher
                </label>
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Introduction Method
              </label>
              <div className="flex items-center justify-between self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                <select name="introductionMethod" id="field" className="w-full">
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.TELEGRAM
                    }
                  >
                    Telegram
                  </option>
                  <option
                    selected={
                      profile.introductionMethod ===
                      IntroductionMethod.INSTAGRAM
                    }
                  >
                    Instagram
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.LINKEDIN
                    }
                  >
                    LinkedIn
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.YOUTUBE
                    }
                  >
                    YouTube
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.QUERA
                    }
                  >
                    Quera
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.EMAIL
                    }
                  >
                    Email
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.SMS
                    }
                  >
                    SMS
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.FRIENDS
                    }
                  >
                    Friends
                  </option>
                  <option
                    selected={
                      profile.introductionMethod ===
                      IntroductionMethod.PROFESSORS
                    }
                  >
                    Professors
                  </option>
                  <option
                    selected={
                      profile.introductionMethod === IntroductionMethod.FORUMS
                    }
                  >
                    Forums
                  </option>
                  <option
                    selected={
                      !profile.introductionMethod ||
                      profile.introductionMethod === IntroductionMethod.OTHERS
                    }
                  >
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-6 self-stretch">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Linkedin
              </label>
              <input
                className="w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                id="linkedin"
                minLength={3}
                maxLength={100}
                defaultValue={profile.linkedin}
                name="linkedin"
              />
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                github
              </label>
              <input
                className="w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                id="github"
                minLength={3}
                maxLength={100}
                defaultValue={profile.github}
                name="github"
              />
            </div>
          </div>
          <button className="mb-8 flex h-[72px] items-center justify-center gap-2.5 self-stretch rounded-lg bg-[#342B4C] px-8 py-0 text-xl font-bold not-italic leading-[normal] tracking-[-0.2px] text-white">
            Update Profile
          </button>
          <div className="flex flex-col items-start gap-5 self-stretch">
            <label className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
              Password Change
            </label>
            <div className="flex items-start gap-6 self-stretch">
              <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
                <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                  Current Password
                </label>
                <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                  <input
                    className="w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                    type="password"
                    autoComplete="current-password"
                    id="currentPass"
                    minLength={3}
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
                <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                  New Password
                </label>
                <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                  <input
                    className="w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                    type="password"
                    autoComplete="new-password"
                    id="newPass"
                    minLength={3}
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
                <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                  confirm new Password
                </label>
                <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                  <input
                    className="w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                    type="password"
                    autoComplete="new-password"
                    id="confirmNewPass"
                    minLength={3}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="mb-8 flex h-[72px] items-center justify-center gap-2.5 self-stretch rounded-lg bg-[#342B4C] px-8 py-0 text-xl font-bold not-italic leading-[normal] tracking-[-0.2px] text-white">
            Update Password
          </button>
        </div>
      </form>
    </>
  );
}
