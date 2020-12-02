import React from 'react';
import { useTranslation } from 'react-i18next';

function SeminarRegistration(props, state) {
  const { t } = useTranslation('seminarRegistration', { useSuspense: false });
  const degreeTypes = ['Doctorate', 'Master', 'Bachelor', 'Other'];
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
          <div className="col">
            <input
              type="text"
              className="text-input form-control"
              placeholder="First name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="text-input form-control"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
          <div className="col">
            <input
              type="tel"
              className="text-input form-control"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="text-input form-control"
              placeholder="University"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="text-input form-control"
              placeholder="Field of study"
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
              Your degree
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

export default SeminarRegistration;
