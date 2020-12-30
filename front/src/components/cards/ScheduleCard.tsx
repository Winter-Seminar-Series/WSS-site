import moment from "moment";
import React from "react";
import {BASE_URL} from "../../constants/info";
import GoToButton from "../GoToButton";

function ScheduleCard(
  {
    seminar,
    speaker,
    showJoin = false,
    parentId="#accordion"
  }
  ) {
  return (
    <div className="schedule-listing bg">
      {speaker && (
        <div className="row align-items-center">
          <div className="mr-3 mb-3">
            {speaker.picture &&
            <img style={{
              borderRadius: '5px',
              width: '80px',
              height: '80px',
              boxShadow: '0px 3px 6px rgba(0,0,0,.3)',
            }} src={`${BASE_URL}/${speaker.picture}`} alt='' />
            }
          </div>

          <div>
            <h5>
              {speaker.name}
            </h5>
            {speaker.degree}, {speaker.place}
          </div>
        </div>
      )}

      {seminar && speaker && (
        <>
          <div className="row mt-4">
            <h4>
              {seminar.title}
            </h4>
          </div>

          <div className="row align-items-center justify-content-between mt-2">
            <div className='py-3'>
              <i className="fa fa-clock-o">&nbsp;</i>

              <b>{moment(seminar.start_time, "YYYY-MM-DD hh:mm:ss").format("hh:mm a")}</b>

              <span className="px-2">-</span>

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
                />
              )}
            </div>
          </div>

          <div
            id={`collapse${seminar.id}`}
            className="collapse"
            data-parent={parentId}
          >
            <div className="mt-4 pt-4 border-top">
              <h5>Abstract</h5>
              <p>{seminar.abstract}</p>

              <h5>Audience</h5>
              <p>{seminar.audience}</p>

              <h5>Bio</h5>
              <p>{speaker.bio}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ScheduleCard;
