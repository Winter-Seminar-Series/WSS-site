import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation('header', { useSuspense: false });
  const navbarItems: NavBarItem[] = [
    { title: 'WSS 2020', persianTitle: 'WSS 2020', link: '/' },
    {
      title: 'Information',
      persianTitle: 'اطلاعات',
      link: '#',
      children: [
        { title: 'About Us', persianTitle: 'درباره ما', link: '/about' },
        { title: 'Details', persianTitle: 'اطلاعات', link: '/details' },
      ],
    },
    { title: 'Speakers', persianTitle: 'سخنران‌ها', link: '/speakers' },
    { title: 'Workshops', persianTitle: 'کارگاه‌ها', link: '/workshop-list' },
    { title: 'Seminars', persianTitle: 'سمینار‌ها', link: '/seminar-list' },
    {
      title: 'Poster Sessions',
      persianTitle: 'پوستر‌ها',
      link: '/poster-session-list',
    },
    { title: 'Schedule', persianTitle: 'برنامه زمانی', link: '/schedule' },
    { title: 'Staff', persianTitle: 'استف', link: '/staff-list' },
    {
      title: 'Sign Up',
      persianTitle: 'ثبت‌نام',
      link: '/signup',
      style: 'active',
    },
  ];
  return (
    <header id="header">
      <div className="container"></div>
      <nav className="navbar navbar-expand-xl navbar-dark w-100 z-index-master">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="images/logo.png" height="40" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#wss-navbar"
            aria-controls="wss-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="wss-navbar">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              {navbarItems.map((i) =>
                i.children ? (
                  <li key={i.title} className="nav-item dropdown">
                    <a
                      href={i.link}
                      className={`nav-link dropdown-toggle ${i.style || ''}`}
                      data-toggle="dropdown">
                      {i.title}
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      {i.children.map((c) => (
                        <li>
                          <a className="dropdown-item" href={c.link}>
                            {c.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={i.title} className={`nav-item ${i.style || ''}`}>
                    <a className="nav-link" href={i.link}>
                      {i.title}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

interface NavBarItem {
  title: string;
  persianTitle: string;
  link: string;
  style?: string;
  children?: {
    title: string;
    persianTitle: string;
    link: string;
  }[];
}
