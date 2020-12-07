import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  logout
} from '../../redux/actions/account'

function Sidebar({ logout }) {
  const history = useHistory();

  const doLogout = () => {
    logout()
    history.push('/');
  };

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
      icon: '',
      deactive: true,
    },
    {
      title: 'Your Workshops',
      persianTitle: 'کارگاه‌های شما',
      link: '/dashboard/workshop-list',
      icon: '',
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
              <span>{s.title}</span>
            </span>
          ) : (
              <Link key={s.title} className="sidebar-item" to={s.link}>
                <span className={`icon ml-2 fa fa-${s.icon}`}></span>
                <span>{s.title}</span>
              </Link>
            )
        )}
        <span key="logout" className="sidebar-item" onClick={doLogout}>
          <span className={`icon ml-2 fa fa-exit`}></span>
          <span>logout</span>
        </span>
      </div>
    </>
  );
}


export default connect(
  () => { },
  {
    logout,
  }
)(Sidebar);

interface SidebarItem {
  title: string;
  persianTitle: string;
  link: string;
  icon?: string;
  deactive?: boolean;
}
