import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { THIS_YEAR } from '../../constants/info';
import {
  getProfile,
  updateProfile
} from '../../redux/actions/participant';
import {
  sendPaymentRequest,
} from '../../redux/actions/account'

function Registration({
  updateProfile,
  getProfile,
  sendPaymentRequest,
  isFetching,
  first_name: inputFirstName,
  last_name: inputLastName,
  university: inputUniversity,
  introduction_method: inputIntroductionMethod,
  gender: inputGender,
  grade: inputGrade,
  city: inputCity,
  email: inputEmail,
}) {
  const { t } = useTranslation('seminarRegistration', { useSuspense: false });
  const gradeTypes = ['Doctorate', 'Master', 'Bachelor', 'Other'];
  const genderTypes = ['Male', 'Female'];
  const [first_name, setFirstName] = React.useState(inputFirstName);
  const [last_name, setLastName] = React.useState(inputLastName);
  const [gender, setGender] = React.useState(inputGender ? inputGender : genderTypes[0]);
  const [grade, setGrade] = React.useState(inputGrade ? inputGrade : gradeTypes[0]);
  const [university, setUniversity] = React.useState(inputUniversity);
  const [email, setEmail] = React.useState(inputEmail);
  const [introduction_method, setIntroduction_method] = React.useState(inputIntroductionMethod);
  const [city, setCity] = React.useState(inputCity);
  const [agree, setAgree] = React.useState(false);


  useEffect(() => {
    getProfile();
  }, [getProfile])

  const submitInfo = () => {
    if (
      !(
        first_name &&
        last_name &&
        gender &&
        grade &&
        university &&
        city &&
        introduction_method
      )
    ) {
      toast.error('Please fill all the required fields');
      return;
    } else if (agree) {
      toast.error('You should agree to our terms and conditions');
      return;
    }

    updateProfile({
      first_name,
      last_name,
      gender,
      grade,
      university,
      city,
      introduction_method,
    });

    sendPaymentRequest(THIS_YEAR);
  };
  return (
    <>
      <div className="seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">
            Registration
          </div>
        </div>
      </div>
      <form className="seminar-register-form">
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="First name"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="Last name"
            />
          </div>
        </div>


        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="University"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="City"
            />
          </div>
        </div>


        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={introduction_method}
              onChange={(e) => setIntroduction_method(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="Introduction method"
            />
          </div>
        </div>

        <div className="row">
          <div className='col-6 col-lg'>
            <div className="form-label pt-0 mr-3">Gender:</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {gender}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {genderTypes.map((d, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => setGender(d)}>
                    {d}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='col-6 col-lg'>
            <div className="form-label pt-0 mr-3">Grade:</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {grade}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {gradeTypes.map((d, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => setGrade(d)}>
                    {d}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-group mb-4">
          <div className="form-check">
            <input
              checked={agree}
              onChange={(e) => setAgree(!agree)}
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              I Agree to terms and conditions
            </label>
          </div>
        </div>
        <button
          disabled={isFetching}
          type="button"
          className="btn btn-lg btn-primary btn-dark mb-5"
          onClick={submitInfo}>
          Go For Payment
        </button>
      </form>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    first_name,
    last_name,
    university,
    introduction_method,
    gender,
    city,
    grade,
    email,
  } = state.Participant;
  return {
    isFetching,
    first_name,
    last_name,
    university,
    introduction_method,
    gender,
    city,
    grade,
    email,
  };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    updateProfile,
    sendPaymentRequest,
  })(Registration);
