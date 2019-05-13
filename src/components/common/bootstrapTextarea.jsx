import React from 'react';

const BootstrapTextarea = ({
  label,
  name,
  onChange,
  value,
  autoFocus = false,
  required = false
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {required ? <span className='text-danger'>*</span> : null} {label}
      </label>
      <textarea
        className='form-control'
        id={name}
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </div>
  );
};

export default BootstrapTextarea;
