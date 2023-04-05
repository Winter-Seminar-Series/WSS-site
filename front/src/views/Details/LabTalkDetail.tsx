import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';
import { useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';
import GoToButton from '../../components/GoToButton';
import FavoriteButton from '../../components/FavoriteButton';
import moment from 'moment';

function LabTalkDetail({
  thisSeries,
  getAnEntityOfModelList,
  labTalks,
  speakers,
  isLoggedIn,
}) {
  const [labTalk, setLabTalk] = useState({
    id: '',
    title: '',
    duration: '',
    start_time: '',
    field: '',
    audience: '',
    head: '',
    tags: [],
    website_link: '',
    poster_picture: '',
  });
  const [head, setHead] = useState({
    picture: '',
    degree: '',
    place: '',
    bio: '',
    name: '',
  });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.LAB_TALKS, thisSeries, id);
  }, [getAnEntityOfModelList]);

  useEffect(() => {
    const labTalk = labTalks.find((lt) => lt.id === +id);
    if (labTalk) {
      setLabTalk(labTalk);
      getAnEntityOfModelList(
        MODEL_LISTS_NAMES.SPEAKERS,
        thisSeries,
        labTalk.head
      );
    }
  }, [labTalks]);

  useEffect(() => {
    const head = speakers.find((s) => s.id === labTalk.head);

    if (head) {
      setHead(head);
    }
  }, [speakers]);

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

                {(labTalk.poster_picture ?? head.picture) && (
                  <img
                    style={{
                      borderRadius: '5px',
                      width: '100%',
                      boxShadow: '0px 6px 12px rgba(0,0,0,.3)',
                      top: '0',
                      position: 'absolute',
                    }}
                    src={`${BASE_URL}/${labTalk.poster_picture ?? head.picture}`}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="col mt-3">
              <div className="d-flex">
                {labTalk && labTalk.id && isLoggedIn && (
                  <FavoriteButton
                    series={thisSeries}
                    type={'labTalk'}
                    id={labTalk.id}
                  />
                )}

                <h2 className="ml-3">{head.name}</h2>
              </div>

              <h5>{`${head.degree}, ${head.place}`}</h5>

              <div className="seminar-details">
                {/*TODO new classes for lab talks*/}
                <i className="fa fa-clock-o">&nbsp;</i>
                {labTalk.duration &&
                  (parseInt(
                    moment(labTalk.duration, 'hh:mm:ss').format(`hh`)
                  ) === 12
                    ? parseInt(
                        moment(labTalk.duration, 'hh:mm:ss').format(`mm`)
                      ) + ' minutes'
                    : parseInt(
                        moment(labTalk.duration, 'hh:mm:ss').format(`hh`)
                      ) *
                        60 +
                      parseInt(
                        moment(labTalk.duration, 'hh:mm:ss').format(`mm`)
                      ) +
                      ' minutes')}
                {/* {!seminar.duration &&  */}
                {/*{'To be announced ...'}*/}
              </div>
              <div className="seminar-details">
                <i className="fa fa-calendar">&nbsp;</i>
                {labTalk.start_time &&
                  moment(labTalk.start_time, 'YYYY-MM-DD hh:mm:ss').format(
                    'dddd, MMMM Do, hh:mm a'
                  )}
                {/* {!seminar.start_time &&  */}
                {/*{'To be announced ...'}*/}
              </div>
              <div className="seminar-details mt-3">
                {isLoggedIn && (
                  <GoToButton
                    type="labtalks"
                    id={labTalk.id}
                    room_name={'labtalk'}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="session-title text-center">{labTalk.title}</h3>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-xs-12 col-lg-8">
              <div className="ts-speaker-session right">
                {labTalk.field && (
                  <>
                    <h4>Lab Field</h4>

                    <div className="mb-3">{labTalk.field}</div>
                  </>
                )}
                {labTalk.audience && (
                  <>
                    <h4>Audience</h4>
                    <div className="mb-3">{labTalk.audience}</div>
                  </>
                )}
                {head.bio && (
                  <>
                    <h4>Bio</h4>
                    <span>{head.bio}</span>
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
    labTalks: state.WSS.labtalks,
  };
};

export default connect(mapStateToProps, {
  getAnEntityOfModelList,
})(LabTalkDetail);
