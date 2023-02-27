import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {setThisSeries as doSetThisSeries} from '../../redux/actions/account';

const Header = ({isLoggedIn, thisSeries, doSetThisSeries}) => {
    const {t} = useTranslation('header', {useSuspense: false});

    const navbarItems: NavBarItem[] = [
        {
            title: `${thisSeries} WSS`,
            persianTitle: `${thisSeries} WSS`,
            link: '/',
            handler: (thisSeries: string) => {
                doSetThisSeries(thisSeries).then(() => window.location.reload());
            },
            children: [
                {
                    title: '8th Series',
                    persianTitle: '8th Series',
                    series: '8th',
                },
                {
                    title: '7th Series',
                    persianTitle: '7th Series',
                    series: '7th',
                },
                {
                    title: '6th Series',
                    persianTitle: '6th Series',
                    series: '6th',
                },
                {
                    title: '5th Series',
                    persianTitle: '5th Series',
                    series: '5th',
                },
                {
                    title: '4th Series',
                    persianTitle: '4th Series',
                    series: '4th',
                },
                {
                    title: '3rd Series',
                    persianTitle: '3rd Series',
                    series: '3rd',
                },
                {
                    title: '2nd Series',
                    persianTitle: '2nd Series',
                    series: '2nd',
                },
                {
                    title: '1st Series',
                    persianTitle: '1st Series',
                    series: '1st',
                },
            ],
        },
        {title: 'About Us', persianTitle: 'درباره ما', link: '/about'},
        {title: 'Seminars', persianTitle: 'سمینارها', link: '/seminars'},
        {title: 'Lab Talks', persianTitle: 'ارائه آزمایشگاه', link: '/labtalks'},
        {title: 'Round Tables', persianTitle: 'میزگردها', link: '/roundtables'},
        // {title: 'Sponsor', persianTitle: 'اسپانسر', link: '/sponsor'},
        // { title: 'Speakers', persianTitle: 'سمینارها', link: '/seminars' },
        // { title: 'Opening Ceremony', persianTitle: 'افتتاحیه', link: '/seminar/114' },
        // { title: 'Workshops', persianTitle: 'کارگاه‌ها', link: '/workshops' },
        // { title: 'PosterSession', persianTitle: 'پوسترسشن', link: '/postersessions' },
        // {title: 'Schedule', persianTitle: 'برنامه زمانی', link: '/schedule'},
        {title: 'Staff', persianTitle: 'استف‌ها', link: '/staff'},
        {
            title: 'Sign Up',
            persianTitle: 'ثبت‌نام',
            link: '/create-account',
            style: 'active',
            loggedIn: 'notAuthorized',

        },
        {
            title: 'Login',
            persianTitle: 'ورود',
            link: '/login',
            style: 'active',
            loggedIn: 'notAuthorized',
        },
        {
            title: 'Dashboard',
            persianTitle: 'داشبورد',
            link: '/dashboard',
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
                        <img src="/images/headerlogo.png" height="40" alt=""/>
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
                                    ((!(thisSeries === '8th') ||
                                        (thisSeries ==='8th' &&
                                            !(i.title === 'Staff'))) && (!i.loggedIn ||
                                        (i.loggedIn === 'notAuthorized' && !isLoggedIn) ||
                                        (i.loggedIn === 'authorized' && isLoggedIn)))&&
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
                                                            onClick={() => i.handler(c.series)}
                                                            style={{cursor: 'pointer'}}>
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
    thisSeries: state.account.thisSeries,
    isLoggedIn: state.account.isLoggedIn,
});

export default connect(mapStateToProps, {
    doSetThisSeries,
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
        series?: string;
    }[];
    loggedIn?: 'authorized' | 'notAuthorized';
}