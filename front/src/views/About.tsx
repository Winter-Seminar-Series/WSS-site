import React from 'react';
import { useTranslation } from 'react-i18next';
import AboutUs from '../components/AboutUs';
import Staff from './Staff';

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
      <section id="main-container" className="main-container pb-5 pt-0">
        <div
          className="px-2 pt-4 diagonal background-theme"
          style={{ marginTop: 'calc(-2 * var(--diagonal-offset))' }}>
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
            <AboutUs />

            <Staff />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
