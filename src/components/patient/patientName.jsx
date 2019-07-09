import React from 'react';

const PatientName = ({ patient: { firstName, lastName, momName }, ...props }) => {
  return <span {...props}>{firstName + ' ' + lastName + ' ' + (momName ? '(' + momName + ')' : '')}</span>;
};

export default PatientName;
