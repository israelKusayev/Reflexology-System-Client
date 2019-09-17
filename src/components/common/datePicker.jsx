import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const DatePicker = ({ label, name, onChange, value, error = '', required = false, hasTime = true, ...rest }) => {
  const inputClassName = `form-control  ${error ? 'is-invalid' : value ? 'is-valid' : ''}`;
  const labelClassName = error ? 'text-danger' : value ? 'text-success' : '';

  return (
    <div className='form-group'>
      <label className={labelClassName} htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : null}
        {label}
      </label>
      <br />
      <ReactDatePicker
        className={inputClassName}
        todayButton={'היום'}
        selected={value}
        showTimeSelect={hasTime}
        timeFormat='HH:mm'
        timeCaption='שעה'
        onChange={e => onChange({ target: { name: name, value: e ? moment(e).toDate() : '' } })}
        // dateFormat='LL'
        dateFormat={hasTime ? 'dd/MM/yyyy h:mm' : 'dd/MM/yyyy'}
        {...rest}
      />
      {error && <small className='text-danger d-block'>{error}</small>}
    </div>
  );
};

export default DatePicker;
