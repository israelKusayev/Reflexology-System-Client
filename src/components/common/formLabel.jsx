import React from 'react';

const FormLabel = ({ className, name, required, children }) => {
  return (
    <label className={className} htmlFor={name}>
      {required ? <span className="text-danger">* </span> : null}
      {children}
    </label>
  );
};

export default React.memo(FormLabel);
