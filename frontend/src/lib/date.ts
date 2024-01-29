export function convertTimeToDate(time: string) {
    const [hours, minutes, seconds] = time.split(':');

    const date = new Date();

    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(seconds));

    return date;
}