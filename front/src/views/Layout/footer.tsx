import React from 'react';

function Footer() {
  const socialAccounts: SocialAccount[] = [];
  return (
    <footer className="text-white footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-logo d-flex justify-content-center align-items-end">
              <a href="\">
                <img src="images/logo.png" alt="wss logo" width="100" />
              </a>
              <a href="http://ssc.ce.sharif.edu">
                <img
                  src="images/SSC-logo-white.png"
                  alt="ssc logo"
                  width="100"
                />
              </a>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="footer-social d-flex justify-content-center justify-content-sm-start">
                  <ul>
                    {socialAccounts.map((s) => (
                      <li key={s.title}>
                        <a href={s.link}>
                          <i
                            className={'social-icon text-white fa fa-' + s.icon}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-auto copyright-info">
              <span>
                <a href="\staff-list#front">Website Creators</a>
                <br />
                Copyright © 2015-2020 WSS. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
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
