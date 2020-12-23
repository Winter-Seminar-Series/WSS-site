const checkErrorsStatusCode = (response, json_response) => {
  if (response.status === 500) {
    // throw new Error('ایراد سروری رخ داده‌است! ما رو مطلع کنید.');
    throw new Error('Internal Server Error! Contact Us!');
  }
  if (response.status === 404) {
    // throw new Error('صفحه مورد نظر یافت نشد!');
    throw new Error('Not Found!');
  }
  if (response.status === 401) {
    // throw new Error('توکن شما منقضی شده است!');
    throw new Error('TOKEN EXPIRED');
  }
  if (response.status === 403) {
    // throw new Error('شما دسترسی ندارید!');
    throw new Error('You don\'t have access!');
  }

  // creating account:
  if (response.status === 400 && json_response.username) {
    if (json_response.username[0] === 'A user with that username already exists.') {
      throw new Error('A user with this username already exists.');
    }
  }

  if (response.status === 400 && json_response.email) {

    //create account
    if (json_response.email[0] === 'Enter a valid email address.') {
      throw new Error('Please enter a valid email address.');
    }
    if (json_response.email[0] === 'user with this email address already exists.') {
      throw new Error('A User with this email address already exists.');
    }

    // request password reset
    if (json_response.email[0] === 'There is no active user associated with this e-mail address or the password can not be changed') {
      throw new Error('There is no account with this email.');
    }
  }

  //reset password
  if (response.status === 400 && json_response.status) {
    throw new Error('Invalid token');
  }

  if (response.status === 400 && json_response.password) {
    throw new Error(json_response.password[0]);
  }
};

const fetchApi = async (url: RequestInfo, fetchOptions?: RequestInit) => {
  const response = await fetch(url, fetchOptions);
  const json_response = await response.json();
  checkErrorsStatusCode(response, json_response);
  if (!response.ok) {
    throw new Error(json_response.message || 'error');
  }
  return json_response;
};

export default fetchApi;
