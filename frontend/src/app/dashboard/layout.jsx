import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { isAuthenticated } from '../../lib/auth';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import LogoutButton from '../../ui/components/dashboard/LogoutButton';
import DashboardNavbar from './DashboardNavbar';
import { fetchParticipation } from '../../lib/api/dashboard/register';
import { fetchModesOfAttendance } from '../../lib/api/events/modeOfAttendance';

export default async function DashboardLayout({ children }) {
  const authenticated = await isAuthenticated();
  const participation = await fetchParticipation();
  const modesOfAttendance = await fetchModesOfAttendance();

  const registeredModeOfAttendance =
    participation.plans.length === 0
      ? null
      : modesOfAttendance.find((mode) =>
          participation.plans.some((plan) => plan === mode.id),
        );

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="space-y-8 px-[72px] py-[60px] max-md:px-6">
          <div className="flex max-w-full flex-row items-start gap-x-8">
            <div className="grow flex-col gap-2">
              <p className="text-[20px] font-medium uppercase leading-normal tracking-[0.8px] text-[#8A8998] max-md:text-base max-md:leading-normal">
                Welcome back
              </p>
              <p className="text-[76px] font-bold leading-none tracking-[-1.52px] text-[#1F2B3D] max-md:text-4xl max-md:leading-none">
                Dashboard
              </p>
            </div>
            <p
              className={`rounded-md px-6 py-4 max-md:px-2 max-md:py-1 max-md:text-xs max-md:font-medium ${
                registeredModeOfAttendance
                  ? 'bg-green-100 text-green-900'
                  : 'bg-[#E7ECF3]'
              }`}
            >
              {registeredModeOfAttendance
                ? `Registered ${registeredModeOfAttendance.name}`
                : 'Not Registered Yet'}
            </p>
          </div>
          <DashboardNavbar />
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
