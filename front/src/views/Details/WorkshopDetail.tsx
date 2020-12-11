import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants/info'
import {
  getAnEntityOfModelList,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';
import moment from 'moment'
import { THIS_YEAR } from '../../constants/info'

function WorkshopDetail({
  getAnEntityOfModelList,
  workshops,
  speakers,
}) {
  const [workshop, setWorkshop] = useState({ title: '', duration: '', start_time: '', syllabus: '', price: '', speaker: '', tags: [] });
  const [speaker, setSpeaker] = useState({ picture: '', degree: '', place: '', bio: '', name: '' });
  const id = useParams()['id'];

  useEffect(() => {
    getAnEntityOfModelList(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR, id);
  }, [getAnEntityOfModelList])

  useEffect(() => {
    if (!!workshops.find(s => s.id == id)) {
      const workshop = workshops.find(s => s.id == id);
      setWorkshop(workshop);
      getAnEntityOfModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR, workshop.speaker);
    }
  }, [workshops])

  useEffect(() => {
    if (!!speakers.find(s => s.id == workshop.speaker)) {
      setSpeaker(speakers.find(s => s.id === workshop.speaker))
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
                  <h3 className="session-title">{workshop.title}</h3>
                  <div className="seminar-details">
                    <i className="fa fa-clock-o">&nbsp;</i>
                    {
                      parseInt(moment(workshop.duration, "hh:mm:ss").format(`hh`)) === 12
                        ? parseInt(moment(workshop.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                        : parseInt(moment(workshop.duration, "hh:mm:ss").format(`hh`)) * 60 + parseInt(moment(workshop.duration, "hh:mm:ss").format(`mm`)) + " minutes"
                    }
                  </div>
                  <div className="seminar-details">
                    <i className="fa fa-calendar">&nbsp;</i>
                    {moment(workshop.start_time, "YYYY-MM-DD hh:mm:ss").format("dddd, MMMM Do, hh:mm a")}
                  </div>
                  <div className="seminar-details">
                    <i className="fa fa-credit-card">&nbsp;</i>
                    {`${workshop.price} Tomans`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xs-12 col-md-8">
              <div className="ts-speaker-session right">
                <h4>Syllabus</h4>
                <div className="mb-3">
                  {workshop.syllabus}
                </div>
                <h4>Bio</h4>
                <span>
                  {speaker.bio}
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
  return ({
    isFetching: state.WSS.isFetching,
    isLoggedIn: state.WSS.isLoggedIn,
    speakers: state.WSS.speakers,
    workshops: state.WSS.workshops,
  })
}

export default connect(
  mapStateToProps,
  {
    getAnEntityOfModelList,
  }
)(WorkshopDetail);
