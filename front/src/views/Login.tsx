import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  login
} from '../redux/actions/account'

function Login({ login }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <section id="main-container" className="main-container pb-0">
      </section>
    </>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {

}

export default connect(
  mapStateToProps,
  {
    login,
  }
)(Login);
