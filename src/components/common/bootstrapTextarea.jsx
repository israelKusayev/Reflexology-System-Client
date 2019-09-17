import React from 'react';
import { Field } from 'formik';

const BootstrapTextarea = ({
  label,
  name,
  onChange,
  value,
  error = '',
  autoFocus = false,
  required = false,
  rows = 2,
  ...rest
}) => {
  const textareaClassName = `form-control  ${error ? 'is-invalid' : value ? 'is-valid' : ''}`;
  const labelClassName = error ? 'text-danger' : value ? 'text-success' : '';

  return (
    <div className='form-group'>
      <label className={labelClassName} htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : null}
        {label}
      </label>
      <Field
        className={textareaClassName}
        id={name}
        name={name}
        rows={value ? rows - 1 + value.split('\n').length : rows}
        autoFocus={autoFocus}
        {...rest}
        // onChange={e => {
        //   e.target.rows = rows - 1 + e.target.value.split('\n').length;
        //   onChange(e);
        // }}
      />
      {error && <small className='text-danger'>{error}</small>}
    </div>
  );
};

export default React.memo(BootstrapTextarea);
