import React from 'react';

function Footer() {
  const socialAccounts: SocialAccount[] = [
    {
      title: 'instagram',
      persianTitle: 'اینستاگرام',
      link: 'https://instagram.com/wss_sut',
      icon: 'instagram',
    },
    {
      title: 'youtube',
      persianTitle: 'یوتیوب',
      link: 'https://www.youtube.com/channel/UC5-ct_yxHQJTYJP3TkeEDmQ',
      icon: 'youtube',
    },
    {
      title: 'facebook',
      persianTitle: 'فیسبوک',
      link: 'https://www.facebook.com/wss.sharif',
      icon: 'facebook',
    },
    {
      title: 'linkedin',
      persianTitle: 'لینکدین',
      link: 'https://www.linkedin.com/company/wss-sut',
      icon: 'linkedin',
    },
    {
      title: 'twitter',
      persianTitle: 'توییتر',
      link: 'https://twitter.com/WSS_SUT',
      icon: 'twitter',
    },
    {
      title: 'telegram',
      persianTitle: 'تلگرام',
      link: 'https://t.me/wss_sut',
      icon: 'telegram',
    },
  ];
  return (
    <footer className="text-white footer text-center diagonal-up-right">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="footer-logo d-flex justify-content-center align-items-end">
            <a href="\">
              <img src="/images/logo.png" alt="wss logo" width="100" />
            </a>
            <a href="http://ssc.ce.sharif.edu">
              <img
                src="/images/SSC-logo-white.png"
                alt="ssc logo"
                width="100"
              />
            </a>
          </div>
        </div>

        <div className="col-12 footer-social d-flex justify-content-center">
          <ul>
            {socialAccounts.map((s) => (
              <li key={s.title}>
                <a href={s.link} target="_blank">
                  <i className={'social-icon text-white fa fa-' + s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-12 footer-social d-flex justify-content-center">
        <a href="https://divar.ir/">
          <img src="/images/sponsors/Divar.png" alt="ssc logo" width="100" />
        </a>
        <a href="https://partdp.ai/">
          <img src="/images/sponsors/fa-logo.png" alt="ssc logo" width="100" />
        </a>
        <a href="https://quera.ir/">
          <img src="/images/sponsors/quera.png" alt="ssc logo" width="100" />
        </a>
        <a href="https://flightio.com/">
          <img src="/images/sponsors/flightio.png" alt="ssc logo" width="100" />
        </a>
        <a>
          <img
            src="/images/sponsors/MasterFood.png"
            alt="ssc logo"
            width="100"
          />
        </a>
      </div>
      <div className="mx-auto copyright-info">
        <span>
          {/* <a href="\staff-list#front">Website Creators</a> */}
          Copyright © 2015-2023 WSS. All Rights Reserved.
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
