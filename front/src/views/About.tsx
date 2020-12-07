import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('about', { useSuspense: false });

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
        <div style={diagonalStyle} className="px-2 diagonal background-theme">
          <div
            className="container section-sub-title title-white"
            style={containerStyle}>
            {t('title')}
          </div>
        </div>
        <div
          className="container-fluid px-2 pt-3 mt-5 mb-0 diagonal"
          style={whiteBackground}>
          <div className="container">
            <div className="row mt-5">
              <div className="col">
                <p>{t('descriptionP1')}</p>
                <p>{t('descriptionP2')}</p>
                <p>{t('descriptionP3')}</p>
              </div>
            </div>

            <h2 className="section-title mt-2">{t('programs')}</h2>
            <div className="row">
              <div className="col mx-auto">
                <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/seminar.png"
                    />
                  </div>
                  <div className="col mr-md-3  d-flex flex-column justify-content-start">
                    <h3>{t('seminars')}</h3>
                    <p>{t('seminarsDescription')}</p>
                  </div>
                </div>
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
                <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-md-5">
                  <div className="p-5 p-md-0 col-md-3 d-flex flex-column justify-content-center">
                    <img
                      className="w-100 h-auto my-auto"
                      src="images/workshop.png"
                    />
                  </div>
                  <div className="col mr-md-3  d-flex flex-column justify-content-start">
                    <h3>{t('workshops')}</h3>
                    <p>{t('workshopsDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
