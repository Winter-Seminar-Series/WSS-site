import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Redirect, Link, useParams } from 'react-router-dom';
import {
  getAnEntityOfModelList,
  getModelList,
  getModelListCount,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';

let global_id;

function SeminarDetail({
  getAnEntityOfModelList,
  duration,
  speaker,
  place = 'sharif',
  picture = 'https://WSS.ce.sharif.edu/media/human_pictures/moshiri.jpg',
  name = 'Seyyed Alireza Hashemi',
  degree = 'Master',
  title = 'How to fail an event!',
  date = 'Monday, 24 December 2018',
  start_time = '16:30',
  abstract = 'faile Agha faile!',
  bio = 'Majid Abdollahkhani is an enterprise architect with over 16 years of experience in core banking and FinTech industry fields. He is graduated of Computer Science (information technology) and master of business administration. He joined TOSAN 12 years ago and participated in production and implementation of many banking projects as business and framework developer and later on as software architect and manager, now he is manager of digital banking strategic business unit. He is in charge of implementing the first fully Digital Bank Platform in TOSAN.',
}) {
  const { t } = useTranslation('cardDescription', { useSuspense: false });
  const id = useParams()['id'];
  global_id = id;

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.SEMINARS, 2020, id);
  }, [getAnEntityOfModelList])

  useEffect(() => {
    if (speaker) {
      getAnEntityOfModelList(MODEL_LISTS_NAMES.SPEAKERS, 2020, speaker);
    }
  }, [speaker])

  return (
    <section id="main-container" className="main-container">
      <div style={{ marginTop: '-15rem', height: '15rem' }} className="diagonal blue-gradient" />
      <div className="container-fluid px-sm-5 mt-5 diagonal" style={{ background: 'white' }}>
        <div className="container">
          <div className="row pt-5">
            {picture &&
              <div className="col-md-4 m-0">
                <img style={{ borderRadius: '5px', width: '100%', boxShadow: '2px -2px 5px gray' }} src={picture} alt='dd' />
              </div>
            }
            <div className="col mt-4 d-flex align-items-center">
              <div className="row">
                <div className="col">
                  <h4>{name}</h4>
                  <h6>{`${degree}, ${place}`}</h6>
                  <h3 className="session-title">{title}</h3>
                  <div className="seminar-details">
                    <i className="fa fa-clock-o">&nbsp;</i>
                    {date}
                  </div>
                  <div className="seminar-details">
                    <i className="fa fa-calendar">&nbsp;</i>
                    {start_time}
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
                  {abstract}
                </div>
                <h4>Bio</h4>
                <span>
                  {bio}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  const seminar = state.WSS.seminars
    ? state.WSS.seminars[global_id]
    : {};

  const { title, start_time, duration, abstract, speaker } = seminar;

  const speakerObject = state.WSS.speakers && speaker
    ? state.WSS.speakers[speaker]
    : {};

  const { bio, degree, name, picture, place } = speakerObject;

  return ({
    isFetching: state.WSS.isFetching,
    isLoggedIn: state.WSS.isLoggedIn,
    title, start_time, duration, abstract, bio, degree, name, picture, place,
  })
}

export default connect(
  mapStateToProps,
  {
    getAnEntityOfModelList,
    getModelList,
  }
)(SeminarDetail);
