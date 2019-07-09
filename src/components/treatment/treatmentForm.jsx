import React from 'react';
import BootstrapInput from '../common/bootstrapInput';
import BootstrapTextarea from '../common/bootstrapTextarea';
import DatePicker from '../common/datePicker';
import PatientName from '../patient/patientName';

const TreatmentForm = ({ patient, data, onSubmit, onChange, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <PatientName className='mb-2 d-block' patient={patient || {}} />
      <DatePicker label='תאריך' name='date' value={data.date} onChange={onChange} />
      <BootstrapTextarea
        label='סיבת ביקור'
        name='visitReason'
        value={data.visitReason}
        onChange={onChange}
        autoFocus={true}
      />
      <BootstrapInput
        label='מספר טיפול'
        name='treatmentNumber'
        type='number'
        value={data.treatmentNumber}
        onChange={onChange}
      />
      <BootstrapInput label='הופנה ע"י' name='referredBy' value={data.referredBy} onChange={onChange} />
      <BootstrapTextarea label='ממצאים' name='findings' value={data.findings} onChange={onChange} />
      <BootstrapTextarea label='המלצות' name='recommendations' value={data.recommendations} onChange={onChange} />
      <BootstrapTextarea label='הערות' name='remarks' value={data.remarks} onChange={onChange} />

      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      <button type='submit' className='btn btn-primary'>
        שמור
      </button>
    </form>
  );
};

export default TreatmentForm;
