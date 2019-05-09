import React from 'react';

const TreatmentForm = ({ data, onSubmit, onChange, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='date'>תאריך ושעה </label>

        <input
          type='date'
          value={data.date}
          className='form-control'
          id='date'
          name='date'
          onChange={onChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='visitReason'>סיבת ביקור</label>
        <textarea
          autoFocus={true}
          className='form-control'
          id='visitReason'
          name='visitReason'
          value={data.visitReason}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='treatmentNumber'>
          <span className='text-danger'>*</span> מספר טיפול
        </label>
        <input
          type='number'
          className='form-control'
          id='treatmentNumber'
          name='treatmentNumber'
          value={data.treatmentNumber}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='referredBy'>הופנה ע"י</label>
        <input
          type='text'
          className='form-control'
          id='referredBy'
          name='referredBy'
          value={data.referredBy}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='findings'>ממצאים</label>
        <textarea
          className='form-control'
          id='findings'
          name='findings'
          value={data.findings}
          onChange={onChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='recommendations'>המלצות</label>
        <textarea
          className='form-control'
          id='recommendations'
          name='recommendations'
          value={data.recommendations}
          onChange={onChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='remarks'>הערות</label>
        <textarea
          className='form-control'
          id='remarks'
          name='remarks'
          value={data.remarks}
          onChange={onChange}
        />
      </div>

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
