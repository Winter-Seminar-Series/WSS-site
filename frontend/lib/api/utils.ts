type FormDataInput = {
  [key: string]: string | Blob | FormDataInput;
};

export function formDataFromObject(object: FormDataInput) {
  const formData = new FormData();

  function writeToFormData(object: FormDataInput, outerKey: string = '') {
    for (const innerKey in object) {
      const value = object[innerKey];
      const key = outerKey ? outerKey + '.' + innerKey : innerKey;

      if (typeof(value) === "string" || value instanceof Blob) {
        formData.append(key, value);
      } else {
        writeToFormData(value, key);
      }
    }
  }

  writeToFormData(object);

  return formData;
}
