import React from 'react';
import BootstrapInput from '../common/bootstrapInput';
import BootstrapTextarea from '../common/bootstrapTextarea';

const TreatmentForm = ({ data, onSubmit, onChange, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <BootstrapInput
        label='תאריך ושעה'
        name='date'
        type='date'
        value={data.date}
        onChange={onChange}
      />
      <BootstrapTextarea
        label='סיבת ביקור'
        name='visitReason'
        value={data.visitReason}
        onChange={onChange}
        autoFocus={true}
      />
      <BootstrapTextarea
        label='מספר טיפול'
        name='treatmentNumber'
        value={data.treatmentNumber}
        onChange={onChange}
      />
      <BootstrapInput
        label='הופנה ע"י'
        name='referredBy'
        value={data.referredBy}
        onChange={onChange}
      />
      <BootstrapTextarea
        label='ממצאים'
        name='findings'
        value={data.findings}
        onChange={onChange}
      />
      <BootstrapTextarea
        label='המלצות'
        name='recommendations'
        value={data.recommendations}
        onChange={onChange}
      />
      <BootstrapTextarea
        label='הערות'
        name='remarks'
        value={data.remarks}
        onChange={onChange}
      />

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
