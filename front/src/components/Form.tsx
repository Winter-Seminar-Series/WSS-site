import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getProfile,
  updateProfile,
  doesUserHaveRegistered,
} from '../redux/actions/participant';
import { sendPaymentRequest } from '../redux/actions/account';
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
import ResponsiveDialog from './Dialog';

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
  resume: inputResume,
  fieldOfInterest: inputFieldOfInterest,
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
  const [gender, setGender] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [university, setUniversity] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [introduction_method, setIntroduction_method] = React.useState('');
  const [city, setCity] = React.useState('');
  const [agreement, setAgreement] = React.useState(false);
  const [openToWork, setOpenToWork] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [github, setGithub] = React.useState('');
  const [linkedIn, setLinkedIn] = React.useState('');
  const [resume, setResume] = React.useState(null);
  const [fieldOfInterset, setFieldOfInterest] = React.useState('');

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCaptureResume = ({ target }) => {
    setResume(target);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(target.files[0]);
    fileReader.onload = (e) => {
      setResume(e.target.result);
    };
  };

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
    setResume(inputResume);
    setOpenToWork(inputOpenToWork);
    setFieldOfInterest(inputFieldOfInterest);
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
    inputResume,
    inputFieldOfInterest,
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
      toast.error('Please fill all the required fields');
      return;
    } else if (!agreement && isRegisteration) {
      toast.error('You should agree to our condition');
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
      openToWork !== inputOpenToWork ||
      resume !== inputResume ||
      fieldOfInterset !== inputFieldOfInterest
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
        social_media_ids: JSON.stringify({
          github,
          linkedin: linkedIn,
        }),
        agreement,
        open_to_work: openToWork,
        resume,
        field_of_interest: fieldOfInterset,
      });
    }
    if (isRegisteration) sendPaymentRequest(thisSeries);
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
            placeholder="First name *"
          />
        </div>
        <div className="col-12 col-lg">
          <input
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Last name *"
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
            placeholder="City *"
          />
        </div>

        <div className="col-12 col-lg">
          <input
            name="date"
            type="text"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="Birthdate *"
            className="text-input form-control"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <FormControl>
            <div className="form-label pt-0 mr-3">Gender: *</div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={'Male'}
              value={gender}
              name="radio-buttons-group">
              {genderTypes.map((type) => (
                <FormControlLabel
                  key={type}
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
            placeholder="University *"
          />
        </div>
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Major *"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            value={fieldOfInterset}
            onChange={(e) => setFieldOfInterest(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Fields of interset (optional)"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <FormControl>
            <div className="form-label pt-0 mr-3">Grade: *</div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={'Bachelor'}
              value={grade}
              name="radio-buttons-group">
              {gradeTypes.map((type) => (
                <FormControlLabel
                  key={type}
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
              Introduction method *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={introduction_method}
              label="Introduction method *"
              onChange={(e) => setIntroduction_method(e.target.value)}>
              {introductionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg">
          <Button
            component="label"
            className="col-12 col-lg btn btn-lg btn-primary btn-blue mb-5">
            {resume ? 'Uploaded' : 'Upload Resume (optional)'}
            <input type="file" hidden onChange={handleCaptureResume} />
          </Button>
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
                <div>
                  I agree to{' '}
                  <a
                    style={{ textDecoration: 'underline' }}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickOpenDialog();
                    }}>
                    terms of service
                  </a>
                </div>
                <ResponsiveDialog
                  handleClose={handleCloseDialog}
                  open={dialogOpen}
                />
              </label>
            </div>
          </div>
        </>
      ) : undefined}
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
      <div className="row">
        <div className="col-12 col-lg">
          <button
            disabled={isFetching || paymentProcess}
            type="submit"
            className="btn btn-lg btn-primary btn-dark mb-5">
            {isRegisteration ? 'Go For Payment' : 'Update Profile'}
          </button>
        </div>
      </div>
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
    date_of_birth: dateOfBirth,
    social_media_ids,
    resume,
    open_to_work,
    field_of_interest,
  } = state.Participant;
  const { isFetching: paymentProcess } = state.account;
  const { isRegisteration } = ownProps;
  const socialMediaIds = social_media_ids
    ? JSON.parse(social_media_ids)
    : social_media_ids;
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
    github: socialMediaIds.github,
    linkedIn: socialMediaIds.linkedin,
    isRegisteration,
    resume,
    openToWork: open_to_work,
    fieldOfInterest: field_of_interest,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  sendPaymentRequest,
  doesUserHaveRegistered,
})(Form);
