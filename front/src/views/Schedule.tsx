import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { THIS_YEAR } from '../constants/info';
import {
  getWSSPrimitiveFields,
  getModelList,
  MODEL_LISTS_NAMES,
} from '../redux/actions/WSS'
import moment from "moment";
import ScheduleCard from "../components/cards/ScheduleCard";
import {doesUserHaveRegistered} from "../redux/actions/participant";
import {isFavorite} from "../utils/favorites";

function Schedule({
  getWSSPrimitiveFields,
  doesUserHaveRegistered,
  getModelList,
  speakers,
  seminars,
  icalLink,
  calendarLink,
  year,
  isLoggedIn,
  isRegistered,
}) {

  const [seminarsByDate, setSeminarsByDate] = useState({})
  const [favoriteSeminars, setFavoriteSeminars] = useState({})
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [speakersById, setSpeakersById] = useState([])
  const [liveSeminars, setLiveSeminars] = useState([])
  const [liveTimeout, setLiveTimeout] = useState(null)

  useEffect(() => {
    doesUserHaveRegistered(THIS_YEAR);
  }, [doesUserHaveRegistered])

  useEffect(() => {
    getWSSPrimitiveFields(THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.SEMINARS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.SPEAKERS, THIS_YEAR);
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, THIS_YEAR);
  }, [getModelList, getWSSPrimitiveFields])

  useEffect(() => {
    setSeminarsByDate(groupSeminarsByDate())
    getLiveSeminars()
  }, [seminars])

  useEffect(() => {
    setSpeakersById(getSpeakersById())
  }, [speakers])

  useEffect(() => {
    filterSeminarsByFavorite()
  }, [onlyFavorites])

  function getLiveSeminars() {
    setLiveTimeout(null)

    setLiveSeminars(seminars.filter(
      (seminar) => moment().isBetween(
        moment(seminar.start_time, "YYYY-MM-DD hh:mm:ss"),
        moment(seminar.start_time, "YYYY-MM-DD hh:mm:ss").add(moment.duration(seminar.duration))
      )
    ))

    if (!liveTimeout) {

      const liveSeminarTimeout = setTimeout(getLiveSeminars, (60 - new Date().getSeconds()) * 1000)
      setLiveTimeout(liveSeminarTimeout)
    }
  }

  function getSeminars() {
    return onlyFavorites ? favoriteSeminars : seminarsByDate
  }

  // assume that seminars are sorted in the back end side
  function groupSeminarsByDate() {
    return seminars.reduce(
      (data, seminar) => {
        const seminarDate = seminar.start_time.split('T')[0];

        if (data[seminarDate]) {
          data[seminarDate].push(seminar)
        } else {
          data[seminarDate] = [seminar]
        }

        return data
      },
      {},
    )
  }

  function filterSeminarsByFavorite() {
    const favSeminars = Object.keys(seminarsByDate).reduce(
      (favs, date) => {
        const dateFavs = seminarsByDate[date].filter(
          seminar => isFavorite(THIS_YEAR, 'seminar', seminar.id)
        )

        if (dateFavs.length) {
          favs[date] = dateFavs
        }

        return favs
      },
      {}
    )

    setFavoriteSeminars(favSeminars)
  }

  function getSpeakersById() {
    return speakers.reduce(
      (data, speaker) => ({
        ...data,
        [speaker.id]: speaker
      }),
      {}
    )
  }

  const padding40 = {
    padding: "40px 0 0 0"
  }

  const diagonalStyle = {
    marginTop: '-18rem',
    height: '18rem',
  };

  const containerStyle = {
    paddingTop: '10.5rem',
  };

  return (
    <>
      <section id="main-container" className="main-container pb-5">
        <div style={diagonalStyle} className="px-2 pt-4 diagonal background-theme">
          <h2 className="container section-sub-title title-white" style={containerStyle}>
            Schedule
          </h2>
        </div>

        {liveSeminars.length && speakers.length && (
        <>
          <div className="diagonal">
            <div className="container">
              <div className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap my-5 py-5">

                <h3 className="section-sub-title my-0 text-nowrap d-flex align-items-center">
                  <span className="badge badge-danger mr-3">Live</span> Now
                </h3>
              </div>

            </div>
          </div>

          <div id="live-accordion" className="striped">
              <div className="diagonal schedule-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      {liveSeminars.map(seminar => (
                        <ScheduleCard
                          key={`live${seminar.id}`}
                          seminar={seminar}
                          speaker={speakersById[seminar.speaker]}
                          showJoin={isLoggedIn && isRegistered}
                        />
                      ))
                      }

                    </div>
                  </div>
                </div>
                <div className="gap-60" />
              </div>
          </div>
          </>
        )}

        <div className="diagonal">
          <div className="container">
            <div className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap my-5 py-5">

              <div>
                <h3 className="section-sub-title my-0 text-nowrap">
                  WSS { year } Talks
                </h3>

                <div className="form-check">
                  <input
                    checked={onlyFavorites}
                    onChange={(e) => setOnlyFavorites(!onlyFavorites)}
                    className="form-check-input"
                    type="checkbox"
                    id="favoriteCheck"
                  />
                  <label className="form-check-label" htmlFor="favoriteCheck">
                    Show Only Favorites
                  </label>
                </div>
              </div>

              {(calendarLink || icalLink) && (
                <div className="text-center p-3">
                  <div className="btn-group" role="group" aria-label="Add to Calendar">
                    {calendarLink &&
                    <a role="button" href={calendarLink} target="_blank" className="btn btn-blue">
                      Add Events to Calendar
                    </a>
                    }

                    {icalLink &&
                    <a role="button" href={icalLink} target="_blank" className="btn btn-secondary">
                      iCal
                    </a>
                    }
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <div id="accordion" className="striped">
          {!(seminars.length && speakers.length) && (
            <div className="text-center">Loading...</div>
          ) }
          {seminars.length && speakers.length && Object.keys(getSeminars()).map(date => (
              <div key={date} className="diagonal schedule-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="schedule-date">
                        {moment(date," YYYY-MM-DD").format("MMM Do, YYYY")}
                      </h2>
                      {getSeminars()[date].map(seminar => (
                        <ScheduleCard
                          key={seminar.id}
                          seminar={seminar}
                          speaker={speakersById[seminar.speaker]}
                          showJoin={isLoggedIn && isRegistered}
                        />
                      ))
                      }

                    </div>
                  </div>
                </div>
                <div className="gap-60" />
              </div>
          ))}
        </div>

      </section>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  speakers: state.WSS.speakers
    ? state.WSS.speakers
    : [],
  seminars: state.WSS.seminars
    ? state.WSS.seminars
    : [],
  workshops: state.WSS.workshops
    ? state.WSS.workshops
    : [],
  mainImageURL: state.WSS.mainImageURL,
  mainClipURL: state.WSS.mainClipURL,
  bookletURL: state.WSS.bookletURL,
  icalLink: state.WSS.icalLink,
  startDate: state.WSS.startDate,
  endDate: state.WSS.endDate,
  proposalLink: state.WSS.proposalLink,
  calendarLink: state.WSS.calendarLink,
  year: state.WSS.year,
  isLoggedIn: state.account.isLoggedIn,
  isRegistered: state.Participant.isRegistered,
})

export default connect(
  mapStateToProps,
  {
    getWSSPrimitiveFields,
    getModelList,
    doesUserHaveRegistered,
  }
)(Schedule);
