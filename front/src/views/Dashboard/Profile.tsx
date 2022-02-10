import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Form from '../../components/Form';
import { getProfile, updateProfile } from '../../redux/actions/participant';

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
  const [introduction_method, setIntroduction_method] = React.useState('');
  const [city, setCity] = React.useState(inputCity);
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    getProfile();
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
  }, [
    inputFirstName,
    inputLastName,
    inputUniversity,
    inputIntroductionMethod,
    inputGender,
    inputGrade,
    inputCity,
    inputEmail,
  ]);

  const doUpdateProfile = (e) => {
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
        email
      )
    ) {
      toast.error('Please fill all the required fields');
      return;
    }
    if (
      first_name !== inputFirstName ||
      last_name !== inputLastName ||
      gender !== inputGender ||
      grade !== inputGrade ||
      university !== inputUniversity ||
      city !== inputCity ||
      introduction_method !== inputIntroductionMethod
    ) {
      updateProfile({
        first_name,
        last_name,
        gender,
        grade,
        university,
        city,
        introduction_method,
      });
    }
  };

  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">Profile</div>
        </div>
      </div>
      <Form isRegisteration="false" />
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
  getProfile,
  updateProfile,
})(Profile);
