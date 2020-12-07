import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { sendPaymentRequest } from '../../redux/actions/account';

function SeminarRegistration({ sendPaymentRequest, isFetching }) {
  const { t } = useTranslation('seminarRegistration', { useSuspense: false });
  const degreeTypes = ['Doctorate', 'Master', 'Bachelor', 'Other'];
  const [email, setEmail] = React.useState('');
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [phone_number, setPhoneNumber] = React.useState('');
  const [university, setUniversity] = React.useState('');
  const [job, setJob] = React.useState('');
  const [degree, setDegree] = React.useState(degreeTypes[0]);
  const [agree, setAgree] = React.useState(false);
  //todo autofill
  const register = () => {
    if (!agree) {
      toast.error('You should agree to Terms and Conditions');
      return;
    } else if (
      !(
        email &&
        first_name &&
        last_name &&
        phone_number &&
        university &&
        job &&
        degree
      )
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    // editProfile({email, first_name, last_name, phone_number, university, job, degree});
    sendPaymentRequest();
  };
  return (
    <>
      <div className="seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="event">{t('event')}</div>
          <div className="title">{t('title')}</div>
          <div className="date">{t('date')}</div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="text-input form-control"
              placeholder="Email"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={phone_number}
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
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              type="text"
              className="text-input form-control"
              placeholder="University"
            />
          </div>
          <div className="col-12 col-lg">
            <input
              value={job}
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
              I Agree to Terms and Conditions
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

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  sendPaymentRequest,
})(SeminarRegistration);
