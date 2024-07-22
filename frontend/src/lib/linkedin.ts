export function getLinkedInAddToProfileURL(
  name: string,
  organizationId: number,
  issueDate: Date,
  url: string,
  id: string,
) {
  return encodeURI(
    `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${name}&organizationId=${organizationId}&issueYear=${issueDate.getFullYear()}&issueMonth=${issueDate.getMonth()}&certUrl=${url}&certId=${id}`,
  );
}
