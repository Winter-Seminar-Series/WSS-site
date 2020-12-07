import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  getModelList,
  getModelListCount,
  MODEL_LISTS_NAMES,
} from '../../redux/actions/WSS';

function WorkshopRegistration({ workshops, workshops_count }, { degree }) {
  const { t } = useTranslation('workshopRegistration', { useSuspense: false });
  const degreeTypes = ['Doctorate', 'Master', 'Bachelor', 'Other'];
  degree = degreeTypes[0];
  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
    getModelListCount(MODEL_LISTS_NAMES.WORKSHOPS, 2020);
  }, [getModelList, getModelListCount]);

  return (
    <>
      <div className="seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="event">{t('event')}</div>
          <div className="title">{t('title')}</div>
          <div className="date">{t('date')}</div>
        </div>
      </div>
      <form className="seminar-register-form">
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              type="text"
              className="text-input form-control"
              placeholder="First name"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              type="text"
              className="text-input form-control"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              type="tel"
              className="text-input form-control"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              type="text"
              className="text-input form-control"
              placeholder="University"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              type="text"
              className="text-input form-control"
              placeholder="Job"
            />
          </div>
        </div>

        <div className="degree row align-items-center">
          <div className="col-auto form-label pt-0 mr-3">Degree</div>
          <div className="col-auto dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {degree}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {degreeTypes.map((d, index) => (
                <a key={index} className="dropdown-item">
                  {d}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              I Agree to Terms and Conditions
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-lg btn-primary btn-dark mb-5">
          {t('submit')}
        </button>
      </form>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  workshops: state.WSS.workshops ? state.WSS.workshops : [],
  workshops_count: state.WSS.workshops_count ? state.WSS.workshops_count : 0,
});

export default connect(mapStateToProps, {
  getModelList,
  getModelListCount,
})(WorkshopRegistration);
