import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { login } from '../redux/actions/account';
import { Redirect, Link } from 'react-router-dom';

function Login({ login, isLoggedIn, isFetching }) {
  const { t } = useTranslation('login', { useSuspense: false });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function doLogin() {
    if (!username || !password) {
      toast.error('Please fill all the required fields');
      return;
    }
    login(username, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section
        dir="rtl"
        className="auth-container diagonal background-theme row py-0">
        <div className="col-xs-12 col-sm-6 form-container" dir="ltr">
          <div className="form-group mb-5">
            <label htmlFor="username">{t('username')}</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="password">{t('password')}</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <button
            onClick={login}
            disabled={isFetching}
            type="submit"
            className="btn btn-lg btn-primary btn-dark mb-5">
            {t('submit')}
          </button>
          <div className="linkbar">
            <span className="mr-1">{t('hasntSignedup')}</span>
            <a className="link" href="/register">
              {t('click')}
            </a>
          </div>
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

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.account.isFetching,
  isLoggedIn: state.account.isLoggedIn,
});

export default connect(mapStateToProps, {
  login,
})(Login);
