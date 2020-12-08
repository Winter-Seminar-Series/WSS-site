import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Redirect, Link, useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';
import moment from 'moment'
import { THIS_YEAR } from '../../constants/info'

function SeminarDetail({
  getAnEntityOfModelList,
  postersessions,
  speakers,
}) {
  const [postersession, setPostersession] = useState({ title: '', duration: '', start_time: '', abstract: '', speaker: '', tags: [] });
  const [speaker, setSpeaker] = useState({ picture: '', degree: '', place: '', bio: '', name: '' });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.POSTERSESSIONS, THIS_YEAR, id);
  }, [getAnEntityOfModelList])

  useEffect(() => {
    if (postersessions[id]) {
      setPostersession(postersessions[id]);
      getAnEntityOfModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR, postersessions[id].speaker);
    }
  }, [postersessions])

  useEffect(() => {
    if (speakers.find(s => s.id === postersession.speaker)) {
      setSpeaker(speakers.find(s => s.id === postersession.speaker))
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
                <img style={{ borderRadius: '5px', width: '100%', boxShadow: '2px -2px 5px gray' }} src={speaker.picture} alt='' />
              </div>
            }
            <div className="col mt-4 d-flex align-items-center">
              <div className="row">
                <div className="col">
                  <h4>{speaker.name}</h4>
                  <h6>{`${speaker.degree}, ${speaker.place}`}</h6>
                  <h3 className="session-title">{postersession.title}</h3>
                  <div className="seminar-details">
                    <i className="fa fa-clock-o">&nbsp;</i>
                    {
                      parseInt(moment(postersession.duration, "hh:mm:ss").format(`hh`)) === 12
                        ? parseInt(moment(postersession.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                        : parseInt(moment(postersession.duration, "hh:mm:ss").format(`hh`)) * 60 + parseInt(moment(postersession.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                    }
                  </div>
                  <div className="seminar-details">
                    <i className="fa fa-calendar">&nbsp;</i>
                    {moment(postersession.start_time, "YYYY-MM-DD hh:mm:ss").format("dddd, MMMM Do, hh:mm a")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xs-12 col-md-8">
              <div className="ts-speaker-session right">
                <h4>Abstract</h4>
                <div className="mb-3">
                  {postersession.abstract}
                </div>
                {/* <h4>Bio</h4>
                <span>
                  {speaker.bio}
                </span> */}
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
    isLoggedIn: state.WSS.isLoggedIn,
    speakers: state.WSS.speakers,
    postersessions: state.WSS.postersessions,
  })
}

export default connect(
  mapStateToProps,
  {
    getAnEntityOfModelList,
  }
)(SeminarDetail);
