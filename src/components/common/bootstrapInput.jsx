import React from 'react';

const BootstrapInput = ({
  label,
  name,
  onChange,
  value,
  type = 'text',
  autoFocus = false,
  required = false
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {required ? <span className='text-danger'>*</span> : null} {label}
      </label>
      <input
        className='form-control'
        type={type}
        id={name}
        name={name}
        value={value}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </div>
  );
};

export default BootstrapInput;
