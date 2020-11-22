import React, { useState, useEffect } from 'react';
import { connect, connectAdvanced } from 'react-redux';
import {
  register
} from '../redux/actions/account'

function Register({
  register,
  isFetching,
}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [password, setPassword] = useState('');
  const [doesAgainPasswordMatch, setAgainPasswordMatchStatus] = useState(true);

  function checkAgainPassword(e) {
    if (e.target.value === password) {
      setAgainPasswordMatchStatus(false)
    }
  }

  function doRegister(firstName, lastName, email) {
    register(firstName, lastName, email)
  }

  console.log(isFetching)

  return (
    <>
      <section id="main-container" className="main-container pb-0">
        <div style={{ marginTop: "-15rem", height: "15rem" }} className="px-5 diagonal background-shafagh">
          <div className="container section-sub-title title-white" style={{ paddingTop: "9rem" }}>
            Registration
          </div>
        </div>
        <div className="container-fluid px-5 pt-3 mt-5 mb-0 diagonal" style={{ background: "orange" }}>
          <div className="container pt-5">
            <div className="row">
              <div className="col-md-6 pr-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='FirstName'
                />
              </div>
              <div className="col-md-6 pr-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='LastName'
                />
              </div>

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
                  type="text"
                  className="form-control"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder='University'
                />
              </div>
              <div className="col-md-6 pr-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </div>
              <div className="col-md-6 pr-md-5">
                <input
                  type="text"
                  className="form-control"
                  onChange={checkAgainPassword}
                  placeholder='AgainPassword'
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
              onClick={() => doRegister(firstName, lastName, email)}
              className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.Account.isFetching,
})

export default connect(
  mapStateToProps,
  {
    register,
  }
)(Register);
