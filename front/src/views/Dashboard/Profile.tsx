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
  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3">
          <div className="title">Profile</div>
        </div>
      </div>
      <Form isRegisteration={false} />
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
