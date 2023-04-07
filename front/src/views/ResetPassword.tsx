import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { resetPassword } from '../redux/actions/account';

function ResetPassword({
  isLoggedIn,
  isFetching,
  resetPassword,
  doesResetPasswordCompleted,
}) {
  const history = useHistory();
  const [didButtonClick, setButtonClickStatus] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const token = useParams()['token'];

  async function doConfirmPasswordReset(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }
    if (!password) {
      toast.error('Please choose a password');
      return;
    }
    await resetPassword(password, token);
    setButtonClickStatus(true);
  }

  if (doesResetPasswordCompleted && didButtonClick) {
    return <Redirect exact to="/login" />;
  }

  if (!token) {
    return <Redirect to="/password-reset" />;
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section dir="rtl" className="auth-container background-theme row">
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
              <br />
              <label htmlFor="password">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button
              disabled={isFetching}
              type="submit"
              className="btn btn-lg btn-primary mb-5"
            >
              Reset Password
            </button>
          </form>
        </div>

        <div className="d-none d-sm-flex col-6 logo-container" dir="ltr">
          <img className="logo" src="/images/new_title_hq.png" alt="wss logo" />
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
  doesResetPasswordCompleted: state.account.doesResetPasswordCompleted,
  isFetching: state.account.isFetching,
  isLoggedIn: state.account.isLoggedIn,
});

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPassword);
