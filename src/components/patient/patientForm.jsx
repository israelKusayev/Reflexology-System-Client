import React from 'react';

function PatientForm({ data, onSubmit, onChange, error }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='lastName'>
            <span className='text-danger'>*</span> שם משפחה
          </label>
          <input
            autoFocus={true}
            type='text'
            className='form-control'
            id='lastName'
            name='lastName'
            value={data.lastName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>
            <span className='text-danger'>*</span> שם פרטי
          </label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            name='firstName'
            value={data.firstName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='momName'>שם האם</label>
          <input
            type='text'
            className='form-control'
            id='momName'
            name='momName'
            value={data.momName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='age'>גיל</label>
          <input
            type='text'
            className='form-control'
            id='age'
            name='age'
            value={data.age}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>טלפון</label>
          <input
            type='text'
            className='form-control'
            id='phone'
            name='phone'
            value={data.phone}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>אימיל</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={data.email}
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
    </>
  );
}
export default PatientForm;
