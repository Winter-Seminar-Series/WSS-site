import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    {
      title: 'profile',
      persianTitle: 'پروفایل',
      link: '/dashboard/profile',
      icon: 'star',
    },
    {
      title: 'favourites',
      persianTitle: 'علاقه‌مندی‌ها',
      link: '/dashboard/favourites',
      icon: 'star',
    },
  ];
  return (
    <>
      <div className="sidebar">
        {sidebarItems.map((s) => (
          <Link key={s.title} className="sidebar-item" to={s.link}>
            <span className={`icon ml-2 fa fa-${s.icon}`}></span>
            <span>{s.title}</span>
          </Link>
        ))}
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
}
