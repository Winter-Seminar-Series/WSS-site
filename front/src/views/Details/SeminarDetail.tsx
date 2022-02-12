import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';
import { useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';
import moment from 'moment';
import GoToButton from '../../components/GoToButton';
import FavoriteButton from '../../components/FavoriteButton';

function SeminarDetail({
  thisSeries,
  getAnEntityOfModelList,
  seminars,
  speakers,
  isLoggedIn,
}) {
  const [seminar, setSeminar] = useState({
    id: '',
    title: '',
    duration: '',
    start_time: '',
    abstract: '',
    audience: '',
    speaker: '',
    tags: [],
  });
  const [speaker, setSpeaker] = useState({
    picture: '',
    degree: '',
    place: '',
    bio: '',
    name: '',
  });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.SEMINARS, thisSeries, id);
  }, [getAnEntityOfModelList]);

  useEffect(() => {
    const seminar = seminars.find((s) => s.id === id);
    if (seminar) {
      setSeminar(seminar);
      getAnEntityOfModelList(
        MODEL_LISTS_NAMES.SPEAKERS,
        thisSeries,
        seminar.speaker
      );
    }
  }, [seminars]);

  useEffect(() => {
    if (speakers.find((s) => s.id === seminar.speaker)) {
      setSpeaker(speakers.find((s) => s.id === seminar.speaker));
    }
  }, [speakers]);

  debugger

  return (
    <section id="main-container" className="main-container">
      <div
        style={{ marginTop: '-15rem', height: '12rem' }}
        className="diagonal blue-gradient"
      />
      <div className="container-fluid px-sm-3" style={{ marginTop: '-3rem' }}>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-6 col-lg-4 m-0">
              <div
                style={{
                  width: '100%',
                  paddingTop: '100%',
                  position: 'relative',
                  backgroundColor: 'rgba(0,0,0,.1)',
                  borderRadius: '5px',
                }}>
                {speaker.picture && (
                  <img
                    style={{
                      borderRadius: '5px',
                      width: '100%',
                      boxShadow: '0px 6px 12px rgba(0,0,0,.3)',
                      top: '0',
                      position: 'absolute',
                    }}
                    src={`${BASE_URL}/${speaker.picture}`}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="col mt-3">
              <div className="d-flex">
                {seminar && seminar.id && isLoggedIn && (
                  <FavoriteButton
                    series={thisSeries}
                    type={'seminar'}
                    id={seminar.id}
                  />
                )}

                <h2 className="ml-3">{speaker.name}</h2>
              </div>

              <h5>{`${speaker.degree}, ${speaker.place}`}</h5>

              <div className="seminar-details">
                <i className="fa fa-clock-o">&nbsp;</i>
                {seminar.duration &&
                  (parseInt(
                    moment(seminar.duration, 'hh:mm:ss').format(`hh`)
                  ) === 12
                    ? parseInt(
                      moment(seminar.duration, 'hh:mm:ss').format(`mm`)
                    ) + ' minutes'
                    : parseInt(
                      moment(seminar.duration, 'hh:mm:ss').format(`hh`)
                    ) *
                    60 +
                    parseInt(
                      moment(seminar.duration, 'hh:mm:ss').format(`mm`)
                    ) +
                    ' minutes')}
                {!seminar.duration && 'To be announced ...'}
              </div>
              <div className="seminar-details">
                <i className="fa fa-calendar">&nbsp;</i>
                {seminar.start_time &&
                  moment(seminar.start_time, 'YYYY-MM-DD hh:mm:ss').format(
                    'dddd, MMMM Do, hh:mm a'
                  )}
                {!seminar.start_time && 'To be announced ...'}
              </div>
              <div className="seminar-details mt-3">
                {isLoggedIn && (
                  <GoToButton type="seminars" id={seminar.id} />
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="session-title text-center">{seminar.title}</h3>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-xs-12 col-lg-8">
              <div className="ts-speaker-session right">
                {seminar.abstract && (
                  <>
                    <h4>Abstract</h4>

                    <div className="mb-3">{seminar.abstract}</div>
                  </>
                )}
                {seminar.audience && (
                  <>
                    <h4>Audience</h4>
                    <div className="mb-3">{seminar.audience}</div>
                  </>
                )}
                {speaker.bio && (
                  <>
                    <h4>Bio</h4>
                    <span>{speaker.bio}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    thisSeries: state.account.thisSeries,
    isFetching: state.WSS.isFetching,
    isLoggedIn: state.account.isLoggedIn,
    speakers: state.WSS.speakers,
    seminars: state.WSS.seminars,
  };
};

export default connect(mapStateToProps, {
  getAnEntityOfModelList,
})(SeminarDetail);
