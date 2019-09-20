import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { ErrorMessage } from 'formik';
import FormLabel from './formLabel';

const DatePicker = ({
  label,
  name,
  onChange,
  value,
  touched,
  error = '',
  required = false,
  hasTime = true,
  ...rest
}) => {
  const inputClassName = `form-control  ${error && touched ? 'is-invalid' : value ? 'is-valid' : ''}`;
  const labelClassName = error && touched ? 'text-danger' : value ? 'text-success' : '';

  return (
    <div className="form-group">
      <FormLabel className={labelClassName} name={name} required={required}>
        {label}
      </FormLabel>
      <br />
      <ReactDatePicker
        className={inputClassName}
        todayButton="היום"
        selected={value}
        showTimeSelect={hasTime}
        timeFormat="HH:mm"
        timeCaption="שעה"
        onChange={val => {
          console.log(name, val);
          onChange(name, val);
        }}
        // dateFormat='LL'
        dateFormat={hasTime ? 'dd/MM/yyyy h:mm' : 'dd/MM/yyyy'}
        {...rest}
      />
      <ErrorMessage component="small" className="text-danger d-block" name={name} />
    </div>
  );
};

export default React.memo(DatePicker);
