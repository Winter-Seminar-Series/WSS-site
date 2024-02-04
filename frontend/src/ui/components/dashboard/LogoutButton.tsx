'use client';

import logout from '../../../lib/api/auth/logout';

export default function LogoutButton() {
  return (
    <a
      role="button"
      onClick={() => logout()}
      className="flex items-center justify-center gap-2 px-6 py-5 max-md:gap-1 max-md:px-3 max-md:py-2"
    >
      <img src="/source/Logout.svg" className="h-6 w-6 max-md:h-4 max-md:w-4" />
      <span className="text-xl font-semibold leading-normal tracking-[-0.2px] text-[#E04545] max-md:text-base">
        Log out
      </span>
    </a>
  );
}
