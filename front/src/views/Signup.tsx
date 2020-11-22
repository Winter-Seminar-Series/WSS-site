import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  signup,
} from '../redux/actions/account'

function Signup({ signup, isFetching }) {
  const { t } = useTranslation('signup', { useSuspense: false });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doesPasswordAgainMatch, setPasswordAgainMatchingStatus] = useState(true);


  function checkPasswordAgain(passwordAgain) {
    if (passwordAgain === password) {
      setPasswordAgainMatchingStatus(true)
    } else {
      setPasswordAgainMatchingStatus(false)
    }
  }

  function doSignup() {
    if (doesPasswordAgainMatch) {
      signup(firstName, lastName, email, password)
    }
  }

  return (
    <>
      <section dir="rtl" className="auth-container diagonal row pb-0">
        <div className="col-6 form-container">
          <form>
            <div className="form-group mb-5">
              <label htmlFor="firstName">{t('firstName')}</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                type="text"
                className="form-control" />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="lastName">{t('lastName')}</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                type="text"
                className="form-control" />
            </div>

            <div className="form-group mb-5">
              <label htmlFor="email">{t('email')}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                className="form-control" />
            </div>

            <div className="form-group mb-5">
              <label htmlFor="password">{t('password')}</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password" />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="password again">{t('passwordAgain')}</label>
              <input
                onChange={(e) => checkPasswordAgain(e.target.value)}
                type="password"
                className="form-control"
                id="password-again" />
            </div>
            <button
              // disabled={!(!!firstName && !!lastName && !!email && !!password) || !doesPasswordAgainMatch}
              onClick={doSignup}
              type="button"
              className="btn btn-lg btn-primary btn-dark mb-5">
              {t('submit')}
            </button>
            <div className="linkbar">
              <span className="mr-1">{t('signinBefore')}</span>
              <Link className="link" to="/login">
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

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.Account.isFetching,
})

export default connect(
  mapStateToProps,
  {
    signup,
  }
)(Signup);
