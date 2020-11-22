<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { connect, connectAdvanced } from 'react-redux';
import {
  login
} from '../redux/actions/account'

function Login({
  login,
  isFetching,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function doLogin(email, password) {
    login(email, password)
  }

  console.log(isFetching)

  return (
    <>
      <section id="main-container" className="main-container pb-0">
        <div style={{ marginTop: "-15rem", height: "15rem" }} className="px-5 diagonal background-shafagh">
          <div className="container section-sub-title title-white" style={{ paddingTop: "9rem" }}>
            Login
          </div>
        </div>
        <div className="container-fluid px-5 pt-3 mt-5 mb-0 diagonal" style={{ background: "orange" }}>
          <div className="container pt-5">
            <div className="row">
              <div className="col-md-6 pr-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                />
              </div>
              <div className="col-md-6 pr-md-5">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </div>
              <div className="col-md-6 pr-md-5">
                {/* {{ form.age | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5 d-flex align-items-center">
                {/* {{ form.gender | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5">
                {/* {{ form.national_id | as_crispy_field }} */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pr-md-5">
                {/* {{ form.phone_number | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5">
                {/* {{ form.email | as_crispy_field }} */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pr-md-5">
                {/* {{ form.country | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5">
                {/* {{ form.city | as_crispy_field }} */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pr-md-5">
                {/* {{ form.university | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5">
                {/* {{ form.grade | as_crispy_field }} */}
              </div>

              <div className="col-md-6 pr-md-5">
                {/* {{ form.job | as_crispy_field }} */}
              </div>
              <div className="col-md-6 pr-md-5 d-flex align-items-center">
                {/* {{ form.is_student | as_crispy_field }} */}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 pr-md-5 d-flex w-100">
                {/* {{ form.introduction_method | as_crispy_field }} */}
              </div>
              <div className="col-12">
                {/* {{ form.interests | as_crispy_field }} */}
              </div>
              <div className="col-md-6 ">
                {/* {{ form.question | as_crispy_field }} */}
              </div>
              <div className="col-md-6 d-flex align-items-center  ">
                {/* {{ form.question_other | as_crispy_field }} */}
              </div>
            </div>
            <hr />
            <button
              onClick={() => doLogin(email, password)}
              className="btn btn-primary">
              Login
            </button>
>>>>>>> readux-thunk-api
          </div>
        </div>
      </section>
    </>
<<<<<<< HEAD
  );
}

export default Login;
=======
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.Account.isFetching,
})

export default connect(
  mapStateToProps,
  {
    login,
  }
)(Login);
>>>>>>> readux-thunk-api
