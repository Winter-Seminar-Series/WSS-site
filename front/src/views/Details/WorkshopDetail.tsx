import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/info';
import {
  getAnEntityOfModelList,
  getWSSPrimitiveFields,
  MODEL_LISTS_NAMES,
  getModelList,
} from '../../redux/actions/WSS';
import {
  registerWorkshop,
  cancelWorkshopRegistration,
  getRegisteredWorkshops,
} from '../../redux/actions/participant';
import moment from 'moment';
import GoToButton from '../../components/GoToButton';

function WorkshopDetail({
  thisSeries,
  getWSSPrimitiveFields,
  getAnEntityOfModelList,
  getModelList,
  workshops,
  speakers,
  registerWorkshop,
  cancelWorkshopRegistration,
  getRegisteredWorkshops,
  registeredWorkshops,
  isLoggedIn,
  isFetchingForRegistration,
  isWorkshopRegistrationOpen,
  streams,
}) {
  const [workshop, setWorkshop] = useState({
    id: '',
    title: '',
    duration: '',
    start_time: '',
    syllabus: '',
    price: '',
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
  const [stream, setStream] = useState({
    stream_room: {
      url: '',
    }
  });
  const [isRegisteredInWorkshop, setRegistrationStatus] = useState(false);
  const id = useParams()['id'];

  useEffect(() => {
    getWSSPrimitiveFields(thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.WORKSHOPS, thisSeries, id);
    getRegisteredWorkshops(thisSeries);
  }, [getAnEntityOfModelList]);

  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STREAMS, thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
    if (workshops.find((s) => s.id === id)) {
      const workshop = workshops.find((w) => w.id === id);
      setWorkshop(workshop);
      getAnEntityOfModelList(
        MODEL_LISTS_NAMES.SPEAKERS,
        thisSeries,
        workshop.speaker
      );
    }
  }, [workshops]);

  useEffect(() => {
    if (registeredWorkshops && registeredWorkshops.find((w) => w.id === id)) {
      setRegistrationStatus(true);
    } else {
      setRegistrationStatus(false);
    }
  }, [registeredWorkshops]);

  useEffect(() => {
    if (speakers.find((s) => s.id === workshop.speaker)) {
      setSpeaker(speakers.find((s) => s.id === workshop.speaker));
    }
  }, [speakers]);

  useEffect(() => {
    const stream = streams.find((s) => s.id === workshop.id);

    if (stream) {
      setStream(stream);
    }
  }, [streams]);

  return (
    <section id="main-container" className="main-container">
      <div
        style={{ marginTop: '-15rem', height: '12rem' }}
        className="diagonal blue-gradient"
      />
      <div className="container-fluid px-sm-5" style={{ marginTop: '-3rem' }}>
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
              <h2>{speaker.name}</h2>
              <h5>{`${speaker.degree}, ${speaker.place}`}</h5>
              <div className="seminar-details">
                <i className="fa fa-clock-o">&nbsp;</i>
                {workshop.duration &&
                  (parseInt(
                    moment(workshop.duration, 'hh:mm:ss').format(`hh`)
                  ) === 12
                    ? parseInt(
                        moment(workshop.duration, 'hh:mm:ss').format(`mm`)
                      ) + ' minutes'
                    : parseInt(
                        moment(workshop.duration, 'hh:mm:ss').format(`hh`)
                      ) *
                        60 +
                      parseInt(
                        moment(workshop.duration, 'hh:mm:ss').format(`mm`)
                      ) +
                      ' minutes')}
                {!workshop.duration && 'To be announced ...'}
              </div>
              <div className="seminar-details">
                <i className="fa fa-calendar">&nbsp;</i>
                {workshop.start_time &&
                  moment(workshop.start_time, 'YYYY-MM-DD hh:mm:ss').format(
                    'dddd, MMMM Do, hh:mm a'
                  )}
                {!workshop.start_time && 'To be announced ...'}
              </div>
              {isLoggedIn && (
                <div className="seminar-details mt-3">
                  {isLoggedIn && stream?.stream_room?.url && (
                  <a
                    href={stream.stream_room.url}
                    target="_blank"
                    className="btn btn-lg btn-primary mb-2 mt-3">
                    Attend
                  </a>
                )}
                  {isWorkshopRegistrationOpen && !isRegisteredInWorkshop && (
                    <button
                      disabled={isFetchingForRegistration}
                      onClick={() => registerWorkshop(thisSeries, id)}
                      className="btn btn-primary btn-blue">
                      Register Now For Free
                      <br />
                      <span style={{ fontSize: '10px' }}>
                        (Limited capacity)
                      </span>
                    </button>
                  )}
                  {isWorkshopRegistrationOpen && isRegisteredInWorkshop && (
                    <button
                      disabled={isFetchingForRegistration}
                      onClick={() => cancelWorkshopRegistration(thisSeries, id)}
                      className="btn btn-outline-primary btn-lg">
                      Cancel Registration
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="session-title text-center">{workshop.title}</h3>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-xs-12 col-lg-8">
              <div className="ts-speaker-session right">
                {workshop.syllabus && (
                  <>
                    <h4>Syllabus</h4>
                    <div className="mb-3">{workshop.syllabus}</div>
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
    workshops: state.WSS.workshops,
    streams: state.WSS.streams,
    registeredWorkshops: state.Participant.registeredWorkshops,
    isFetchingForRegistration: state.Participant.isFetching,
    isWorkshopRegistrationOpen: state.WSS.isWorkshopRegistrationOpen,
  };
};

export default connect(mapStateToProps, {
  getModelList,
  getWSSPrimitiveFields,
  getAnEntityOfModelList,
  registerWorkshop,
  cancelWorkshopRegistration,
  getRegisteredWorkshops,
})(WorkshopDetail);
