import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const DatePicker = ({ label, name, onChange, value, required = false, hasTime = true, ...rest }) => {
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
        showTimeSelect={hasTime}
        timeFormat='HH:mm'
        timeCaption='שעה'
        onChange={e => onChange({ target: { name: name, value: e ? moment(e).toDate() : '' } })}
        // dateFormat='LL'
        dateFormat={hasTime ? 'dd/MM/yyyy h:mm' : 'dd/MM/yyyy'}
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
