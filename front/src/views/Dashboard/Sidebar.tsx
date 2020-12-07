import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Sidebar() {
  const history = useHistory();

  const logout = () => {
    //todo logout
    // localStorage.setItem('WSS', JSON.stringify(undefined));
    history.push('/');
  };
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Seminar Registration',
      persianTitle: 'ثبت‌نام رویداد',
      link: '/dashboard/seminar-registration',
      icon: 'calendar-o',
    },
    {
      title: 'Workshop Registration',
      persianTitle: 'ثبت‌نام کارگاه',
      link: '/dashboard/workshop-registration',
      icon: 'calendar',
    },
    {
      title: 'Your Seminars',
      persianTitle: 'سمینار‌های شما',
      link: '/dashboard/seminar-list',
      icon: 'bookmark-o',
      deactive: true,
    },
    {
      title: 'Your Workshops',
      persianTitle: 'کارگاه‌های شما',
      link: '/dashboard/workshop-list',
      icon: 'bookmark-o',
      deactive: true,
    },
    {
      title: 'profile',
      persianTitle: 'پروفایل',
      link: '/dashboard/profile',
      icon: 'user-circle-o',
    },
  ];
  return (
    <>
      <div className="sidebar">
        {sidebarItems.map((s) =>
          s.deactive ? (
            <span key={s.title} className="sidebar-item deactive">
              <span className={`icon ml-2 fa fa-${s.icon}`}></span>
              <span className="d-none d-md-block">{s.title}</span>
            </span>
          ) : (
            <a href={s.link} key={s.title} className="sidebar-item">
              <span className={`icon ml-2 fa fa-${s.icon}`}></span>
              <span className="d-none d-md-block">{s.title}</span>
            </a>
          )
        )}
        <span key="logout" className="sidebar-item" onClick={logout}>
          <span className={`icon ml-2 fa fa-sign-out`}></span>
          <span className="d-none d-md-block">logout</span>
        </span>
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
