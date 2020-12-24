import React from 'react';

function Schedule() {

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
        {/* {% if wss.calendar_link %} */}
        <div className="schedule-content">
          <div className="container mt-0">
            <div className="diagonal">
              <div className="row d-flex justify-content-center">
                <div className="btn-group" role="group" aria-label="Add to Calendar">
                  {/* {% if wss.calendar_link %} */}
                  <a role="button" href="{{ wss.calendar_link }}" className="btn btn-blue">
                    Add Events to Calendar
                  </a>
                  {/* {% if wss.ical_link %} */}
                  <a role="button" href="{{ wss.ical_link }}" className="btn btn-secondary">
                    iCal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {% if pre_wss_events.count %} */}
        <div className="diagonal schedule-content pattern-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="section-sub-title">
                  {/* Pre-{{ wss }} Events */}
                </h3>
                <div className="schedule-listing">
                  {/* {% for event in pre_wss_events %} */}
                  <div className="row">
                    <span className="schedule-slot-time col-sm-4">
                      {/* {{ event.start_time.date }} */}
                      <br />
                      {/* {% time_string event.start_time %} - {% time_string event.end_time %} */}
                    </span>
                    <div className="schedule-slot-info col">
                      <div>
                        {/* <!-- schedule-slot-info-content --> */}
                        <h3 className="schedule-slot-speaker-name">
                          {/* {{ event.speaker }} */}
                        </h3>
                        {/* {% if event.seminar %} */}
                        <a href="{% url 'events:seminar' event.pk %}" />
                        {/* {% elif event.workshop %} */}
                        <a href="{% url 'events:workshop' event.pk %}" />
                        <h3 className="schedule-slot-title">
                          {/* {{ event.title }} */}
                        </h3>
                        {/* {% if event.venue %} */}
                        <span className="schedule-slot-desc" data-toggle="tooltip" title="{{ event.venue.address }}">
                          {/* {{ event.venue }} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-60" />
        </div>
        <div className="gap-60"></div>
        <div className="diagonal schedule-content">
          <div className="container">
            <h3 className="section-sub-title">
              {/* {{ wss }} Schedule */}
            </h3>
          </div>
        </div>
        {/* {% for day, events_by_time in events_by_day %} */}
        <div className="diagonal schedule-content pattern-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="schedule-date">
                  {/* Day {{ forloop.counter }} / {% date_string day %} */}
                </h2>
                {/* {% for _, events in events_by_time %} */}
                <div className="schedule-listing bg">
                  <div className="row">
                    {/* {% for event in events %} */}
                    {/* {% if forloop.counter == 1 %} */}
                    {/* {% if day %} */}
                    <span className="schedule-slot-time col-sm-4">
                      {/* {% time_string event.start_time %} - {% time_string event.end_time %} */}
                    </span>
                    <div className="schedule-slot-info col">
                      <div>
                        <h3 className="schedule-slot-speaker-name">
                          {/* {{ event.speaker }} */}
                        </h3>
                        {/* {% if event.seminar %} */}
                        <a href="{% url 'events:seminar' event.pk %}" />
                        {/* {% elif event.workshop %} */}
                        <a href="{% url 'events:workshop' event.pk %}" />
                        <h3 className="schedule-slot-title">
                          {/* {{ event.title }} */}
                        </h3>
                        {/* {% if event.venue %} */}
                        <span className="schedule-slot-desc" data-toggle="tooltip" title="{{ event.venue.address }}">
                          {/* {{ event.venue }} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-60" />
        </div>
      </section>
    </>
  )
}

export default Schedule;
