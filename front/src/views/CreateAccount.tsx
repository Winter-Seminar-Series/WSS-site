import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../redux/actions/account';

function CreateAccount({ register, isLoggedIn, isFetching }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function doRegister(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }
    register(username, email, password);
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
          <form onSubmit={doRegister}>
          <div className="form-group mb-5">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
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
          </div>
          <div className="form-group mb-5">
            <label htmlFor="confirm password">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="confirm-password"
            />
          </div>
          <button

            disabled={isFetching}
            type="submit"
            className="btn btn-lg btn-primary btn-dark mb-5">
            Create Account
          </button>
          <div className="linkbar">
            <span className="mr-1">
              If you have registered before,
            </span>
            <a className="link" href="/login">
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
  isLoggedIn: state.account.isLoggedIn,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  register,
})(CreateAccount);
