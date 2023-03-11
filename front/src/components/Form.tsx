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
  emphasize,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ResponsiveDialog from './Dialog';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import fetchApi from '../redux/middleware/api/fetchApi';
import { ROOT } from '../redux/actions/urls';

function Form({
  thisSeries,
  updateProfile,
  getProfile,
  doesUserHaveRegistered,
  sendPaymentRequest,
  paymentProcess,
  token,
  isFetching,
  first_name: inputFirstName,
  last_name: inputLastName,
  university: inputUniversity,
  introduction_method: inputIntroductionMethod,
  gender: inputGender,
  grade: inputGrade,
  is_online_attendant: inputIsOnlineAttendant,
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
  job: inputJob,
  phoneNumber: inputPhoneNumber,
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
    'Quera',
    'SMS',
    'Email',
    'Friends',
    'Other',
  ];

  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [is_online_attendant, setIsOnlineAttendant] = React.useState(true);
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
  const [job, setJob] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [discountIsFocused, setDiscountIsFocused] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCaptureResume = ({ target }) => {
    setResume(target);
    const file = target.files[0];
    const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setResume({ name: fileName, extension, content: e.target.result });
    };
  };

  useEffect(() => {
    getProfile();
    doesUserHaveRegistered(thisSeries);
  }, [getProfile]);

  useEffect(() => {
    if (discountIsFocused || is_online_attendant === undefined) return;

    //TODO move this to redux or undo hardcoding series name
    fetchApi(`${ROOT}8th/payment/price?is_online_attendant=${is_online_attendant}&discount=${discount}`, {
      headers: {
        Authorization: `Token ${token}`
      },
      method: 'GET',
    }).then((response) => {
      setPrice(response.price ?? 0);
    });
  }, [discount, discountIsFocused, is_online_attendant]);

  useEffect(() => {
    setFirstName(inputFirstName);
    setLastName(inputLastName);
    setIntroduction_method(inputIntroductionMethod)
    setGender(inputGender)
    setGrade(inputGrade)
    setIsOnlineAttendant(inputIsOnlineAttendant)
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
    setPhoneNumber(inputPhoneNumber);
    setJob(inputJob);
  }, [
    inputFirstName,
    inputLastName,
    inputUniversity,
    inputIntroductionMethod,
    inputGender,
    inputGrade,
    inputIsOnlineAttendant,
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
    inputJob,
    inputPhoneNumber,
  ]);
  const submitInfo = (e) => {
    e.preventDefault();
    if (
      !(
        first_name &&
        last_name &&
        gender &&
        grade &&
        is_online_attendant != null &&
        university &&
        city &&
        introduction_method &&
        dateOfBirth &&
        major &&
        phoneNumber &&
        job
      )
    ) {
      toast.error('Please fill all the required fields');
      return;
    } else if (!agreement && isRegisteration) {
      toast.error('You should agree to our terms of service');
      return;
    }
    // if (
    //   first_name !== inputFirstName ||
    //   last_name !== inputLastName ||
    //   gender !== inputGender ||
    //   grade !== inputGrade ||
    //   university !== inputUniversity ||
    //   city !== inputCity ||
    //   introduction_method !== inputIntroductionMethod ||
    //   linkedIn !== inputLinkedIn ||
    //   github !== inputGithub ||
    //   major !== inputMajor ||
    //   dateOfBirth !== inputDateOfBirth ||
    //   agreement !== inputAgreement ||
    //   openToWork !== inputOpenToWork ||
    //   resume !== inputResume ||
    //   fieldOfInterset !== inputFieldOfInterest ||
    //   job !== inputJob ||
    //   phoneNumber !== inputPhoneNumber
    // ) {
    updateProfile({
      first_name,
      last_name,
      gender,
      grade,
      is_online_attendant,
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
      resume: JSON.stringify(resume),
      field_of_interest: fieldOfInterset,
      job,
      phone_number: phoneNumber,
    }).then(() => {
      if (isRegisteration) sendPaymentRequest(discount, thisSeries);
    });
    // }
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Custom input"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    {...inputProps}
                    ref={inputRef}
                    required
                    placeholder="Birthdate *"
                    className="text-input form-control"
                  />
                  {InputProps?.endAdornment}
                </div>
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <PhoneInput
            country="ir"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
            inputClass="text-input form-control"
            inputStyle={{ width: '100%' }}
            placeholder="Phone Number *"
          />
        </div>
        <div className="col-12 mb-3 col-lg mb-lg-0">
          <input
            value={job}
            onChange={(e) => setJob(e.target.value)}
            type="text"
            className="text-input form-control"
            placeholder="Job *"
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
          <FormControl>
            <div className="form-label pt-0 mr-3">Mode of Attendance: *</div>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={is_online_attendant}
              name="radio-buttons-group">
              <FormControlLabel
                key={'Online'}
                value={true}
                label={'Online'}
                control={<Radio onChange={() => setIsOnlineAttendant(true)} />}
              />
              <FormControlLabel
                key={'In person'}
                value={false}
                label={'In person'}
                control={<Radio onChange={() => setIsOnlineAttendant(false)} />}
              />
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
          <Button
            component="label"
            className="col-12 col-lg btn btn-lg btn-secondary mb-1">
            {resume ? 'Resume Uploaded' : 'Upload Resume (optional)'}
            <input type="file" hidden onChange={handleCaptureResume} />
          </Button>
        </div>
      </div>

      <div className="row">
        <em className="mb-1">
          To increase your chance of getting hired by our sponsors, fill out the
          optional fields!
        </em>
      </div>

      {isRegisteration ? (
        <>
          <div className="row">
            <div className="col-12 mb-3 col-lg mb-lg-0">
              <input
                value={discount}
                onFocus={() => setDiscountIsFocused(true)}
                onBlur={() => setDiscountIsFocused(false)}
                onChange={(e) => setDiscount(e.target.value)}
                type="password"
                className="text-input form-control"
                placeholder="Enter discount code"
              />
            </div>
          </div>
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

      <div className="row">
        <div className="col-12 col-lg">
          <button
            disabled={isFetching || paymentProcess}
            type="submit"
            className="col-12 col-lg btn btn-lg btn-primary mb-5">
            {isRegisteration ? (
              <>Go For Payment {price ? ` • ${price}` : ''}</>
            ) : (
              'Update Profile'
            )}
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
    job,
    phone_number,
  } = state.Participant;
  const { isFetching: paymentProcess, token } = state.account;
  const { isRegisteration } = ownProps;
  const socialMediaIds = social_media_ids
    ? JSON.parse(social_media_ids)
    : social_media_ids;
  return {
    thisSeries: state.account.thisSeries,
    paymentProcess,
    token,
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
    job,
    phoneNumber: phone_number,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  sendPaymentRequest,
  doesUserHaveRegistered,
})(Form);
