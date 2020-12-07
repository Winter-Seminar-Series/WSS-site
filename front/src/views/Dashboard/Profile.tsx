import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/participant';

function Profile({
  getProfile,
  isFetching,
  isLoggedIn,
  id,
  username,
  email,
  token,
  expiry,
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
}) {
  return <>this is profile</>;
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
})(Profile);
