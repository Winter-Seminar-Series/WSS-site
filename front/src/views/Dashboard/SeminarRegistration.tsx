import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { sendPaymentRequest } from '../../redux/actions/account';
import { updateProfile } from '../../redux/actions/participant';

function SeminarRegistration({
  sendPaymentRequest,
  updateProfile,
  isFetching,
  username,
  email,
  first_name,
  last_name,
  phone_number,
  job,
  university,
}) {
  const { t } = useTranslation('seminarRegistration', { useSuspense: false });
  const degreeTypes = ['Doctorate', 'Master', 'Bachelor', 'Other'];
  const [form_email, setEmail] = React.useState(email);
  const [form_first_name, setFirstName] = React.useState(first_name);
  const [form_last_name, setLastName] = React.useState(last_name);
  const [form_phone_number, setPhoneNumber] = React.useState(phone_number);
  const [form_university, setUniversity] = React.useState(university);
  const [form_job, setJob] = React.useState(job);
  const [degree, setDegree] = React.useState(degreeTypes[0]);
  const [agree, setAgree] = React.useState(false);
  //todo autofill
  const register = () => {
    if (!agree) {
      toast.error('You should agree to terms and conditions');
      return;
    } else if (
      !(
        form_email &&
        form_first_name &&
        form_last_name &&
        form_phone_number &&
        form_university &&
        form_job &&
        degree
      )
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    // updateProfile({
    //   email,
    //   first_name,
    //   last_name,
    //   phone_number,
    //   university,
    //   job,
    //   degree,
    // });
    sendPaymentRequest();
  };
  return (
    <>
      <div className="seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="event">
            WSS 2020
            {/* {t('event')} */}
          </div>
          <div className="title">
            Seminar Registration
            {/* {t('title')} */}
          </div>
          <div className="date">
            23 december, 2020
            {/* {t('date')} */}
          </div>
        </div>
      </div>
      <form className="seminar-register-form">
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={form_first_name}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="First name"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={form_last_name}
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
              value={form_email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={form_phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              className="text-input form-control"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3 col-lg mb-lg-0">
            <input
              value={form_university}
              onChange={(e) => setUniversity(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="University"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={form_job}
              onChange={(e) => setJob(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="Job"
            />
          </div>
        </div>

        <div className="degree row align-items-center">
          <div className="col-auto form-label pt-0 mr-3">Degree</div>
          <div className="col-auto dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {degree}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {degreeTypes.map((d, index) => (
                <a
                  key={index}
                  className="dropdown-item"
                  onClick={() => setDegree(d)}>
                  {d}
                </a>
              ))}
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
          type="button"
          className="btn btn-lg btn-primary btn-dark mb-5"
          onClick={register}>
          {t('submit')}
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

export default connect(mapStateToProps, {
  sendPaymentRequest,
  updateProfile,
})(SeminarRegistration);
