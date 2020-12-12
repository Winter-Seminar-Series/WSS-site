import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/actions/account';
import {Redirect, useParams} from 'react-router-dom';

function ResetPassword({ login, isLoggedIn, isFetching }) {
  const [password, setPassword] = useState('');
  const token = useParams()['token'];

  function doConfirmPasswordReset(e) {
    e.preventDefault();

    if (!password) {
      toast.error('Please choose a password');
      return;
    }
    //todo call /password_rest/confirm/ with {token, password}
    // toast.error('Password changed successfully');
    // redirect to /login

  }

  if (!token) {
    return <Redirect to="/password-reset" />;
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
            <form onSubmit={doConfirmPasswordReset}>

              <h2>Reset Your Password</h2>

              <p>Please choose a new password for your account.</p>

              <div className="form-group mb-5">
              <label htmlFor="password">New Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button
              disabled={isFetching}
              type="submit"
              className="btn btn-lg btn-primary btn-dark mb-5">
              Reset Password
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

export default connect(mapStateToProps, {
  login,
})(ResetPassword);
