import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { THIS_YEAR } from '../../constants/info';
import {
  getProfile,
  updateProfile
} from '../../redux/actions/participant';

function Profile({
  updateProfile,
  getProfile,
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
  const gradeTypes = ['PhD or Higher', 'Master', 'Bachelor'];
  const genderTypes = ['Male', 'Female', 'Other'];
  const introductionTypes = ['Telegram', 'Instagram', 'Facebook', 'Twitter', 'Linkedin', 'YouTube', 'Friends', 'Other'];

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [university, setUniversity] = React.useState('');
  const [introduction_method, setIntroduction_method] = React.useState('');
  const [city, setCity] = React.useState(inputCity);
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    getProfile();
  }, [getProfile])

  useEffect(() => {
    setFirstName(inputFirstName);
    setLastName(inputLastName);
    inputIntroductionMethod ? setIntroduction_method(inputIntroductionMethod) : setIntroduction_method(introduction_method[0]);
    inputGender ? setGender(inputGender) : setGender(genderTypes[0]);
    inputGrade ? setGrade(inputGrade) : setGrade(gradeTypes[2]);
    setUniversity(inputUniversity);
    setEmail(inputEmail);
    setIntroduction_method(inputIntroductionMethod);
    setCity(inputCity);
  }, [inputFirstName,
    inputLastName,
    inputUniversity,
    inputIntroductionMethod,
    inputGender,
    inputGrade,
    inputCity,
    inputEmail,])

  const doUpdateProfile = (e) => {
    e.preventDefault()
    if (
      !(
        first_name &&
        last_name &&
        gender &&
        grade &&
        university &&
        city &&
        introduction_method &&
        email
      )
    ) {
      toast.error('Please fill all the required fields');
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
      email,
    });
  };

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">
            Profile
          </div>
        </div>
      </div>
      <form className="seminar-register-form" onSubmit={doUpdateProfile}>
        <h3>
          Required fields
        </h3>
        <br />
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
              disabled={true}
              value={email}
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="row">
          <div className='col-6 col-md-4'>
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
                {genderTypes.map((g, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => setGender(g)}>
                    {g}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='col-6  col-md-4'>
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
          <div className='col-12 col-md-4'>
            <div className="form-label pt-0 mr-3">Introduction method:</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                {introduction_method}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {introductionTypes.map((i, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => setIntroduction_method(i)}>
                    {i}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isFetching}
          type="submit"
          className="btn btn-lg btn-primary btn-dark mb-5"
          >
          Update
        </button>
      </form>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {
    isFetching,
    username,
    email,
    first_name,
    last_name,
    phone_number,
    age,
    job,
    university,
    introduction_method,
    gender,
    city,
    country,
    field_of_interest,
    grade,
    is_student,
    favorite_tags,
  } = state.Participant;
  return {
    isFetching,
    username,
    email,
    first_name,
    last_name,
    phone_number,
    age,
    job,
    university,
    introduction_method,
    gender,
    city,
    country,
    field_of_interest,
    grade,
    is_student,
    favorite_tags,
  };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    updateProfile,
  })(Profile);
