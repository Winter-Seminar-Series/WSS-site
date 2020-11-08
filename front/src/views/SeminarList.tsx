import React from 'react';

function SeminarList() {
  return (
    <>
      <section id="ts-speakers" className="blue-gradient ts-speakers diagonal ">
        <div>
          <div className="container">
            <div className="row">
              {/* {% if wss.keynote_seminars.count %} */}
              <h3 className="mb-1 col section-sub-title title-white">
                Keynote Speakers
              </h3>
            </div>
            <div className="row">
              {/* {% for seminar in wss.keynote_seminars %} */}
              <div className="col-xs-12 col-sm-6 col-lg-3">
                {/* {% render_human seminar.speaker subtitle=seminar.speaker.short_bio url=seminar.get_absolute_url %} */}
              </div>
            </div>
            <br />
            <div className="row">
              <h3 className="mb-1 col section-sub-title title-white">Speakers</h3>
            </div>
            <div className="row">
              {/* {% for seminar in wss.non_keynote_seminars %} */}
              <div className="col-xs-12 col-sm-6 col-lg-3">
                {/* {% render_human seminar.speaker subtitle=seminar.speaker.short_bio url=seminar.get_absolute_url %} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SeminarList;
