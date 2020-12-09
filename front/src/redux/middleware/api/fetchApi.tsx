const checkErrorsStatusCode = (response) => {
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
    throw new Error('Your token has been expired');
  }
  if (response.status === 403) {
    // throw new Error('شما دسترسی ندارید!');
    throw new Error('You dont have access!');
  }
};

const fetchApi = async (url: RequestInfo, fetchOptions?: RequestInit) => {
  const response = await fetch(url, fetchOptions);
  checkErrorsStatusCode(response);
  const json_response = await response.json();
  if (!response.ok) {
    if (json_response.error) {
      throw new Error(json_response.error);
    } else {
      throw new Error('error'); //todo: it was 'response.text' instead of 'error' at first
    }
  }
  return json_response;
};

export default fetchApi;
