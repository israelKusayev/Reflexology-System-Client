import React from 'react';
import ReactInputMask from 'react-input-mask';
// import moment from 'moment';

const InputMask = ({ label, name, required = false, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : null}
        {label}
      </label>
      <br />
      <ReactInputMask name={name} className='form-control ltr input-mask' {...rest} />
    </div>
  );
};

export default InputMask;
