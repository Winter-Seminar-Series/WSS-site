import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getProfile,
  updateProfile,
  doesUserHaveRegistered,
} from '../redux/actions/participant';
import { sendPaymentRequest } from '../redux/actions/account';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';

function Form({
  thisSeries,
  updateProfile,
  getProfile,
  doesUserHaveRegistered,
  sendPaymentRequest,
  paymentProcess,
  isFetching,
  first_name: inputFirstName,
  last_name: inputLastName,
  university: inputUniversity,
  introduction_method: inputIntroductionMethod,
  gender: inputGender,
  grade: inputGrade,
  city: inputCity,
  email: inputEmail,
  dateOfBirth: inputDateOfBirth,
  linkedIn: inputLinkedIn,
  github: inputGithub,
  major: inputMajor,
  agreement: inputAgreement,
  openToWork: inputOpenToWork,
  isRegisteration,
}) {
  const gradeTypes = ['Bachelor', 'Master', 'PhD or Higher'];
  const genderTypes = ['Male', 'Female', 'Other'];
  const introductionTypes = [
    'Telegram',
    'Instagram',
    'Facebook',
    'Twitter',
    'Linkedin',
    'YouTube',
    'Friends',
    'Other',
  ];

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('Male');
  const [grade, setGrade] = React.useState('Bachelor');
  const [university, setUniversity] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [introduction_method, setIntroduction_method] = React.useState('');
  const [city, setCity] = React.useState('');
  const [agreement, setAgreement] = React.useState(false);
  const [openToWork, setOpenToWork] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('05/08/2001');
  const [major, setMajor] = React.useState('');
  const [github, setGithub] = React.useState(null);
  const [linkedIn, setLinkedIn] = React.useState(null);

  useEffect(() => {
    getProfile();
    doesUserHaveRegistered(thisSeries);
  }, [getProfile]);

  useEffect(() => {
    setFirstName(inputFirstName);
    setLastName(inputLastName);
    inputIntroductionMethod
      ? setIntroduction_method(inputIntroductionMethod)
      : setIntroduction_method(introduction_method[0]);
    inputGender ? setGender(inputGender) : setGender(genderTypes[0]);
    inputGrade ? setGrade(inputGrade) : setGrade(gradeTypes[2]);
    setUniversity(inputUniversity);
    setEmail(inputEmail);
    setIntroduction_method(inputIntroductionMethod);
    setCity(inputCity);
    setMajor(inputMajor);
    setGithub(inputGithub);
    setLinkedIn(inputLinkedIn);
    setDateOfBirth(inputDateOfBirth);
  }, [
    inputFirstName,
    inputLastName,
    inputUniversity,
    inputIntroductionMethod,
    inputGender,
    inputGrade,
    inputCity,
    inputEmail,
    inputMajor,
    inputDateOfBirth,
    inputLinkedIn,
    inputGithub,
    inputAgreement,
    inputOpenToWork,
  ]);
  const submitInfo = (e) => {
    e.preventDefault();
    if (
      !(
        first_name &&
        last_name &&
        gender &&
        grade &&
        university &&
        city &&
        introduction_method &&
        dateOfBirth &&
        major
      )
    ) {
      toast.error('Please fill all the fields');
      return;
    } else if (!agreement && isRegisteration) {
      toast.error('You should agreement to our condition');
      return;
    }
    if (
      first_name !== inputFirstName ||
      last_name !== inputLastName ||
      gender !== inputGender ||
      grade !== inputGrade ||
      university !== inputUniversity ||
      city !== inputCity ||
      introduction_method !== inputIntroductionMethod ||
      linkedIn !== inputLinkedIn ||
      github !== inputGithub ||
      major !== inputMajor ||
      dateOfBirth !== inputDateOfBirth ||
      agreement !== inputAgreement ||
      openToWork !== inputOpenToWork
    ) {
      updateProfile({
        first_name,
        last_name,
        gender,
        grade,
        university,
        city,
        introduction_method,
        major,
        date_of_birth: dateOfBirth,
        social_media_ids: {
          github,
          linkedin: linkedIn,
        },
        agreement,
        open_to_work: openToWork,
      });
    }
    sendPaymentRequest(thisSeries);
  };
  return (
    <form className="seminar-register-form" onSubmit={submitInfo}>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            disabled
            value={email}
            type="email"
            className="text-input form-control"
            placeholder="Email"
          />
        </div>
      </div>
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
        <div className="col-12 col-lg">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="City"
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Birth Date"
            value={dateOfBirth}
            onChange={(newValue) => {
              setDateOfBirth(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              return (
                <div className="col-12 col-lg">
                  <input
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="text-input form-control"
                    ref={inputRef}
                    {...inputProps}
                    readOnly={false}
                    disabled={false}
                  />
                  {InputProps?.endAdornment}
                </div>
              );
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <FormControl>
            <div className="form-label pt-0 mr-3">Gender:</div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={gender}
              name="radio-buttons-group">
              {genderTypes.map((type) => (
                <FormControlLabel
                  value={type}
                  label={type}
                  control={<Radio onChange={() => setGender(type)} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Major"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <FormControl>
            <div className="form-label pt-0 mr-3">Grade:</div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={grade}
              name="radio-buttons-group">
              {gradeTypes.map((type) => (
                <FormControlLabel
                  value={type}
                  label={type}
                  control={<Radio onChange={() => setGrade(type)} />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Github (optional)"
          />
        </div>
        <div className="col-12 col-lg">
          <input
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="LinkedIn (optional)"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-required-label">
              Introduction method
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={introduction_method}
              label="Introduction method"
              onChange={(e) => setIntroduction_method(e.target.value)}>
              {introductionTypes.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
            <FormHelperText>Optional</FormHelperText>
          </FormControl>
        </div>
        <div className="col-12 col-lg">
          <button className="btn btn-lg btn-primary btn-dark mb-5">
            Upload Resume
            <input type="file" hidden />
          </button>
        </div>
      </div>

      {isRegisteration ? (
        <>
          <div className="form-group mb-4">
            <div className="form-check">
              <input
                checked={agreement}
                onChange={() => setAgreement(!agreement)}
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                By checking this, I agreement NOT to record any seminars or
                workshops.
              </label>
            </div>
          </div>
          <div className="form-group mb-4">
            <div className="form-check">
              <input
                checked={openToWork}
                onChange={() => setOpenToWork(!openToWork)}
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                I'm open to work.
              </label>
            </div>
          </div>
          <button
            disabled={isFetching || paymentProcess}
            type="submit"
            className="btn btn-lg btn-primary btn-dark mb-5">
            Go For Payment
          </button>
        </>
      ) : undefined}
    </form>
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
    major,
    dateOfBirth,
    github,
    linkedIn,
  } = state.Participant;
  const { isFetching: paymentProcess } = state.account;
  return {
    thisSeries: state.account.thisSeries,
    paymentProcess,
    isFetching,
    first_name,
    last_name,
    university,
    introduction_method,
    gender,
    city,
    grade,
    email,
    major,
    dateOfBirth,
    github,
    linkedIn,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  sendPaymentRequest,
  doesUserHaveRegistered,
})(Form);
