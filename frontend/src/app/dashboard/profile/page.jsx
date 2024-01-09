import { fetchEmailAndProfile } from '../../../lib/api/dashboard/profile';

export default async function Profile() {
  const { email, profile } = await fetchEmailAndProfile();

  return (
    <div className="flex flex-col items-start gap-5 self-stretch">
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
            <div className="flex items-start gap-[9px] self-stretch">
              <div className="flex items-center gap-3 rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                <div className="h-6 w-8 rounded-sm bg-[#d9d9d9]"></div>
                <input
                  className="w-[43px] text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                  type="text"
                  id="areaCodeInput"
                  pattern="[0-9]{3}"
                  maxLength={4}
                  defaultValue="+98"
                />
              </div>
              <div className="flex flex-[1_0_0] items-center gap-2 rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
                <input
                  className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                  type="text"
                  id="phoneNumber"
                  pattern="[0-9]{10}"
                  minLength={10}
                  maxLength={10}
                  defaultValue={profile.phoneNumber ?? 9123456789}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-6 self-stretch">
        <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
          <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
            First name
          </label>
          <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
            <input
              className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="fName"
              minLength={3}
              maxLength={15}
              defaultValue={profile.firstName}
            />
          </div>
        </div>
        <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
          <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
            Last name
          </label>
          <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
            <input
              className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="lName"
              minLength={3}
              maxLength={20}
              defaultValue={profile.lastName}
            />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-6 self-stretch">
        <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
          <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
            CITY
          </label>
          <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
            <input
              className="text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              id="City"
              minLength={3}
              maxLength={15}
              defaultValue={profile.city}
            />
          </div>
        </div>
        <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
          <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
            Birthday
          </label>
          <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
            <input
              className="black-text text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px]"
              type="date"
              id="birthday"
              name="birthday"
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
              value="male"
              className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
              defaultChecked={profile.gender === 'Male'}
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
              value="female"
              className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
              defaultChecked={profile.gender === 'Female'}
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
              value="other"
              className="h-3 w-3 shrink-0 fill-[var(--Primary-Color,#342B4C)]"
              defaultChecked={profile.gender === 'Other'}
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
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="min-w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="University"
                minLength={5}
                maxLength={100}
                defaultValue={profile.university}
              />
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Major
            </label>
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="min-w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="Major"
                minLength={5}
                maxLength={100}
                defaultValue={profile.major}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-8 self-stretch">
          <div className="flex h-[88px] flex-[1_0_0] flex-col items-start gap-[9px]">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              job
            </label>
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="min-w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="Job"
                minLength={5}
                maxLength={100}
                defaultValue={profile.job}
              />
            </div>
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
                name="openToWork"
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
          <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
            <input
              className="min-w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
              type="text"
              name="field"
              id="field"
              defaultValue={profile.fieldsOfInterest}
            />
          </div>
        </div>
        <div className="flex items-start gap-6 self-stretch">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              grade
            </label>
            <div className="flex items-center gap-5 px-0 py-1">
              <input
                defaultChecked={profile.grade === 'Bachelor'}
                type="radio"
                id="Bachelor"
                name="grade"
                value="Bachelor"
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
                defaultChecked={profile.grade === 'Master'}
                type="radio"
                id="Master"
                name="grade"
                value="Master"
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
                defaultChecked={profile.grade === 'PhD or higher'}
                type="radio"
                id="PhD"
                name="grade"
                value="PhD"
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
            {/* TODO */}
            <div className="flex items-center justify-between self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <select name="field" id="field" className="w-full"></select>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-6 self-stretch">
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              Linkedin
            </label>
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="linkedin"
                minLength={3}
                maxLength={100}
                defaultValue={profile.linkedin}
              />
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start gap-[9px] self-stretch">
            <label className="text-base font-medium uppercase not-italic leading-[normal] tracking-[0.64px] text-[#8A8998]">
              github
            </label>
            <div className="flex items-center gap-2 self-stretch rounded-lg border border-solid border-[rgba(138,137,152,0.30)] px-5 py-4">
              <input
                className="w-full text-lg font-semibold not-italic leading-[normal] tracking-[-0.18px] text-[#1F2B3D]"
                type="text"
                id="github"
                minLength={3}
                maxLength={100}
                defaultValue={profile.github}
              />
            </div>
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
    </div>
  );
}
