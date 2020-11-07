import React from 'react';

function Details() {
  const diagonalStyle = {
    marginTop: '-15rem',
    height: '15rem',
  };

  const containerStyle = {
    paddingTop: '9rem',
  };

  const whiteBackground = {
    background: 'white',
  };
  return (
    <>
      <section id="main-container" className="main-container pb-0">
        <div style={diagonalStyle} className="px-2 diagonal background-shafagh">
          <div
            style={containerStyle}
            className="container section-sub-title title-white">
            Details
          </div>
        </div>

        <div
          style={whiteBackground}
          className="container-fluid px-2 pt-3 mt-5 mb-0 diagonal">
          <div className="container">
            <div className="row mt-5">
              <div className="col mx-auto">
                <div className="row">
                  <div className="col">
                    <h3 className="mt-2">Poster Session</h3>
                    <p>
                      A “Poster Session” is a way of giving the opportunity for
                      members who have issues or achievements of limited
                      interest and which are not suitable for the formalities of
                      a conference to communicate their message in an informal
                      manner. The hard facts of their presentation are
                      “published” on posters adjacent to where they will deliver
                      their message or in hand-outs.
                    </p>
                    <p>
                      Each poster must include text in a large enough font (~20
                      point font) to be read easily by attendees from a distance
                      of 4 to 5 feet or more. Lettering on illustrations should
                      be large and legible. Photographs should be a minimum of 5
                      x 7 inches. Material should be displayed in logical
                      sequence (introduction, development, conclusion) and each
                      sheet should be numbered.
                    </p>
                    <figure className="col-lg-6 px-0 figure">
                      <figcaption className="figure-caption mb-2">
                        Poster Template
                      </figcaption>
                      <img
                        className="figure-img img-fluid"
                        src="images/poster_template.jpg"
                        alt="Poster Template"
                      />
                    </figure>
                    <p>
                      <a
                        role="button"
                        href="files/Poster Template.pptx"
                        className="btn btn-blue">
                        Download template
                      </a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h3 className="mt-2">Booklets</h3>
                    <p>
                      <a
                        role="button"
                        href="{{ wss.booklet_url }}"
                        className="btn btn-blue">
                        Download booklets
                      </a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h3 className="mt-2">Seminar Venue</h3>
                    <div className="h-auto gallery-container col-sm-4">
                      <a
                        className="gallery-popup"
                        href="{% static 'images/venue.jpg' %}">
                        <img
                          className="w-100 img-responsive"
                          src="images/venue.jpg"
                          alt="Venue Map"
                        />
                        <span className="gallery-icon">
                          <i className="fa fa-search"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="mt-2">Registration</h3>
                    <table className="table">
                      <caption>
                        If you enroll in any workshops with the seminar, you
                        will get 100,000 Rials discount for each workshop.
                      </caption>
                      <thead>
                        <tr>
                          <th className="w-40" scope="col">
                            Event
                          </th>
                          <th scope="col">Registration Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Seminar</th>
                          <td>
                            Students: 1,350,000 Rials
                            <br />
                            Others: 1,500,000 Rials
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Workshop</th>
                          <td>Each Workshop: 300,000 Rials</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <h2 className="mt-2 section-sub-title">Dates and Deadlines</h2>
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="mb-4">Deadlines</h3>
                    <div className="table-responsive-sm">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="w-40" scope="row">
                              Poster Session Registration
                            </th>
                            <td>
                              Submission Opens
                              <br />
                              24th November 2019
                            </td>
                            <td>
                              Submission Deadline
                              <br />
                              3rd December 2019
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Seminar and Workshops Registration
                            </th>
                            <td>
                              Registration Opens
                              <br />
                              16th December 2019
                            </td>
                            <td>
                              Registration Deadline
                              <br />
                              29th December 2019
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="mb-4">Dates</h3>
                    <table className="table">
                      <tbody>
                        <tr>
                          <th className="w-40" scope="row">
                            Workshops
                          </th>
                          <td>28th December 2019 - 1st January 2020</td>
                        </tr>
                        <tr>
                          <th scope="row">Seminar</th>
                          <td>2nd - 3rd January 2020</td>
                        </tr>
                        <tr>
                          <th scope="row">Poster Session</th>
                          <td>3rd January 2020</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
