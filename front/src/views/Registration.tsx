import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { signup } from '../redux/actions/account';
import ReCAPTCHA from "react-google-recaptcha";

function Registration({ signup, isLoggedIn, isFetching }) {
  const { t } = useTranslation('signup', { useSuspense: false });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doesPasswordAgainMatch, setPasswordAgainMatchingStatus] = useState(true);
  const [recaptcha, setRecaptcha] = useState(false);


  function checkPasswordAgain(passwordAgain) {
    if (passwordAgain === password) {
      setPasswordAgainMatchingStatus(true);
    } else {
      setPasswordAgainMatchingStatus(false);
    }
  }

  function doSignup() {
    if (!username || !email || !password) {
      toast.error('Please fill all the fields');
      return;
    }
    if (!doesPasswordAgainMatch) {
      toast.error("Passwords doesn't match");
      return;
    }
    if (!recaptcha) {
      toast.error("Please resolve the security key");
      return;
    }
    signup(username, email, password);
  }

  if (isLoggedIn) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <>
      <section
        dir="rtl"
        className="auth-container diagonal background-theme row py-0">
        <div className="col-6 form-container" dir="ltr">
          <form>
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
              <label htmlFor="email">{t('email')}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
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
            <div className="form-group mb-5">
              <label htmlFor="confirm password">{t('confirmPassword')}</label>
              <input
                onChange={(e) => checkPasswordAgain(e.target.value)}
                type="password"
                className="form-control"
                id="password-again"
              />
            </div>

            <div className='row'>
              <ReCAPTCHA
                sitekey='6LeJjvkZAAAAAG_zYBjD4DRE3fEh9d9EdHn1TZls'
                onChange={() => setRecaptcha(true)}
              />
              <button
                disabled={isFetching}
                onClick={doSignup}
                type="button"
                className="btn btn-lg btn-primary btn-dark mb-5">
                {t('submit')}
              </button>
              <div className="linkbar">
                <span className="mr-1">{t('signinBefore')}</span>
                <a className="link" href="/login">
                  {t('click')}
                </a>
              </div>
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

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.account.isLoggedIn,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  signup,
})(Registration);
