export function convertTimeToDate(time: string) {
  const [hours, minutes, seconds] = time.split(':');

  const date = new Date();

  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(parseInt(seconds));

  return date;
}

export function getOrderedDay(day?: number) {
  if (!day) return '';

  if (day === 1 || day === 21 || day === 31) return `${day}st`;
  else if (day === 2 || day === 22) return `${day}nd`;
  else if (day === 3 || day === 23) return `${day}rd`;

  return `${day}th`;
}
