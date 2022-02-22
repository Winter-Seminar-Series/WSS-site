import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { login } from '../redux/actions/account';
import { Redirect, Link, useHistory } from 'react-router-dom';
import ReCaptchaV2 from 'react-google-recaptcha';

function Login({ login, isLoggedIn, isFetching }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  function doLogin(e) {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please fill all the fields');
      return;
    }
    if (token === null) {
      toast.error("Please verify you're not a robot");
      return;
    }

    login(username, password, token);
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section dir="rtl" className="auth-container background-theme row">
        <div className="diagonal col-xs-12 col-sm-6 form-container" dir="ltr">
          <form onSubmit={doLogin}>
            <div className="form-group mb-5">
              <label htmlFor="username">Email</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
              />
              <div className="linkbar mt-3">
                <a className="link" href="/password-reset">
                  Forgot password?
                </a>
              </div>
            </div>
            <div style={{ margin: '1rem 0' }}>
              <ReCaptchaV2
                sitekey={'6LfZB84dAAAAABxoYIEAal-r8fiCB8sR93N8gKso'}
                onChange={(token) => setToken(token)}
                onExpire={() => setToken(null)}
              />
            </div>
            <button
              disabled={isFetching}
              type="submit"
              className="btn btn-lg btn-primary btn-dark mb-5">
              Login
            </button>
            <div className="linkbar">
              <span className="mr-1">If you haven't created account yet,</span>
              <a className="link" href="/create-account">
                click here
              </a>
            </div>
          </form>
        </div>

        <div className="d-none d-sm-flex col-6 logo-container" dir="ltr">
          <img className="logo" src="images/new_title_hq.png" alt="wss logo" />
          <div className="row font-weight-bold text-uppercase d-flex justify-content-around text-white">
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
