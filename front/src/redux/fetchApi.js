const checkErrorsStatusCode = (response) => {
  if (response.status === 500) {
    throw new Error('ایراد سروری رخ داده‌است! ما رو مطلع کنید.');
  }
  if (response.status === 404) {
    throw new Error('صفحه مورد نظر یافت نشد!');
  }
  if (response.status === 401) {
    throw new Error('توکن شما منقضی شده است!');
  }
};

const fetchApi = async (url, fetchOptions) => {
  const response = await fetch(url, fetchOptions);
  checkErrorsStatusCode(response);
  const json_response = await response.json();
  if (!response.ok) {
    if (json_response.error) {
      throw new Error(json_response.error);
    } else {
      throw new Error(response.text);
    }
  }
  return json_response;
};

export default fetchApi;
