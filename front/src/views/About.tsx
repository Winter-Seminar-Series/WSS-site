import React from 'react';

function About() {
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
            className="container section-sub-title title-white"
            style={containerStyle}>
            About WSS
          </div>
        </div>
        <div
          className="container-fluid px-2 pt-3 mt-5 mb-0 diagonal"
          style={whiteBackground}>
          <div className="container">
            <div className="row mt-5">
              <div className="col">
                <p>
                  The Winter Seminar Series (WSS) has been built to gather
                  successful Iranians from all around the world and create a
                  professional community in computer science and engineering
                  topics . Over the years, this seminar has grown to become one
                  of the best events in the Sharif University of Technology. WSS
                  is for everyone who works on or interested in any computer
                  science topics and wants to share and express his ideas and
                  research.
                </p>
                <p>
                  WSS was born 5 years ago by the Student Scientific Chapter in
                  Sharif University of Technology as a worldwide effort to bring
                  together expert researchers. Now WSS takes place as a two-day
                  event and in each day speakers present their research and
                  ideas. They also share their findings and teach related
                  topics.
                </p>
                <p>
                  This event consists of presentations, workshops and also a
                  Poster Session to cover various topics in science and
                  engineering.
                </p>
              </div>
            </div>

            <h2 className="section-title mt-2">Programs</h2>
            <div className="row">
              <div className="col mx-auto">
                <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/seminar.png"
                    />
                  </div>
                  <div className="col mr-md-3  d-flex flex-column justify-content-center">
                    <h3>Seminars</h3>
                    <p>
                      Seminars takes place as a two-day event and in each day
                      speakers present their research and ideas. They also share
                      their findings and teach related topics.
                    </p>
                  </div>
                </div>
                <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/poster_session.png"
                    />
                  </div>
                  <div className="col ml-md-3  d-flex flex-column justify-content-center">
                    <h3>Poster Session</h3>
                    <p>
                      The Poster Session advertises your research. For the first
                      time, WSS has attempted to create an opportunity for
                      researchers who have achievements to meet others and
                      engage with them, and build networks.
                    </p>
                  </div>
                </div>
                <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/workshop.png"
                    />
                  </div>
                  <div className="col mr-md-3  d-flex flex-column justify-content-center">
                    <h3>Workshops</h3>
                    <p>
                      Workshops are long form educational opportunities about
                      technology or scientific subjects presented by the best
                      experts our industry has to offer.
                    </p>
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

export default About;
