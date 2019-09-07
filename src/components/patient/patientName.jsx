import React from 'react';

const PatientName = ({ patient: { firstName, lastName, momName, age, phone }, ...props }) => {
  return (
    <span {...props}>
      <span className='mr-2'>
        <span>{`${firstName}  ${lastName} `}</span>
        {momName && <span>{`(${momName}) `}</span>}
      </span>
      {age && <span className='mr-2'>{`גיל: ${age} `}</span>}
      {phone && <span>{`טלפון: ${phone} `}</span>}
    </span>
  );
};

export default PatientName;
