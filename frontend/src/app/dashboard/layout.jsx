import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { isAuthenticated } from '../../lib/auth';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import LogoutButton from '../../ui/components/dashboard/LogoutButton';
import DashboardNavbar from './DashboardNavbar';

export default async function DashboardLayout({ children }) {
  const authenticated = await isAuthenticated();

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/Rectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[400px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px]">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="flex-col gap-2">
              <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Welcome back
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                Dashboard
              </p>
            </div>
            <p className="flex items-center justify-center gap-[13px] rounded-md bg-gray-300 px-[23px] py-4">
              Not Registered Yet
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
