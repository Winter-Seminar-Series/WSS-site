'use client';

import { SetStateAction, useState } from 'react';
import { updateProfile } from '../../../lib/api/dashboard/profile';
import { Gender, Grade, IntroductionMethod, Profile } from '../../../lib/types';
import Select from 'react-select';

type OptionType = {
  value: string;
  label: string;
};
const provinceOptions: OptionType[] = [
  { value: 'Outside of Iran', label: 'Outside of Iran' },
  { value: 'East Azerbaijan', label: 'East Azerbaijan' },
  { value: 'West Azerbaijan', label: 'West Azerbaijan' },
  { value: 'Ardabil', label: 'Ardabil' },
  { value: 'Isfahan', label: 'Isfahan' },
  { value: 'Alborz', label: 'Alborz' },
  { value: 'Ilam', label: 'Ilam' },
  { value: 'Bushehr', label: 'Bushehr' },
  { value: 'Tehran', label: 'Tehran' },
  { value: 'Chaharmahal and Bakhtiari', label: 'Chaharmahal and Bakhtiari' },
  { value: 'South Khorasan', label: 'South Khorasan' },
  { value: 'Razavi Khorasan', label: 'Razavi Khorasan' },
  { value: 'North Khorasan', label: 'North Khorasan' },
  { value: 'Khuzestan', label: 'Khuzestan' },
  { value: 'Zanjan', label: 'Zanjan' },
  { value: 'Semnan', label: 'Semnan' },
  { value: 'Sistan and Baluchestan', label: 'Sistan and Baluchestan' },
  { value: 'Fars', label: 'Fars' },
  { value: 'Qazvin', label: 'Qazvin' },
  { value: 'Qom', label: 'Qom' },
  { value: 'Kurdistan', label: 'Kurdistan' },
  { value: 'Kerman', label: 'Kerman' },
  { value: 'Kermanshah', label: 'Kermanshah' },
  { value: 'Kohgiluyeh and Boyer-Ahmad', label: 'Kohgiluyeh and Boyer-Ahmad' },
  { value: 'Golestan', label: 'Golestan' },
  { value: 'Gilan', label: 'Gilan' },
  { value: 'Lorestan', label: 'Lorestan' },
  { value: 'Mazandaran', label: 'Mazandaran' },
  { value: 'Markazi', label: 'Markazi' },
  { value: 'Hormozgan', label: 'Hormozgan' },
  { value: 'Hamedan', label: 'Hamedan' },
  { value: 'Yazd', label: 'Yazd' },
];

const jobOptions: OptionType[] = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Mobile Developer', label: 'Mobile Developer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Data Engineer', label: 'Data Engineer' },
  { value: 'AI Researcher', label: 'AI Researcher' },
  { value: 'Computer Vision Engineer', label: 'Computer Vision Engineer' },
  { value: 'NLP Engineer', label: 'NLP Engineer' },
  { value: 'Cybersecurity Engineer', label: 'Cybersecurity Engineer' },
  { value: 'Cloud Engineer', label: 'Cloud Engineer' },
  { value: 'Embedded Systems Engineer', label: 'Embedded Systems Engineer' },
  { value: 'Blockchain Developer', label: 'Blockchain Developer' },
  { value: 'Game Developer', label: 'Game Developer' },
  { value: 'Research Scientist', label: 'Research Scientist' },
  { value: 'PhD Student', label: 'PhD Student' },
  { value: 'Master’s Student', label: 'Master’s Student' },
  { value: 'Undergraduate Student', label: 'Undergraduate Student' },
  { value: 'University Professor', label: 'University Professor' },
  { value: 'Researcher', label: 'Researcher' },
  { value: 'Research Assistant', label: 'Research Assistant' },
  { value: 'Technical Product Manager', label: 'Technical Product Manager' },
  { value: 'Other', label: 'Other (please specify)' },
];

const majorOptions: OptionType[] = [
  { value: 'computer-engineering', label: 'Computer Engineering' },
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'electrical-engineering', label: 'Electrical Engineering' },
  { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'other', label: 'Other...' },
];

export default function ProfileForm({
  email,
  profile,
}: {
  email: string;
  profile: Profile;
}) {
  const [error, setError] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(
    provinceOptions.find((option) => option.value === profile.city) || '',
  );
  const [selectedJob, setSelectedJob] = useState(
    jobOptions.find((option) => option.value === profile.job) || '',
  );
  const [selectedMajor, setSelectedMajor] = useState(
    majorOptions.find((option) => option.value === profile.major) || '',
  );

  const handleChangeProvince = (option: OptionType | '') => {
    setSelectedProvince(option);
  };

  const handleChangeJob = (option: OptionType | '') => {
    setSelectedJob(option);
  };

  const handleChangeMajor = (option: OptionType | '') => {
    setSelectedMajor(option);
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
        action={async (data) => {
          setError('');
          setSuccessful(false);
          data.set(
            'city',
            typeof selectedProvince === 'string'
              ? selectedProvince
              : selectedProvince.value,
          );
          data.set(
            'major',
            typeof selectedMajor === 'string'
              ? selectedMajor
              : selectedMajor.value,
          );
          data.set(
            'job',
            typeof selectedJob === 'string' ? selectedJob : selectedJob.value,
          );
          const response = await updateProfile(data);
          if (response.error) {
            setError(response.error);
          } else {
            setSuccessful(true);
          }
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className="flex flex-col items-start gap-5 self-stretch"
      >
        <label className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
          Personal Info
        </label>
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-start gap-6 self-stretch max-md:flex-col">
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
                <span className={'ml-1 text-xl font-bold text-secondary'}>
                  *
                </span>
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
        <div className="flex items-start gap-6 self-stretch max-md:flex-col">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              First name
              <span className={'ml-1 text-xl font-bold text-secondary'}>*</span>
            </label>
            <input
              className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="fName"
              minLength={3}
              defaultValue={profile.firstName}
              name="firstName"
              required
            />
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Last name
              <span className={'ml-1 text-xl font-bold text-secondary'}>*</span>
            </label>
            <input
              className="self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="lName"
              minLength={3}
              defaultValue={profile.lastName}
              name="lastName"
              required
            />
          </div>
        </div>
        <div className="flex items-start gap-6 self-stretch max-md:flex-col">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-normal tracking-[0.64px] text-[#8A8998]">
                Province
              </label>
              <Select
                // @ts-ignore
                options={provinceOptions}
                value={selectedProvince}
                onChange={handleChangeProvince}
                placeholder="Choose your province"
                isSearchable
                className="h-full w-full"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#ebe2eb',
                    '&:hover': { borderColor: '#9d6d9b' },
                    boxShadow: '0 0 0 1px #ffffff',
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? ''
                      : isFocused
                        ? '#c4a7c3'
                        : 'white',
                    color: isSelected ? 'white' : 'black',
                  }),
                }}
              />
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Birthday
              <span className={'ml-1 text-xl font-bold text-secondary'}>*</span>
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
            </div>
          </div>
        </div>
        <hr className="h-px max-w-[1055px] bg-[#8A89984D]"></hr>
        <div className="flex flex-col items-start gap-5 self-stretch">
          <p className="text-4xl font-bold not-italic leading-[normal] tracking-[-0.72px] text-[#1F2B3D]">
            Professional Info
          </p>
        </div>
        <div className="ma flex flex-col items-start gap-8 self-stretch">
          <div className="flex items-start gap-6 self-stretch max-md:flex-col">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                University
                <span className={'ml-1 text-xl font-bold text-secondary'}>
                  *
                </span>
              </label>
              <input
                className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="University"
                minLength={5}
                required
                defaultValue={profile.university}
                name="university"
              />
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              {/*<label*/}
              {/*  className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">*/}
              {/*  Major<span className={'text-secondary font-bold text-xl ml-1'}>*</span>*/}
              {/*</label>*/}
              {/*<input*/}
              {/*  className="min-w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"*/}
              {/*  type="text"*/}
              {/*  id="Major"*/}
              {/*  required*/}
              {/*  minLength={5}*/}
              {/*  defaultValue={profile.major}*/}
              {/*  name="major"*/}
              {/*/>*/}
              <label className="text-base font-medium uppercase not-italic leading-normal tracking-[0.64px] text-[#8A8998]">
                Major
              </label>
              <Select
                // @ts-ignore
                options={majorOptions}
                name={'major'}
                value={selectedMajor}
                onChange={handleChangeMajor}
                placeholder="Choose your Major"
                isSearchable
                className="h-full w-full"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#ebe2eb',
                    '&:hover': { borderColor: '#9d6d9b' },
                    boxShadow: '0 0 0 1px #ffffff',
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? ''
                      : isFocused
                        ? '#c4a7c3'
                        : 'white',
                    color: isSelected ? 'white' : 'black',
                  }),
                }}
              />
            </div>
          </div>
          <div className="flex items-start gap-8 self-stretch max-md:flex-col">
            <div className="flex h-[88px] w-full flex-[1_0_0] flex-col items-start gap-[9px]">
              <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
                <label className="text-base font-medium uppercase not-italic leading-normal tracking-[0.64px] text-[#8A8998]">
                  Job
                </label>
                <Select
                  // @ts-ignore
                  options={jobOptions}
                  value={selectedJob}
                  onChange={handleChangeJob}
                  placeholder="Choose your Job"
                  isSearchable
                  className="h-full w-full"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#ebe2eb',
                      '&:hover': { borderColor: '#9d6d9b' },
                      boxShadow: '0 0 0 1px #ffffff',
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      backgroundColor: isSelected
                        ? ''
                        : isFocused
                          ? '#c4a7c3'
                          : 'white',
                      color: isSelected ? 'white' : 'black',
                    }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Status
              </label>
              <label className="flex items-center gap-2 px-0 py-1 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]">
                <input
                  defaultChecked={profile.isOpenToWork}
                  type="checkbox"
                  id="openToWork"
                  name="isOpenToWork"
                  value="open"
                  className="h-4 w-4 shrink-0"
                />
                I’m open to work
              </label>
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
          <div className="flex items-start gap-6 self-stretch max-md:flex-col">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <div className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                grade
              </div>
              <div className="flex items-center gap-x-5 gap-y-1 px-0 py-1 max-md:flex-col max-md:items-stretch">
                <label className="flex items-center gap-x-5 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]">
                  <input
                    defaultChecked={profile.grade === Grade.BACHELOR}
                    type="radio"
                    id="Bachelor"
                    name="grade"
                    value="B"
                    className="accent-purple h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                  />
                  Bachelor
                </label>
                <label className="flex items-center gap-x-5 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]">
                  <input
                    defaultChecked={profile.grade === Grade.MASTER}
                    type="radio"
                    id="Master"
                    name="grade"
                    value="M"
                    className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                  />
                  Master
                </label>
                <label className="flex items-center gap-x-5 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]">
                  <input
                    defaultChecked={profile.grade === Grade.PHD}
                    type="radio"
                    id="PhD"
                    name="grade"
                    value="P"
                    className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
                  />
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
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-6 self-stretch max-md:flex-col">
            <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
              <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
                Linkedin
              </label>
              <input
                className="w-full self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4 text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                id="linkedin"
                minLength={3}
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
                defaultValue={profile.github}
                name="github"
                aria-autocomplete={'none'}
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
            <div className="flex items-start gap-6 self-stretch max-md:flex-col">
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
