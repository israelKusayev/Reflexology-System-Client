import React from 'react';
import { Field, ErrorMessage } from 'formik';
import FormLabel from './formLabel';

const BootstrapTextarea = ({
  label,
  name,
  onChange,
  value,
  touched,
  error = '',
  autoFocus = false,
  required = false,
  rows = 2,
  ...rest
}) => {
  const textareaClassName = `form-control  ${error && touched ? 'is-invalid' : value ? 'is-valid' : ''}`;
  const labelClassName = error && touched ? 'text-danger' : value ? 'text-success' : '';
  return (
    <div className="form-group">
      <FormLabel className={labelClassName} name={name} required={required}>
        {label}
      </FormLabel>
      <Field
        className={textareaClassName}
        id={name}
        name={name}
        component="textarea"
        style={{ overflow: 'hidden' }}
        autoFocus={autoFocus}
        {...rest}
        onKeyDown={e => {
          e.target.style.height = 'inherit';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <ErrorMessage component="small" className="text-danger" name={name} />
    </div>
  );
};

export default React.memo(BootstrapTextarea);
