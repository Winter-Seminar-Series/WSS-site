import React from 'react';

function Footer() {
  const socialAccounts: SocialAccount[] = [
    {
      title: 'instagram',
      persianTitle: 'اینستاگرام',
      link: 'https://instagram.com',
      icon: 'instagram',
    },
    {
      title: 'youtube',
      persianTitle: 'اینستاگرام',
      link: 'https://instagram.com',
      icon: 'youtube',
    },
    {
      title: 'facebook',
      persianTitle: 'اینستاگرام',
      link: 'https://instagram.com',
      icon: 'facebook',
    },
    {
      title: 'linkedin',
      persianTitle: 'اینستاگرام',
      link: 'https://instagram.com',
      icon: 'linkedin',
    },
  ];
  return (
    <footer className="text-white footer text-center">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="footer-logo d-flex justify-content-center align-items-end">
            <a href="\">
              <img src="images/logo.png" alt="wss logo" width="100" />
            </a>
            <a href="http://ssc.ce.sharif.edu">
              <img src="images/SSC-logo-white.png" alt="ssc logo" width="100" />
            </a>
          </div>
        </div>

        <div className="col-12 footer-social d-flex justify-content-center">
          <ul>
            {socialAccounts.map((s) => (
              <li key={s.title}>
                <a href={s.link}>
                  <i className={'social-icon text-white fa fa-' + s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto copyright-info">
        <span>
          <a href="\staff-list#front">Website Creators</a>
          <br />
          Copyright © 2015-2020 WSS. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;

interface SocialAccount {
  title: string;
  persianTitle: string;
  link: string;
  icon: string;
}
