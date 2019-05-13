import React from 'react';

const PatientName = ({ patient: { firstName, lastName, momName } }) => {
  return (
    <span>
      {firstName + ' ' + lastName + ' ' + (momName ? '(' + momName + ')' : '')}
    </span>
  );
};

export default PatientName;
