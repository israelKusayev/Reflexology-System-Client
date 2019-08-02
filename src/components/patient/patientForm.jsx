import React from 'react';
import BootstrapInput from '../common/bootstrapInput';

function PatientForm({ data, onSubmit, onChange, error }) {
  return (
    <>
      <div className='row justify-content-center' style={{ marginTop: '20px' }}>
        <div className='card patient-card col-md-7'>
          <div className='card-body row'>
            <form onSubmit={onSubmit} className='col-md-8 mx-auto'>
              <BootstrapInput
                label='שם משפחה'
                name='lastName'
                value={data.lastName}
                onChange={onChange}
                required={true}
                autoFocus={true}
              />

              <BootstrapInput
                label='שם פרטי'
                name='firstName'
                value={data.firstName}
                onChange={onChange}
                required={true}
              />
              <BootstrapInput label='שם האם' name='momName' value={data.momName} onChange={onChange} />

              <BootstrapInput label='גיל' name='age' value={data.age} onChange={onChange} />

              <BootstrapInput label='טלפון' name='phone' value={data.phone} onChange={onChange} />

              <BootstrapInput label='אימיל' name='email' value={data.email} onChange={onChange} />

              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}

              <button type='submit' className='btn btn-primary'>
                שמור
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default PatientForm;
