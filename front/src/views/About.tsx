import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('about', { useSuspense: false });

  const diagonalStyle = {
    marginTop: '-18rem',
    height: '18rem',
  };

  const containerStyle = {
    paddingTop: '10.5rem',
  };

  const whiteBackground = {
    background: 'white',
  };

  return (
    <>
      <section id="main-container" className="main-container pb-5">
        <div
          style={diagonalStyle}
          className="px-2 pt-4 diagonal background-theme">
          <h2
            className="container section-sub-title title-white"
            style={containerStyle}>
            About WSS
          </h2>
        </div>
        <div
          className="container-fluid px-2 pt-4 pb-5 mt-5 mb-0 diagonal"
          style={whiteBackground}>
          <div className="container">
            <div className="row mt-5">
              <div className="col">
                <p>{t('descriptionP1')}</p>
                <p>{t('descriptionP2')}</p>
                <p>{t('descriptionP3')}</p>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="section-title my-4">Programs</h2>
              <div className="d-flex flex-row justify-content-around w-75 mx-auto" style={{minHeight: 500}}>
                <div className="d-flex flex-column justify-content-between h-100" style={{minHeight: 500, width: "60%"}}>
                  <div className="col mr-md-3 d-flex flex-column justify-content-center">
                    <h3>Seminars</h3>
                    <p>{t('seminarsDescription')}</p>
                  </div>
                  <div className="col mr-md-3 d-flex flex-column justify-content-center">
                    <h3>Round Tables</h3>
                    <p>{t('roundTablesDescription')}</p>
                  </div>
                  <div className="col mr-md-3 d-flex flex-column justify-content-center">
                    <h3>Lab Talks</h3>
                    <p>{t('labTalksDescription')}</p>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center h-100" style={{minHeight: 500, width: "40%"}}>
                  <div className="p-5 p-md-0 col-md-7 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/seminar.png"
                    />
                  </div>
                  <div className="p-5 p-md-0 col-md-7 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/roundtable.png"
                    />
                  </div>
                </div>
                {/*<div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">*/}
                {/*</div>*/}
                {/* <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/poster_session.png"
                    />
                  </div>
                  <div className="col ml-md-3  d-flex flex-column justify-content-start">
                    <h3>{t('posterSession')}</h3>
                    <p>{t('posterSessionDescription')}</p>
                  </div>
                </div> */}
                {/*<div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/workshop.png"
                    />
                  </div>
                  <div className="col mr-md-3  d-flex flex-column justify-content-start">
                    <h3>Workshops</h3>
                    <p>{t('workshopsDescription')}</p>
                  </div>
                </div>*/}
                {/*<div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
