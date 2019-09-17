import moment from 'moment';
import * as Yup from 'yup';

Yup.addMethod(Yup.date, 'format', function(formats) {
  return this.transform(function(value, originalValue) {
    value = moment(originalValue, formats);
    return value.isValid() ? value.toDate() : new Date('');
  });
});
