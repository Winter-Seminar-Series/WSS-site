import React from 'react';

function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Seminar Registration',
      persianTitle: 'ثبت‌نام رویداد',
      link: '/dashboard/seminar-registration',
      icon: 'star',
    },
    {
      title: 'Workshop Registration',
      persianTitle: 'ثبت‌نام کارگاه',
      link: '/dashboard/workshop-registration',
      icon: 'star',
    },
    {
      title: 'Your Seminars',
      persianTitle: 'سمینار‌های شما',
      link: '/dashboard/seminar-list',
      icon: 'star',
      deactive: true,
    },
    {
      title: 'Your Workshops',
      persianTitle: 'کارگاه‌های شما',
      link: '/dashboard/workshop-list',
      icon: 'star',
      deactive: true,
    },
    {
      title: 'profile',
      persianTitle: 'پروفایل',
      link: '/dashboard/profile',
      icon: 'star',
    },
  ];
  return (
    <>
      <div className="sidebar">
        {sidebarItems.map((s) =>
          s.deactive ? (
            <span key={s.title} className="sidebar-item deactive">
              <span className={`icon ml-2 fa fa-${s.icon}`}></span>
              <span>{s.title}</span>
            </span>
          ) : (
            <a key={s.title} className="sidebar-item" href={s.link}>
              <span className={`icon ml-2 fa fa-${s.icon}`}></span>
              <span>{s.title}</span>
            </a>
          )
        )}
      </div>
    </>
  );
}

export default Sidebar;

interface SidebarItem {
  title: string;
  persianTitle: string;
  link: string;
  icon?: string;
  deactive?: boolean;
}
