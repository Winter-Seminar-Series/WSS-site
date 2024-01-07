import logout from '../../lib/api/auth/logout';
import Footer from '../../ui/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/Navbar';
import LogoutButton from '../../ui/dashboard/LogoutButton';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
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
                Welcome back, sobhan
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                Dashboard
              </p>
            </div>
            <p className="flex items-center justify-center gap-[13px] rounded-md bg-gray-300 px-[23px] py-4">
              Not Registered Yet
            </p>
          </div>
          <div className="flex items-center justify-between self-stretch border-b border-solid border-b-[rgba(138,137,152,0.30)]">
            <div className="flex flex-row gap-0">
              <div className="flex items-center justify-center gap-2 border-b-2 border-solid border-b-[#9D6D9B] px-6 py-5">
                <img src="/source/Profile.svg" />
                <a className="text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[#9D6D9B]">
                  Profile
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 px-6 py-5 text-[#1F2B3D]">
                <img src="/source/TicketStar.svg" />
                <a className="text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[#1F2B3D]">
                  Registration
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 px-6 py-5">
                <img src="/source/Play.svg" />
                <a className="text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[#1F2B3D]">
                  Stream
                </a>
              </div>
            </div>
            <LogoutButton />
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
