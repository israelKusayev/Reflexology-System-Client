import React from 'react';

const BootstrapTextarea = ({
  label,
  name,
  onChange,
  value,
  autoFocus = false,
  required = false,
  rows = 2,
  ...rest
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : null}
        {label}
      </label>
      <textarea
        className='form-control'
        id={name}
        name={name}
        value={value}
        rows={value ? rows - 1 + value.split('\n').length : rows}
        autoFocus={autoFocus}
        {...rest}
        onChange={e => {
          e.target.rows = rows - 1 + e.target.value.split('\n').length;
          onChange(e);
        }}
      />
    </div>
  );
};

export default BootstrapTextarea;
