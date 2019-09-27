import React from 'react';

const PatientName = ({ patient: { firstName, lastName, momName, calculatedAge, phone }, ...props }) => {
  return (
    <span {...props}>
      <span className="mr-2">
        <span>{`${firstName}  ${lastName} `}</span>
        {momName && <span>{`(${momName}) `}</span>}
      </span>
      {calculatedAge && <span className="mr-2">{`גיל: ${calculatedAge} `}</span>}
      {phone && <span>{`טלפון: ${phone} `}</span>}
    </span>
  );
};

export default React.memo(PatientName);
