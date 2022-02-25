import moment from 'moment';
import React from 'react';
import { BASE_URL } from '../../constants/info';
import GoToButton from '../GoToButton';
import FavoriteButton from '../FavoriteButton';
import { connect } from 'react-redux';

function ScheduleCard({
  thisSeries,
  seminar,
  speaker,
  showJoin = false,
  parentId = '#accordion',
}) {
  return (
    <div className="schedule-listing bg">
      {speaker && (
        <div className="row flex-nowrap justify-content-between">
          <div className="d-flex flex-wrap align-items-center">
            <div className="mr-3 mb-3">
              {speaker.picture && (
                <img
                  style={{
                    borderRadius: '5px',
                    width: '80px',
                    height: '80px',
                    boxShadow: '0px 3px 6px rgba(0,0,0,.3)',
                  }}
                  src={`${BASE_URL}/${speaker.picture}`}
                  alt=""
                />
              )}
            </div>

            <div>
              <h5>{speaker.name}</h5>
              {speaker.degree}, {speaker.place}
            </div>
          </div>

          <div className="align-self-start">
            <FavoriteButton
              series={thisSeries}
              type={'seminar'}
              id={seminar.id}
            />
          </div>
        </div>
      )}

      {seminar && speaker && (
        <>
          <div className="row mt-4">
            <h4>{seminar.title}</h4>
          </div>

          <div className="row align-items-center justify-content-between mt-2">
            <div className="py-3 d-flex flex-column flex-sm-row">
              <div>
                <i className="fa fa-clock-o">&nbsp;</i>

                <b>
                  {moment(seminar.start_time, 'YYYY-MM-DD hh:mm:ss').format(
                    'hh:mm a'
                  )}
                </b>
              </div>

              <span className="px-2 d-none d-sm-inline">-</span>

              {moment.duration(seminar.duration).asMinutes() + ' minutes'}
            </div>

            <div className="flex-grow-1 text-right">
              <button
                className="btn btn-link mr-2"
                data-toggle="collapse"
                data-target={`#collapse${seminar.id}`}
                aria-expanded="false"
                aria-controls={`collapse${seminar.id}`}>
                details
              </button>

              {showJoin && (
                <GoToButton
                  type="seminars"
                  id={seminar.id}
                  room_name={seminar.room}
                />
              )}
            </div>
          </div>

          <div
            id={`collapse${seminar.id}`}
            className="collapse"
            data-parent={parentId}>
            <div className="mt-4 pt-4 border-top">
              {seminar.abstract && (
                <>
                  <h5>Abstract</h5>
                  <p>{seminar.abstract}</p>
                </>
              )}

              {seminar.audience && (
                <>
                  <h5>Audience</h5>
                  <p>{seminar.audience}</p>
                </>
              )}

              {speaker.bio && (
                <>
                  <h5>Bio</h5>
                  <p>{speaker.bio}</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  thisSeries: state.account.thisSeries,
  seminar: ownProps.seminar,
  speaker: ownProps.speaker,
  showJoin: ownProps.showJoin,
  parentId: ownProps.parentId,
});

export default connect(mapStateToProps, {})(ScheduleCard);
