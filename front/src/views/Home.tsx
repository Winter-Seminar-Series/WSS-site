import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { BASE_URL, THIS_YEAR } from '../constants/info';
import moment from 'moment'
import {
  getModelList,
  getModelListCount,
  getWSSPrimitiveFields,
  MODEL_LISTS_NAMES,
} from '../redux/actions/WSS';

const fontStyle = {
  fontSize: '1.125rem',
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
  seminars,
  seminars_count,
  workshops_count,
  speakers_count,
  participantsCount,
  sponsors,
  isFetching,
  mainImageURL,
  mainClipURL,
  bookletURL,
  staffCount,
  isActive,
  isRegistrationOpen,
  year,
  startDate,
  endDate,
}) {
  useEffect(() => {
    getWSSPrimitiveFields(THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.SEMINARS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR);
    getModelListCount(MODEL_LISTS_NAMES.SEMINARS, THIS_YEAR);
    getModelListCount(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR);
    getModelListCount(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR);
  }, [getWSSPrimitiveFields]);
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
                    {startDate && endDate

                      ? moment(startDate, "YYYY-MM-DD").format("MMM Do, YYYY -") + moment(endDate," YYYY-MM-DD").format("MMM Do, YYYY") : ''}

                  </h2>
                  <h3 className="banner-desc font-weight-bold">
                    IRAN, TEHRAN,
                  </h3>
                  <h3 className="banner-desc font-weight-bold">
                    SHARIF UNIVERSITY OF TECHNOLOGY
                  </h3>
                  {isRegistrationOpen && (
                    <p className="banner-btn">
                      <a
                        href="/create-account"
                        className="btn btn-primary btn-white">
                        Register Now
                      </a>
                    </p>
                  )}
                  {/* {posterSessionRegister && (
                    <p className="banner-btn">
                      <a
                        href="{{ wss.proposal_link }}"
                        className="btn btn-primary btn-white">
                        Poster Session Registration
                      </a>
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ts-programs" className="diagonal mb-5">
        <div className="container">
          <div className="row">
            <h2 className="section-title mx-auto">Programs</h2>
          </div>
          <div className="row">
            <div className="col-12 col-sm-9 col-lg-8 mx-auto">
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
              {/* <div className="row justify-content-sm-start mt-md-5 mb-md-5">
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
              </div> */}
              <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">
                <div className="col mr-md-3 d-flex flex-column justify-content-center order-1">
                  <h3>Workshops</h3>
                  <p>
                    Workshops are long form educational opportunities about
                    technology or scientific subjects presented by the best
                    experts our industry has to offer.
                  </p>
                </div>
                <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center order-0 order-md-1">
                  <img
                    className="w-100 h-auto my-auto"
                    src="images/workshop.png"
                  />
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

      {seminars.length > 0 && (
        <section id="ts-speakers-main" className="diagonal blue-gradient my-5">
          <div className="container">
            <div className="row text-center">
              <h3 className="section-sub-title title-white mx-auto font-weight-light">
                Speakers
              </h3>
            </div>
            <div className="row justify-content-center">
              {
                Array.from(Array(seminars.length).keys()).sort(() => Math.random() - 0.5).slice(0, 8)
                  .map((index) =>
                    <div key={index} className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                      <PublicCard id={seminars[index].speaker} presentationLink={'/seminar/' + seminars[index].id} />
                    </div>
                  )
              }
            </div>
          </div>
          <div className="row">
            <div className="general-btn text-center mx-auto">
              <a href="/seminars" className="btn btn-primary btn-white">
                View All Speakers
              </a>
            </div>
          </div>
        </section>
      )
      }

      <section id="ts-statics" className="z-1 ts-statics diagonal my-5">
        <div className="container py-4">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-2 m-2 text-center">
              <a data-scroll>
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">{seminars_count}</span>
                    </h2>
                    <h3 className="ts-facts-title">Seminars</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-sm-2 m-2 text-center">
              <a data-scroll>
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">{workshops_count}</span>
                    </h2>
                    <h3 className="ts-facts-title"> Workshops</h3>
                  </div>
                </div>
              </a>
            </div>

            {/* <div className="col-sm-2 m-2 text-center">
              <a data-scroll>
                <div className="ts-facts">
                  <div className="ts-facts-content">
                    <h2 className="ts-facts-num">
                      <span className="counterUp">{speakers_count}</span>
                    </h2>
                    <h3 className="ts-facts-title">Speakers</h3>
                  </div>
                </div>
              </a>
            </div> */}

            <div className="col-sm-2 m-2 text-center">
              <div className="ts-facts">
                <div className="ts-facts-content">
                  <h2 className="ts-facts-num">
                    <span className="counterUp">{participantsCount}</span>
                  </h2>
                  <h3 className="ts-facts-title">Participants</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {sponsors.length > 0 && (
        <section id="ts-sponsors" className="ts-sponsors diagonal pt-0">
          <div className="container">
            <p className="section-sub-title">
              {sponsors.length === 1 ? 'Event Sponsor' : 'Event Sponsors'}
            </p>
            <div className="row text-center d-flex align-items-center">
              {sponsors.map((s: Sponsor) => (
                <div
                  key={s.id}
                  className="col-xs-12 col-sm-4 col-md-2 align-center">
                  <a href={s.url} target="_blank">
                    <img
                      className="mw-100 img-responsive"
                      src={BASE_URL + s.logo}
                      alt=""
                    />
                  </a>
                  <a href={s.url} target="_blank">
                    <h2 className="intro-title" style={margin60}>
                      {s.name}
                    </h2>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      <section
        className="venu-map no-padding diagonal background-theme h-100 pb-2 mt-1"
        style={venueMapStyle}>
        {/* <div className="container">
          <h3 className="section-sub-title" style={sectionSubtitleStyle}>
            WSS Venue
          </h3>
        </div> */}
        <div className="container pb-5">
          <div className="row my-5">
            <div className="col-md-6 font-weight-bold">
              <h5 className="section-sub-title text-white mb-3 mt-5">Info</h5>
              <div className="white">
                <p>Sharif University of Technology </p>
                <p>Azadi Street, District 2, Tehran, Iran</p>
                <br />
                <p>wss@ce.sharif.edu</p>
                <p>+98(021) 66 16 57 81</p>
              </div>
            </div>

            <div className="col-md-6 font-weight-bold">

              <h5 className="section-sub-title text-white mb-3 mt-5">Organizer</h5>
              <p className="font-italic white pb-3">
                The event is held by the Student Scientific Chapter (SSC) of
                Computer Engineering Department of Sharif University of Technology
              </p>
            </div>
          </div>
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
    endDate,
    proposalLink,
    showStats,
    calendarLink,
    speakers,
    workshops_count,
    seminars_count,
    speakers_count,
    sponsors,
    workshops,
    seminars,
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
    speakers,
    seminars,
    seminars_count,
    workshops_count,
    speakers_count,
    participantsCount,
    sponsors,
    mainImageURL,
    mainClipURL,
    bookletURL,
    staffCount,
    isActive,
    isRegistrationOpen,
    icalLink,
    year,
    startDate,
    endDate,
    proposalLink,
    showStats,
    calendarLink,
  };
};

export default connect(mapStateToProps, {
  getWSSPrimitiveFields,
  getModelList,
  getModelListCount,
})(Home)
