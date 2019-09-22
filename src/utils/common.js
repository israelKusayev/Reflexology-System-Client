//@ts-check

import moment from 'moment';

export function getDurationFromNow(start) {
  const now = moment.utc();

  return moment.duration(now.diff(start));
}

export function convertDateToAge(date) {
  const utcDate = moment.utc(date, 'DD/MM/YYYY');
  const diff = getDurationFromNow(utcDate);

  return diff.isValid() && !utcDate.isAfter(moment()) ? diff.years() + '.' + diff.months() : '';
}

export function convertDateToString(inputFormat) {
  const pad = s => (s < 10 ? '0' + s : s);

  const date = new Date(inputFormat);
  return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/');
}

const formats = [moment.ISO_8601, 'DD/MM/YYYY'];
/**
 * @param {{ }} obj
 * @param {string} searchQuery
 */
export function filter(obj, searchQuery) {
  /* eslint-disable no-unused-vars */
  for (const name in obj) {
    if (name === '_id') continue;

    if (Array.isArray(obj[name])) {
      return filter(obj[name][0], searchQuery);
    }

    const date = moment(obj[name], formats, true);
    if (date.isValid()) {
      const formattedDate = date.format('DD/MM/YYYY');

      if (formattedDate.toString().includes(searchQuery)) return true;
      else continue;
    } else if (
      obj[name] &&
      obj[name]
        .toString()
        .toLowerCase()
        .includes(searchQuery)
    )
      return true;
  }
}
