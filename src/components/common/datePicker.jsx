import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const DatePicker = ({ label, name, onChange, value, required = false }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : null}
        {label}
      </label>
      <br />
      <ReactDatePicker
        className='form-control'
        todayButton={'היום'}
        selected={value}
        onChange={e => onChange({ target: { name: name, value: moment(e).toDate() } })}
        dateFormat='dd/MM/yyyy'
      />
    </div>
  );
};

export default DatePicker;
