import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info'
import { useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';
import moment from 'moment'
import { THIS_YEAR } from '../../constants/info'
import GoToButton from "../../components/GoToButton";

function SeminarDetail({
  getAnEntityOfModelList,
  seminars,
  speakers,
  isLoggedIn,
  isRegistered,
}) {
  const [seminar, setSeminar] = useState({ id: '', title: '', duration: '', start_time: '', abstract: '', audience: '', speaker: '', tags: [] });
  const [speaker, setSpeaker] = useState({ picture: '', degree: '', place: '', bio: '', name: '' });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.SEMINARS, THIS_YEAR, id);
  }, [getAnEntityOfModelList])

  useEffect(() => {
    if (!!seminars.find(s => s.id == id)) {
      const seminar = seminars.find(s => s.id == id);
      setSeminar(seminar);
      getAnEntityOfModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR, seminar.speaker);
    }
  }, [seminars])

  useEffect(() => {
    if (!!speakers.find(s => s.id == seminar.speaker)) {
      setSpeaker(speakers.find(s => s.id === seminar.speaker))
    }
  }, [speakers])

  return (
    <section id="main-container" className="main-container">
      <div style={{ marginTop: '-15rem', height: '15rem' }} className="diagonal blue-gradient" />
      <div className="container-fluid px-sm-5 mt-5 diagonal" style={{ background: 'white' }}>
        <div className="container">
          <div className="row pt-5">
            {speaker.picture &&
              <div className="col-md-4 m-0">
                <img style={{ borderRadius: '5px', width: '100%', boxShadow: '2px -2px 5px gray' }} src={`${BASE_URL}/${speaker.picture}`} alt='' />
              </div>
            }
            <div className="col mt-4 d-flex align-items-center">
              <div className="row">
                <div className="col">
                  <h4>{speaker.name}</h4>
                  <h6>{`${speaker.degree}, ${speaker.place}`}</h6>
                  <h3 className="session-title">{seminar.title}</h3>
                  <div className="seminar-details">
                    <i className="fa fa-clock-o">&nbsp;</i>
                    {seminar.duration && (
                      parseInt(moment(seminar.duration, "hh:mm:ss").format(`hh`)) === 12
                        ? parseInt(moment(seminar.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                        : parseInt(moment(seminar.duration, "hh:mm:ss").format(`hh`)) * 60 + parseInt(moment(seminar.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                    )}
                    {!seminar.duration && (
                      'To be announced ...'
                    )}
                  </div>
                  <div className="seminar-details">
                    <i className="fa fa-calendar">&nbsp;</i>
                    {seminar.start_time && (
                      moment(seminar.start_time, "YYYY-MM-DD hh:mm:ss").format("dddd, MMMM Do, hh:mm a")
                    )}
                    {!seminar.start_time && (
                      'To be announced ...'
                    )}
                  </div>
                  <div className="seminar-details mt-3">
                    { isLoggedIn && isRegistered && (
                      <GoToButton
                        type="seminars"
                        id={seminar.id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xs-12 col-md-8">
              <div className="ts-speaker-session right">
                {seminar.abstract &&
                  <>
                    <h4>Abstract</h4>

                    <div className="mb-3">
                      {seminar.abstract}
                    </div>
                  </>
                }
                {seminar.audience &&
                  <>
                    <h4>Audience</h4>
                    <div className="mb-3">
                      {seminar.audience}
                    </div>
                  </>
                }
                {speaker.bio &&
                  <>
                    <h4>Bio</h4>
                    <span>
                      {speaker.bio}
                    </span>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return ({
    isFetching: state.WSS.isFetching,
    isLoggedIn: state.account.isLoggedIn,
    speakers: state.WSS.speakers,
    seminars: state.WSS.seminars,
    isRegistered: state.Participant,
  })
}

export default connect(
  mapStateToProps,
  {
    getAnEntityOfModelList,
  }
)(SeminarDetail);
