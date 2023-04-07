import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';
import { useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
  getWSSPrimitiveFields,
  getModelList,
} from '../../redux/actions/WSS';
import GoToButton from '../../components/GoToButton';
import FavoriteButton from '../../components/FavoriteButton';
import moment from 'moment';

function RoundTableDetail({
  thisSeries,
  getAnEntityOfModelList,
  getWSSPrimitiveFields,
  getModelList,
  roundTables,
  allSpeakers,
  isLoggedIn,
  streams,
}) {
  const [roundTable, setRoundTable] = useState({
    id: '',
    title: '',
    subject: '',
    duration: '',
    start_time: '',
    field: '',
    audience: '',
    speakers: [],
    tags: [],
    link: '',
    poster_picture: '',
  });
  const [speakers, setSpeakers] = useState([
    {
      picture: '',
      degree: '',
      place: '',
      bio: '',
      name: '',
    },
  ]);
  const [stream, setStream] = useState({
    stream_room: {
      url: '',
    },
  });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.ROUND_TABLES, thisSeries, id);
  }, [getAnEntityOfModelList]);

  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STREAMS, thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
    const roundTable = roundTables.find((lt) => lt.id === +id);
    if (roundTable) {
      setRoundTable(roundTable);
      roundTable.speakers.map((s) =>
        getAnEntityOfModelList(MODEL_LISTS_NAMES.SPEAKERS, thisSeries, s)
      );
      // getAnEntityOfModelList(
      //   MODEL_LISTS_NAMES.SPEAKERS,
      //   thisSeries,
      //   roundTable.head
      // );
    }
  }, [roundTables]);

  useEffect(() => {
    let speakers = allSpeakers.filter((s) =>
      roundTable.speakers.includes(s.id)
    );
    speakers = speakers.filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    });

    if (speakers) {
      setSpeakers(speakers);
    }
  }, [allSpeakers]);

  useEffect(() => {
    const stream = streams.find((s) => s.id === roundTable.id);

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
                }}
              >
                {roundTable.poster_picture && (
                  <img
                    style={{
                      borderRadius: '5px',
                      width: '100%',
                      boxShadow: '0px 6px 12px rgba(0,0,0,.3)',
                      top: '0',
                      position: 'absolute',
                    }}
                    src={`${BASE_URL}/${roundTable.poster_picture}`}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="col mt-3">
              <div className="d-flex">
                {roundTable && roundTable.id && isLoggedIn && (
                  <FavoriteButton
                    series={thisSeries}
                    type={'roundtable'}
                    id={roundTable.id}
                  />
                )}
                <h2 className="ml-3">{roundTable.title}</h2>
              </div>

              <div className="seminar-details">
                {/*TODO new classes for lab talks*/}
                <i className="fa fa-clock-o">&nbsp;</i>
                {roundTable.duration &&
                  (parseInt(
                    moment(roundTable.duration, 'hh:mm:ss').format(`hh`)
                  ) === 12
                    ? parseInt(
                        moment(roundTable.duration, 'hh:mm:ss').format(`mm`)
                      ) + ' minutes'
                    : parseInt(
                        moment(roundTable.duration, 'hh:mm:ss').format(`hh`)
                      ) *
                        60 +
                      parseInt(
                        moment(roundTable.duration, 'hh:mm:ss').format(`mm`)
                      ) +
                      ' minutes')}
                {/* {!seminar.duration &&  */}
                {/*{'To be announced ...'}*/}
              </div>
              <div className="seminar-details">
                <i className="fa fa-calendar">&nbsp;</i>
                {roundTable.start_time &&
                  moment(roundTable.start_time, 'YYYY-MM-DD hh:mm:ss').format(
                    'dddd, MMMM Do, hh:mm a'
                  )}
                {/* {!seminar.start_time &&  */}
                {/*{'To be announced ...'}*/}
              </div>
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-xs-12 col-lg-8">
              <div className="ts-speaker-session right">
                {roundTable.field && (
                  <>
                    <h4>Round Table Field</h4>
                    <div className="mb-3">{roundTable.field}</div>
                  </>
                )}
                {roundTable.audience && (
                  <>
                    <h4>Audience</h4>
                    <div className="mb-3">{roundTable.audience}</div>
                  </>
                )}
                <h2 className="mt-2 mb-5">Panelists</h2>
                {speakers.map((s) => (
                  <div className="mb-4">
                    <h3 className="ml-3">{s.name}</h3>
                    <h5>{`${s.degree}, ${s.place}`}</h5>
                  </div>
                ))}
                {/*head.bio && (
                  <>
                    <h4>Bio</h4>
                    <span>{head.bio}</span>
                  </>
                )*/}
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
    isLoggedIn: state.account.isLoggedIn,
    allSpeakers: state.WSS.speakers,
    roundTables: state.WSS.roundtables,
    streams: state.WSS.streams,
  };
};

export default connect(mapStateToProps, {
  getAnEntityOfModelList,
  getWSSPrimitiveFields,
  getModelList,
})(RoundTableDetail);
