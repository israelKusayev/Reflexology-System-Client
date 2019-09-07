import React from 'react';
import BootstrapInput from '../common/bootstrapInput';
import BootstrapTextarea from '../common/bootstrapTextarea';
import DatePicker from '../common/datePicker';
import PatientName from '../patient/patientName';
import PerfectScrollbar from 'react-perfect-scrollbar';

const TreatmentForm = ({ patient, data, onSubmit, onChange, error }) => {
  return (
    <div className='row justify-content-center' style={{ marginTop: '20px' }}>
      <div className='card treatment-card col-md-7' style={{ padding: 0 }}>
        <div className='card-header'>
          <PatientName className='mb-2 d-block bold' patient={patient || {}} />
        </div>
        <form onSubmit={onSubmit}>
          <PerfectScrollbar style={{ maxHeight: '70vh', direction: 'ltr' }} options={{ suppressScrollX: true }}>
            <div className='card-body row' style={{ direction: 'rtl' }}>
              <div className='col-md-8 mx-auto'>
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
                <BootstrapTextarea
                  label='המלצות'
                  name='recommendations'
                  value={data.recommendations}
                  onChange={onChange}
                />
                <BootstrapTextarea label='תזכורות' name='reminders' value={data.reminders} onChange={onChange} />
                <DatePicker
                  hasTime={false}
                  label='תאריך תזכורת'
                  name='reminderDate'
                  value={data.reminderDate}
                  onChange={onChange}
                  isClearable={true}
                />

                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}
              </div>
            </div>
          </PerfectScrollbar>
          <div className='card-footer'>
            <button type='submit' className='btn btn-primary btn-block'>
              שמור
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreatmentForm;
