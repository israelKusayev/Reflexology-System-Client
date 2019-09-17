import moment from 'moment';

export function getDurationFromNow(start) {
  const now = moment.utc();

  return moment.duration(now.diff(start));
}

export function convertDateToAge(date) {
  const utcDate = moment.utc(date, 'DD/MM/YYYY');
  const diff = getDurationFromNow(utcDate);

  return diff.isValid() && !utcDate.isAfter(moment())
    ? diff.years() + '.' + diff.months()
    : '';
}

export function convertDateToString(inputFormat) {
  const pad = s => (s < 10 ? '0' + s : s);

  const date = new Date(inputFormat);
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear()
  ].join('/');
}
