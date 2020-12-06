import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PublicCard from '../components/cards/PublicCard';
import {
  getModelList,
  getModelListCount,
  getWSSPrimitiveFields,
  MODEL_LISTS_NAMES,
} from '../redux/actions/WSS';

const fontStyle = {
  fontSize: '1.125rem',
};

const bannerPadding = {
  padding: '4rem 0',
};

const margin60 = {
  marginBottom: '60px',
};

const sectionSubtitleStyle: { position: 'relative'; top: string } = {
  position: 'relative',
  top: '-2rem',
};

const venueMapStyle = {
  minHeight: '30rem',
  backgroundPositionY: 'center !important',
};

function Home({
  getWSSPrimitiveFields,
  getModelList,
  getModelListCount,
  isFetching,
  mainImageURL,
  mainClipURL,
  bookletURL,
  staffCount,
  isActive,
  isRegistrationOpen,
  participantsCount,
  icalLink,
  year,
  startDate,
  proposalLink,
  showStats,
  calendarLink,
}) {
  useEffect(() => {
    getWSSPrimitiveFields(2020);
    getModelList(MODEL_LISTS_NAMES.IMAGES, 2020);
    getModelList(MODEL_LISTS_NAMES.CLIPS, 2020);
    getModelList(MODEL_LISTS_NAMES.HOLDING_TEAMS, 2020);
    getModelList(MODEL_LISTS_NAMES.POSTERSESSIONS, 2020);
    getModelList(MODEL_LISTS_NAMES.SEMINARS, 2020);
    getModelList(MODEL_LISTS_NAMES.SPONSORSHIPS, 2020);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, 2020);

    getModelListCount(MODEL_LISTS_NAMES.IMAGES, 2020);
  }, [getWSSPrimitiveFields]);
  const date = 'JANUARY 2nd - 3rd, 2021';
  const register = false;
  const posterSessionRegister = false;
  const keynoteSpeakers = [
    {
      name: 'Hamed',
      picUrl: '',
      description: 'PhD student, University of Maryland',
    },
    {
      name: 'Zahra Nazari',
      picUrl: '',
      description: 'Research Scientist, Spotify',
    },
    {
      name: 'Hamedh',
      picUrl: '',
      description: 'PhD student, University of Maryland',
    },
  ];
  const speakers = [
    {
      name: 'Hamed S',
      picUrl: '',
      description: 'PhD student, University of Maryland',
    },
    {
      name: 'Zahra Nazari',
      picUrl: '',
      description: 'Research Scientist, Spotify',
    },
    {
      name: 'Hamed Sa',
      picUrl: '',
      description: 'PhD student, University of Maryland',
    },
    {
      name: 'Hamed Sal',
      picUrl: '',
      description: 'PhD student, University of Maryland',
    },
  ];

  const sponser = true;
  const mainSponsers = [
    {
      title: 'googlee',
      url: 'https://www.google.com',
      logo:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
  ];
  const otherSponsers = [
    {
      title: 'google',
      url: 'https://www.google.com',
      logo:
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
  ];
  const videoRef = useRef<HTMLVideoElement>();
  const setVideoPlayBackRate = () => {
    if (!videoRef) return;
    videoRef.current.playbackRate = 0.6;
  };
  return (
    <>
      <section id="banner">
        <div className="banner-item d-flex h-100">
          <div className="header-video-wrapper">
            <video
              autoPlay
              loop
              muted
              ref={videoRef}
              onCanPlay={setVideoPlayBackRate}>
              <source src="images/back-min.mp4?v=1.2" type="video/mp4" />
            </video>
          </div>
          <div className="container my-auto">
            <div className="banner-content ">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex align-items-center">
                  <div className="row mb-3">
                    <div className="col">
                      <img
                        className="w-100"
                        src="images/new_title_hq.png?v=1.4"
                      />
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
                  <h2 className="banner-subtitle2 font-weight-bold">
                    Advanced Topics in Computer Science and Engineering
                  </h2>
                  <h2 className="banner-subtitle my-3 font-weight-bold">
                    {date}
                  </h2>
                  <h3 className="banner-desc font-weight-bold">
                    IRAN, TEHRAN, SHARIF UNIVERSITY OF TECHNOLOGY
                  </h3>
                  {register && (
                    <p className="banner-btn">
                      <a
                        href="{% url 'wss:register' wss.year %}"
                        className="btn btn-primary btn-white">
                        Register Now
                      </a>
                    </p>
                  )}
                  {posterSessionRegister && (
                    <p className="banner-btn">
                      <a
                        href="{{ wss.proposal_link }}"
                        className="btn btn-primary btn-white">
                        Poster Session Registration
                      </a>
                    </p>
                  )}
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
              <a href="/about" className="btn btn-primary all-speakers">
                More About WSS
              </a>
            </div>
          </div>
        </div>
      </section>

      {((keynoteSpeakers && keynoteSpeakers) ||
        (speakers && speakers.length)) && (
        <section
          id="ts-speakers-main"
          className="banner-item  diagonal blue-gradient"
          style={bannerPadding}>
          <div className="container">
            {keynoteSpeakers && keynoteSpeakers.length && (
              <>
                <div className="row text-center">
                  <h3 className="section-sub-title title-white mx-auto font-weight-light">
                    Keynote Speakers
                  </h3>
                </div>
                <div className="row justify-content-center">
                  {keynoteSpeakers.map((s) => (
                    <div key={s.name} className="col-xs-11 col-sm-6 col-lg-3">
                      <PublicCard/>
                    </div>
                  ))}
                </div>
              </>
            )}
            {speakers && speakers.length && (
              <>
                <div className="row text-center">
                  <h3 className="section-sub-title title-white mx-auto font-weight-light">
                    Speakers
                  </h3>
                </div>
                <div className="row justify-content-center">
                  {speakers.map((s) => (
                    <div key={s.name} className="col-xs-11 col-sm-6 col-lg-4">
                      <PublicCard/>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="row">
            <div className="general-btn text-center mx-auto">
              <Link className="btn btn-primary btn-white" to="speakers">
                View All Speakers
              </Link>
            </div>
          </div>
        </section>
      )}

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

      {sponser && (
        <section id="ts-sponsors" className="ts-sponsors diagonal pt-0">
          <div className="container">
            <p className="section-sub-title">Event Sponsors</p>
            {mainSponsers && mainSponsers.length && (
              <div className="row text-center d-flex align-items-center">
                <h3 className="sponsor-title mb-5">Main sponsers</h3>
                {mainSponsers.map((ms) => (
                  <div
                    key={ms.title}
                    className="col-xs-12 col-sm-4 col-md-2 align-center">
                    <a href={ms.url}>
                      <img
                        className="mw-100 img-responsive"
                        src={ms.logo}
                        alt=""
                      />
                    </a>
                    <a href={ms.url}>
                      <h2 className="intro-title" style={margin60}>
                        {ms.title}
                      </h2>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {otherSponsers && otherSponsers.length && (
              <div className="row text-center ">
                <h3 className="sponsor-title" style={margin60}>
                  Other Sponsors
                </h3>
                {otherSponsers.map((ms) => (
                  <div
                    key={ms.title}
                    className="col-xs-12 col-sm-4 col-md-2 align-center">
                    <a href={ms.url}>
                      <img
                        className="mw-100 img-responsive"
                        src={ms.logo}
                        alt=""
                      />
                    </a>
                    <a href={ms.url}>
                      <h2 className="intro-title" style={margin60}>
                        {ms.title}
                      </h2>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section
        className="venu-map no-padding diagonal background-theme h-100 pb-2"
        style={venueMapStyle}>
        <div className="container">
          <h3 className="section-sub-title" style={sectionSubtitleStyle}>
            WSS Venue
          </h3>
        </div>
        <div className="container mt-4 mb-5">
          <h5 className="section-sub-title text-white">Info</h5>
          <div className="row mb-5">
            <div className="col-md-6 font-weight-bold">
              <div className="white">
                <p>Sharif University of Technology </p>
                <p>Azadi Street, District 2, Tehran, Iran</p>
                <br />
                <p>wss@ce.sharif.edu</p>
                <p>+98(021) 66 16 57 81</p>
              </div>
            </div>
          </div>
          <h5 className="section-sub-title text-white">Organizer</h5>
          <p className="font-italic white pb-3">
            The event is held by the Student Scientific Chapter (SSC) of
            Computer Engineering Department of Sharif University of Technology
          </p>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    mainImageURL,
    mainClipURL,
    bookletURL,
    staffCount,
    isActive,
    isRegistrationOpen,
    participantsCount,
    icalLink,
    year,
    startDate,
    proposalLink,
    showStats,
    calendarLink,

    workshops,
    workshops_count,
    seminars,
    seminars_count,
    postersessions,
    postersessions_count,
    sponsorships,
    sponsorships_count,
    clips,
    clips_count,
    holding_teams,
    holding_teams_count,
    images,
    images_count,
  } = state.WSS;
  return {
    isFetching,
    mainImageURL,
    mainClipURL,
    bookletURL,
    staffCount,
    isActive,
    isRegistrationOpen,
    participantsCount,
    icalLink,
    year,
    startDate,
    proposalLink,
    showStats,
    calendarLink,
  };
};

export default connect(mapStateToProps, {
  getWSSPrimitiveFields,
  getModelList,
  getModelListCount,
})(Home);
