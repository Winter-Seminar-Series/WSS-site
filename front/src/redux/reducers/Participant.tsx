import * as actionTypes from '../actionTypes';

const initState = {
  isFetching: false,
  isLoggedIn: false,
  isRegistered: false,
  registeredWorkshops: [],
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  age: '',
  job: '',
  university: '',
  introduction_method: '',
  gender: '',
  city: '',
  country: '',
  field_of_interest: '',
  grade: '',
  is_student: false,
  favorite_tags: '',
  major: '',
  date_of_birth: '',
  social_media_ids: '',
  agreement: false,
  open_to_work: false,
  resume: null,
};

function Participant(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        username: action.response.username,
        email: action.response.email,
        first_name: action.response.first_name,
        last_name: action.response.last_name,
        phone_number: action.response.phone_number,
        age: action.response.age,
        job: action.response.job,
        university: action.response.university,
        introduction_method: action.response.introduction_method,
        gender: action.response.gender,
        city: action.response.city,
        country: action.response.country,
        field_of_interest: action.response.field_of_interest,
        grade: action.response.grade,
        is_student: action.response.is_student,
        favorite_tags: action.response.favorite_tags,
        major: action.response.major,
        date_of_birth: action.response.date_of_birth,
        social_media_ids: action.response.social_media_ids,
        agreement: action.response.agreement,
        open_to_work: action.response.open_to_work,
        resume: action.response.resume,
      };

    /////////////////////////

    case actionTypes.REGISTER_WORKSHOP_REQUEST:
    case actionTypes.CANCEL_WORKSHOP_REGISTRATION_REQUEST:
    case actionTypes.GET_PROFILE_REQUEST:
    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        username: action.response.username,
        email: action.response.email,
        first_name: action.response.first_name,
        last_name: action.response.last_name,
        phone_number: action.response.phone_number,
        age: action.response.age,
        job: action.response.job,
        university: action.response.university,
        introduction_method: action.response.introduction_method,
        gender: action.response.gender,
        city: action.response.city,
        country: action.response.country,
        field_of_interest: action.response.field_of_interest,
        grade: action.response.grade,
        is_student: action.response.is_student,
        favorite_tags: action.response.favorite_tags,
        major: action.response.major,
        date_of_birth: action.response.date_of_birth,
        social_media_ids: action.response.social_media_ids,
        agreement: action.response.agreement,
        open_to_work: action.reponse.open_to_work,
        resume: action.response.resume,
      };

    case actionTypes.CHECK_USER_REGISTRATION_STATUS_SUCCESS:
      return {
        ...state,
        isRegistered: action.response.is_registered,
      };

    case actionTypes.GET_REGISTERED_WORKSHOPS_SUCCESS:
      return {
        ...state,
        registeredWorkshops: action.response,
      };

    case actionTypes.REGISTER_WORKSHOP_SUCCESS:
    case actionTypes.REGISTER_WORKSHOP_FAILURE:
    case actionTypes.CANCEL_WORKSHOP_REGISTRATION_SUCCESS:
    case actionTypes.CANCEL_WORKSHOP_REGISTRATION_FAILURE:
    case actionTypes.GET_PROFILE_FAILURE:
    case actionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
}

export default Participant;
