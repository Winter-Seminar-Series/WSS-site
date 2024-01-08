'use client';

import logout from '../../../lib/api/auth/logout';

export default function LogoutButton() {
  return (
    <a
      role="button"
      onClick={() => logout()}
      className="flex items-center justify-center gap-2 px-6 py-5"
    >
      <img src="/source/Logout.svg" />
      <span className="text-xl font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[#E04545]">
        Log out
      </span>
    </a>
  );
}
