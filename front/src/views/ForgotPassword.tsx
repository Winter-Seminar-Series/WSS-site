import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/actions/account';
import { Redirect } from 'react-router-dom';
import {
  requestPasswordReset,
} from '../redux/actions/account'

function ForgotPassword({ login, isLoggedIn, isFetching, requestPasswordReset }) {
  const [email, setEmail] = useState('');

  function doRequestPasswordReset(e) {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    requestPasswordReset(email);
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section
        dir="rtl"
        className="auth-container background-theme row">
        <div className="diagonal col-xs-12 col-sm-6 form-container" dir="ltr">
          <form onSubmit={doRequestPasswordReset}>

            <h2>Forgot Password?</h2>

            <p>Enter the email address you used when you created account and we’ll send you instructions to reset your password.</p>

            <div className="form-group mb-5">
              <label htmlFor="username">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                className="form-control"
              />
            </div>
            <button
              disabled={isFetching}
              type="submit"
              className="btn btn-lg btn-primary btn-dark mb-5">
              Send Reset Instructions
            </button>
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

export default connect(
  mapStateToProps,
  {
    login,
    requestPasswordReset,
  })(ForgotPassword);
