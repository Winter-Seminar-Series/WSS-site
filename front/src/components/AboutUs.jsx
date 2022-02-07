import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation('about', { useSuspense: false });

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="section-title my-4">Programs</h2>
      <div
        className="about-us-outer-container justify-content-around mx-auto"
        style={{ height: 'fit-content' }}>
        <div className="about-us-text-container justify-content-between h-100">
          <div
            className="col mr-md-3 d-flex flex-column justify-content-center"
            style={{ minWidth: 200 }}>
            <h3>Seminars</h3>
            <p>{t('seminarsDescription')}</p>
          </div>
          <div
            className="col mr-md-3 d-flex flex-column justify-content-center"
            style={{ minWidth: 200 }}>
            <h3>Round Tables</h3>
            <p>{t('roundTablesDescription')}</p>
          </div>
          <div
            className="col mr-md-3 d-flex flex-column justify-content-center"
            style={{ minWidth: 200 }}>
            <h3>Lab Talks</h3>
            <p>{t('labTalksDescription')}</p>
          </div>
        </div>
        <div className="about-us-images-container justify-content-around align-items-center h-100">
          <div className="p-5 p-md-0 col-md-7 d-flex flex-column justify-content-center">
            <img className="w-100 h-auto my-auto" src="images/seminar.png" />
          </div>
          <br />
          <div className="p-5 p-md-0 col-md-7 d-flex flex-column justify-content-center">
            <img className="w-100 h-auto my-auto" src="images/roundtable.png" />
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
  );
}

export default AboutUs;
