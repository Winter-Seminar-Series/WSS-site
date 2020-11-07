import React from 'react';

const fontStyle = {
  fontSize: '1.125rem',
};

const bannerPadding = {
  padding: '4rem 0',
};

const margin60 = {
  marginBottom: '60px',
};

const mb20mt0 = {
  marginBottom: '20px',
  marginTop: '0px',
};

const noBorder = {
  border: '0',
};

const sectionSubtitleStyle: { position: 'relative'; top: string } = {
  position: 'relative',
  top: '-2rem',
};

const venueMapStyle = {
  minHeight: '30rem',
  backgroundPositionY: 'center !important',
};

function Home() {
  return (
    <>
      <section id="banner">
        <div className="diagonal banner-item d-flex h-100">
          <div className="header-video-wrapper">
            <video autoPlay loop muted>
              <source src="images/back-min.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container my-auto">
            <div className="banner-content ">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center">
                  <div className="row mb-3">
                    <div className="col">
                      <img className="w-100" src="images/new_title_hq.png" />
                      <div
                        style={fontStyle}
                        className="row ml-4 mt-1 font-weight-bold text-uppercase d-flex justify-content-around">
                        <div>Winter</div>
                        <div>Seminar</div>
                        <div>Series</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 mt-5 px-4">
                  <h2 className="banner-subtitle2">
                    Advanced Topics in Computer Science and Engineering
                  </h2>
                  <input
                    type="hidden"
                    value="{{ wss.start_date|date:'m/d/Y' }}"
                    id="start-date"
                  />
                  <h2 className="banner-subtitle my-3"></h2>
                  <h3 className="banner-desc">
                    IRAN, TEHRAN, SHARIF UNIVERSITY OF TECHNOLOGY
                  </h3>
                  <p className="banner-btn">
                    <a href="/register" className="btn btn-primary btn-white">
                      Register Now
                    </a>
                  </p>
                  <p className="banner-btn">
                    <a
                      href="{{ wss.proposal_link }}"
                      className="btn btn-primary btn-white">
                      Poster Session Registration
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-programs" className="banner-item diagonal">
        <div className="container">
          <div className="row">
            <h2 className="section-title mx-auto">Programs</h2>
          </div>
          <div className="row">
            <div className="col-11 col-sm-9 col-lg-6 mx-auto">
              <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                  <img
                    className="w-100 h-auto my-auto"
                    src="images/seminar.png"
                  />
                </div>
                <div className="col mr-md-3 d-flex flex-column justify-content-center">
                  <h3>Seminars</h3>
                  <p>
                    Seminars takes place as a two-day event and in each day
                    speakers present their research and ideas. They also share
                    their findings and teach related topics.
                  </p>
                </div>
              </div>
              <div className="row justify-content-sm-start mt-md-5 mb-md-5">
                <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                  <img
                    className="w-100 h-auto my-auto"
                    src="images/poster_session.png"
                  />
                </div>
                <div className="col ml-md-3 d-flex flex-column justify-content-center">
                  <h3>Poster Session</h3>
                  <p>
                    The Poster Session advertises your research. For the first
                    time, WSS has attempted to create an opportunity for
                    researchers who have achievements to meet others and engage
                    with them, and build networks.
                  </p>
                </div>
              </div>
              <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">
                <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                  <img
                    className="w-100 h-auto my-auto"
                    src="images/workshop.png"
                  />
                </div>
                <div className="col mr-md-3 d-flex flex-column justify-content-center">
                  <h3>Workshops</h3>
                  <p>
                    Workshops are long form educational opportunities about
                    technology or scientific subjects presented by the best
                    experts our industry has to offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="general-btn text-center mx-auto">
              <a className="btn btn-primary all-speakers" href="/about">
                More About WSS
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ts-speakers-main"
        className="banner-item  diagonal blue-gradient"
        style={bannerPadding}>
        <div className="container">
          <div className="row text-center">
            <h3 className="section-sub-title title-white mx-auto">
              Keynote Speakers
            </h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-xs-11 col-sm-6 col-lg-3"></div>
          </div>
          <br />
          <div className="row text-center">
            <h3 className="section-sub-title title-white mx-auto">Speakers</h3>
          </div>
          <div className="row justify-content-center">
            <div className="col-xs-11 col-sm-6 col-lg-3"></div>
          </div>
        </div>

        <div className="row">
          <div className="general-btn text-center mx-auto">
            <a
              className="btn btn-primary btn-white"
              href="{% url 'wss:seminars-list' wss.year %}">
              View All Speakers
            </a>
          </div>
        </div>
      </section>

      <section id="ts-statics" className="z-1 ts-statics diagonal">
        <div className="container py-4">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-2 text-center">
              <a data-scroll href="{% url 'wss:seminars-list' wss.year %}">
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">10</span>
                    </h2>
                    <h3 className="ts-facts-title">Seminars</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-sm-2 text-center">
              <a data-scroll href="{% url 'wss:workshops-list' wss.year %}">
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">12</span>
                    </h2>
                    <h3 className="ts-facts-title"> Workshops</h3>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-sm-2 text-center">
              <a
                data-scroll
                href="{% url 'wss:postersessions-list' wss.year %}">
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">18</span>
                    </h2>
                    <h3 className="ts-facts-title">Poster Presenters</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-sm-2 text-center">
              <div className="ts-facts">
                <div className="ts-facts-content">
                  <h2 className="ts-facts-num">
                    <span className="counterUp">500</span>
                  </h2>
                  <h3 className="ts-facts-title">Participants</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-sponsors" className="ts-sponsors diagonal pt-0">
        <div className="container">
          <p className="section-sub-title">Event Sponsors</p>
          <div className="row text-center d-flex align-items-center">
            <h3 className="sponsor-title mb-5">Main sponsers</h3>
            <div className="col-xs-12 col-sm-4 col-md-2 align-center">
              <a href="{{ sponsorship.sponsor.url }}">
                <img
                  className="mw-100 img-responsive"
                  src="{{ sponsorship.logo_url }}"
                  alt=""
                />
              </a>
              <a href="{{ sponsorship.sponsor.url }}">
                <h2 className="intro-title" style={margin60}>
                  sponsorship.sponsor.name
                </h2>
              </a>
            </div>
          </div>
          <div className="row text-center ">
            <h3 className="sponsor-title" style={margin60}>
              Other Sponsors
            </h3>
            <div className="col-xs-12 col-sm-4 col-md-4 align-center">
              <a
                href="{{ sponsorship.sponsor.url }}"
                className="sponsor-logo"
                style={mb20mt0}>
                <img
                  className="img-responsive"
                  src="sponsorship.logo_url"
                  width="630"
                  height="265"
                  alt=""
                />
              </a>
              <a href="{{ sponsorship.sponsor.url }}">
                <h2 className="intro-title" style={margin60}>
                  sponsorship.sponsor.name
                </h2>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="venu-map no-padding diagonal blue-gradient h-100 pb-2"
        style={venueMapStyle}>
        <div className="container">
          <h3 className="section-sub-title" style={sectionSubtitleStyle}>
            WSS Venue
          </h3>
        </div>
        <div className="container mt-4 mb-5">
          <div className="row mb-5">
            <div className="col-md-6">
              <div className="white">
                <p>Sharif University of Technology </p>
                <p>Azadi Street, District 2, Tehran, Iran</p>
                <br />
                <p>wss@ce.sharif.edu</p>
                <p>+98(021) 66 16 57 81</p>
              </div>
            </div>
            <div className="col-md-6 map">
              <iframe
                style={noBorder}
                className="embed-responsive-item"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6479.848007952863!2d51.3476417!3d35.7034877!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a8bc1a7e63%3A0x61a5a909b878501!2sSharif+University+of+Technology!5e0!3m2!1sen!2s!4v1564664895486!5m2!1sen!2s"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={undefined}></iframe>
            </div>
          </div>
          <h3 className="section-sub-title text-white">Organizer</h3>

          <p className="font-italic white">
            The event is held by the Student Scientific Chapter (SSC) of
            Computer Engineering Department of Sharif University of Technology
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
