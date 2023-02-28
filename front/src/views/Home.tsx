import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { BASE_URL } from '../constants/info';
import moment from 'moment';
import {
  getModelList,
  getModelListCount,
  getWSSPrimitiveFields,
  MODEL_LISTS_NAMES,
} from '../redux/actions/WSS';
import AboutUs from '../components/AboutUs';
import Particles from 'react-tsparticles';

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

function Home({
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  getModelListCount,
  seminars,
  labTalks,
  roundTables,
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
  series,
  startDate,
  endDate,
}) {
  useEffect(() => {
    getWSSPrimitiveFields(thisSeries);
    getModelList(MODEL_LISTS_NAMES.SEMINARS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
    getModelList(MODEL_LISTS_NAMES.LAB_TALKS, thisSeries);
    getModelListCount(MODEL_LISTS_NAMES.SEMINARS, thisSeries);
    getModelListCount(MODEL_LISTS_NAMES.WORKSHOPS, thisSeries);
    getModelListCount(MODEL_LISTS_NAMES.SPEAKERS, thisSeries);
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
          <div
            className="header-video-wrapper"
            style={{
              backgroundImage: 'url(../images/peak.jpg)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}>
            {/* <Particles
              id="tsparticles"
              url="/particles-config.json"
              init={(main) => {
                return Promise.resolve();
              }}
              loaded={(container) => {
                return Promise.resolve();
              }}
            /> */}
            {/* <video
              autoPlay
              loop
              muted
              ref={videoRef}
              onCanPlay={setVideoPlayBackRate}>
              <source src="images/bg5.jpg" type="video/mp4" />
            </video> */}
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
                      ? moment(startDate, 'YYYY-MM-DD').format(
                          'MMM Do, YYYY -'
                        ) +
                        moment(endDate, ' YYYY-MM-DD').format('MMM Do, YYYY')
                      : ''}
                  </h2>
                  <h3 className="banner-desc font-weight-bold">
                    SHARIF UNIVERSITY OF TECHNOLOGY,
                  </h3>
                  <h3 className="banner-desc font-weight-bold">TEHRAN, IRAN</h3>
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
        <AboutUs />
        <div className="row no-margin">
          <div className="general-btn text-center mx-auto">
            <a href="/about" className="btn btn-primary">
              More About WSS
            </a>
          </div>
        </div>
      </section>

      {/* <div className="purple-background"> */}
      {
        <section
          id="ts-speakers-main"
          className="diagonal-up-right blue-gradient my-5 ">
          <div className="container">
            <div className="row text-center">
              <h3 className="title-white mx-auto font-weight-light speaker-title">
                Seminars
              </h3>
            </div>
            <div className="row justify-content-center">
              {Array.from(Array(seminars.length).keys())
                .sort(() => Math.random() - 0.5)
                .slice(0, 8)
                .map((index) => (
                  <div
                    key={index}
                    className="col-xs-10 col-sm-6 col-lg-3 mt-2 mb-4">
                    <PublicCard
                      id={seminars[index].speaker}
                      presentationLink={'/seminar/' + seminars[index].id}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="row">
            <div className="text-center mx-auto mt-5">
              <a href="/seminars" className="btn btn-primary btn-white">
                View All Seminars
              </a>
            </div>
          </div>
        </section>
      }

      <section
        id="ts-statics"
        className="z-1 ts-statics my-5"
        style={{ paddingTop: '10rem' }}>
        <div className="container py-4">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-2 m-2 text-center">
              <div className="ts-facts">
                <div className="ts-facts-content">
                  <h2 className="ts-facts-num">
                    <span className="counterUp">{seminars_count}</span>
                  </h2>
                  <h3 className="ts-facts-title">Seminars</h3>
                </div>
              </div>
            </div>

            {/* <div className="col-sm-2 m-2 text-center">
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
               <div className="col-sm-2 m-2 text-center">
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
               </div>
               <div className="col-sm-2 m-2 text-center">
                 <div className="ts-facts">
                   <div className="ts-facts-content">
                     <h2 className="ts-facts-num">
                       <span className="counterUp">{participantsCount}</span>
                     </h2>
                     <h3 className="ts-facts-title">Participants</h3>
                   </div>
                 </div>
               </div> */}
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
        className="venu-map no-padding diagonal background-theme h-100 pb-2 large-neg-margin"
        style={{
          minHeight: '30rem',
          backgroundPositionY: 'center !important',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0005',
            transform: 'unset',
          }}></div>
        {/* <div className="container">
            <h3 className="section-sub-title" style={sectionSubtitleStyle}>
              WSS Venue
            </h3>
          </div> */}
        <div className="container pb-5 large-margin">
          <div className="row my-5">
            <div className="col-md-6">
              <h5 className="h1 text-white mb-3 mt-5">Info</h5>
              <div className="white">
                <p className="lead">Sharif University of Technology </p>
                <p className="lead">Azadi Street, District 2, Tehran, Iran</p>
                <br />
                <p className="lead">wss@ce.sharif.edu</p>
                <p className="lead">+98(021) 66 16 57 81</p>
              </div>
            </div>

            <div className="col-md-6 fs-1 white">
              <h5 className="h1 text-white mb-3 mt-5">Organizer</h5>
              <p className="lead pb-3">
                The event is held by the Student Scientific Chapter (SSC) of
                Computer Engineering Department of Sharif University of
                Technology
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <h5 className="section-sub-title text-white mb-3 mt-5">
                  Sponsored by
                </h5>
                <img
                  src="/images/Tapsell_logo_png.png"
                  alt="Image not found!"
                  className="ml-4"
                  style={{ maxWidth: 150, width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
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
    series,
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
    labtalks,
    roundtables,
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
    thisSeries: state.account.thisSeries,
    isFetching,
    speakers,
    seminars,
    labTalks: labtalks,
    roundTables: roundtables,
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
    series,
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
})(Home);
