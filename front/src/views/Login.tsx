import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Login() {
  const { t } = useTranslation('login', { useSuspense: false });
  return (
    <>
      <section dir="rtl" className="auth-container diagonal row pb-0">
        <div className="col-6 form-container">
          <form>
            <div className="form-group mb-5">
              <label htmlFor="username">{t('username')}</label>
              <input id="username" type="email" className="form-control" />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="password">{t('password')}</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-dark mb-5">
              {t('submit')}
            </button>
            <div className="linkbar">
              <span className="mr-1">{t('hasntSignedup')}</span>
              <Link className="link" to="/signup">
                {t('click')}
              </Link>
            </div>
          </form>
        </div>
        <div className="col-6 logo-container" dir="ltr">
          <img className="logo" src="images/new_title_hq.png" alt="wss logo" />
          <div className="row ml-4 mt-1 font-weight-bold text-uppercase d-flex justify-content-around text-white">
            <div>Winter</div>
            <div>Seminar</div>
            <div>Series</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
