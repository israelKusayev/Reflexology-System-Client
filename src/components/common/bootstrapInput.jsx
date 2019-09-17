import React from 'react';
import { Field, ErrorMessage } from 'formik';

const BootstrapInput = ({
  label,
  name,
  value,
  error = '',
  touched,
  type = 'text',
  autoFocus = false,
  required = false
}) => {
  const inputClassName = `form-control  ${error && touched ? 'is-invalid' : value ? 'is-valid' : ''}`;
  const labelClassName = error && touched ? 'text-danger' : value ? 'text-success' : '';
  return (
    <div className='form-group'>
      <label className={labelClassName} htmlFor={name}>
        {required ? <span className='text-danger'>* </span> : ''}
        {label}
      </label>
      <Field className={inputClassName} type={type} id={name} name={name} autoFocus={autoFocus} />
      <ErrorMessage component='small' className='text-danger' name={name} />
    </div>
  );
};

export default React.memo(BootstrapInput);
