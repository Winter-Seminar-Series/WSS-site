import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import {
  requestPasswordReset,
} from '../redux/actions/account'

function ForgotPassword({ isLoggedIn, isFetching, requestPasswordReset }) {
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
          
        </div>

        <div className="d-none d-sm-flex col-6 logo-container" dir="ltr">
          
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
    requestPasswordReset,
  })(ForgotPassword);
