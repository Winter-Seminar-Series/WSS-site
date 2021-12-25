import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setThisYear as doSetThisYear } from '../../redux/actions/account';

const Header = ({ isLoggedIn, thisYear, doSetThisYear }) => {
  const { t } = useTranslation('header', { useSuspense: false });

  const navbarItems: NavBarItem[] = [
    {
      title: 'WSS ' + thisYear,
      persianTitle: 'WSS ' + thisYear,
      link: '/' + thisYear,
      handler: (thisYear: number) => {
        doSetThisYear(thisYear).then(() => {
          window.location.replace(
            window.location.origin +
              `/${thisYear}` +
              window.location.pathname.slice(5)
          );
        });
      },
      children: [
        {
          title: 'WSS 2020',
          persianTitle: 'WSS 2020',
          number: 2020,
        },
        {
          title: 'WSS 2019',
          persianTitle: 'WSS 2019',
          number: 2019,
        },
        {
          title: 'WSS 2018',
          persianTitle: 'WSS 2018',
          number: 2018,
        },
        {
          title: 'WSS 2017',
          persianTitle: 'WSS 2017',
          number: 2017,
        },
        {
          title: 'WSS 2016',
          persianTitle: 'WSS 2016',
          number: 2016,
        },
        {
          title: 'WSS 2015',
          persianTitle: 'WSS 2015',
          number: 2015,
        },
      ],
    },
    {
      title: 'About Us',
      persianTitle: 'درباره ما',
      link: `/${thisYear}/about`,
    },
    {
      title: 'Speakers',
      persianTitle: 'سمینارها',
      link: `/${thisYear}/seminars`,
    },
    {
      title: 'Workshops',
      persianTitle: 'کارگاه‌ها',
      link: `/${thisYear}/workshops`,
    },
    // { title: 'PosterSession', persianTitle: 'پوسترسشن', link: '/postersessions' },
    {
      title: 'Schedule',
      persianTitle: 'برنامه زمانی',
      link: `/${thisYear}/schedule`,
    },
    { title: 'Staff', persianTitle: 'استف‌ها', link: `/${thisYear}/staff` },
    {
      title: 'Create Account',
      persianTitle: 'ثبت‌نام',
      link: `/${thisYear}/create-account`,
      style: 'active',
      loggedIn: 'notAuthorized',
    },
    {
      title: 'Login',
      persianTitle: 'ورود',
      link: `/${thisYear}/login`,
      style: 'active',
      loggedIn: 'notAuthorized',
    },
    {
      title: 'Dashboard',
      persianTitle: 'داشبورد',
      link: `/${thisYear}/dashboard`,
      style: 'active',
      loggedIn: 'authorized',
    },
  ];
  return (
    <header id="header">
      <div className="container"></div>
      <nav className="navbar navbar-expand-xl navbar-dark w-100 z-index-master">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.png" height="40" alt="" />
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
              {navbarItems.map(
                (i) =>
                  (!i.loggedIn ||
                    (i.loggedIn === 'notAuthorized' && !isLoggedIn) ||
                    (i.loggedIn === 'authorized' && isLoggedIn)) &&
                  (i.children ? (
                    <li key={i.title} className="nav-item dropdown">
                      <a
                        href={i.link}
                        className={`nav-link dropdown-toggle ${i.style || ''}`}
                        data-toggle="dropdown">
                        {i.title}
                      </a>
                      <ul className="dropdown-menu" role="menu">
                        {i.children.map((c) => (
                          <li key={c.title}>
                            <a
                              href={c.link}
                              className="dropdown-item"
                              onClick={() => i.handler(c.number)}
                              style={{ cursor: 'pointer' }}>
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
                  ))
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state, ownProps) => ({
  thisYear: state.account.thisYear,
  isLoggedIn: state.account.isLoggedIn,
});

export default connect(mapStateToProps, {
  doSetThisYear,
})(Header);

interface NavBarItem {
  title: string;
  persianTitle: string;
  link: string;
  handler?: any;
  style?: string;
  children?: {
    title: string;
    persianTitle: string;
    link?: string;
    number?: number;
  }[];
  loggedIn?: 'authorized' | 'notAuthorized';
}
