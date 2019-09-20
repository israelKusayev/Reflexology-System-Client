import React from 'react';
import ReactInputMask from 'react-input-mask';
import { Field, ErrorMessage } from 'formik';
import FormLabel from './formLabel';

const InputMask = ({ label, name, required = false, touched, onBlur, className, error, value, ...rest }) => {
  const inputClassName = `form-control ltr input-mask  ${
    error && touched ? 'is-invalid' : value && value !== '__/__/____' ? 'is-valid' : ''
  } ${className}`;

  const labelClassName = error && touched ? 'text-danger' : value && value !== '__/__/____' ? 'text-success' : '';

  return (
    <div className="form-group">
      {label && (
        <>
          <FormLabel className={labelClassName} name={name} required={required}>
            {label}
          </FormLabel>
          <br />
        </>
      )}
      <Field
        name={name}
        render={({ field }) => {
          return (
            <ReactInputMask
              name={name}
              className={inputClassName}
              value={value}
              {...field}
              {...rest}
              onBlur={e => {
                field.onBlur(e);
                onBlur(e);
              }}
            />
          );
        }}
      />
      <ErrorMessage component="small" className="text-danger" name={name} />
    </div>
  );
};

export default React.memo(InputMask);
