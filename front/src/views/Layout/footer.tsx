import React from 'react';

function Footer() {
  const footerStyle = {
    marginTop: '4.75rem',
  };
  return (
    <footer
      id="footer"
      className="text-white footer text-center diagonal blue-gradient pt-5"
      style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-logo">
              <a href="{{ SITE_URL }}">
                <img
                  src="images/WSS-2018-logo-white.png"
                  alt="footer logo"
                  width="100"
                />
              </a>
              <a href="http://ssc.ce.sharif.edu">
                <img
                  src="images/SSC-logo-white.png"
                  alt="footer logo"
                  width="100"
                />
              </a>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="footer-social d-flex justify-content-center justify-content-sm-start">
                  <ul>
                    <li>
                      <a href="{{ external_link.url }}">
                        <i className="social-icon text-white fa fa-{{ external_link.type }}" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-auto copyright-info">
              <span>
                <a href="{% url 'people:creators-list' %}">Website Creators</a>
                <br />
                Copyright © 2015-2019 WSS. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
