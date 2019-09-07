import moment from 'moment';

export function calcBirthday(date) {
  const now = moment(new Date());

  return moment.duration(now.diff(moment(date)));
}
