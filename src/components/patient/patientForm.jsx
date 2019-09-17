import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import BootstrapInput from '../common/bootstrapInput';
import InputMask from '../common/inputMask';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { convertDateToAge } from '../../utils/common';

const PatientSchema = Yup.object().shape({
  firstName: Yup.string().required('שדה חובה'),
  lastName: Yup.string().required('שדה חובה'),
  birthday: Yup.date()
    .max(moment(), 'תאריך חייב להיות קטן מהיום')
    .format('DD/MM/YYYY')
    .typeError('תאריך לא תקין'),
  email: Yup.string().email('אימיל לא תקין')
});

function PatientForm({ data, onSubmit, error }) {
  return (
    <div className='row justify-content-center' style={{ marginTop: '20px' }}>
      <div className='card patient-card col-md-7' style={{ padding: 0 }}>
        <Formik enableReinitialize initialValues={data} onSubmit={onSubmit} validationSchema={PatientSchema}>
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form>
              <PerfectScrollbar style={{ maxHeight: '78vh', direction: 'ltr' }} options={{ suppressScrollX: true }}>
                <div className='card-body row' style={{ direction: 'rtl' }}>
                  <div className='col-md-8 mx-auto'>
                    <BootstrapInput
                      label='שם משפחה'
                      name='lastName'
                      error={errors.lastName}
                      touched={touched.lastName}
                      value={values.lastName}
                      required={true}
                      autoFocus={true}
                    />

                    <BootstrapInput
                      label='שם פרטי'
                      name='firstName'
                      error={errors.firstName}
                      touched={touched.firstName}
                      value={values.firstName}
                      required={true}
                    />

                    <BootstrapInput
                      label='שם האם'
                      name='momName'
                      error={errors.momName}
                      touched={touched.momName}
                      value={values.momName}
                    />

                    <InputMask
                      label='תאריך לידה'
                      name='birthday'
                      error={errors.birthday}
                      touched={touched.birthday}
                      value={values.birthday}
                      onBlur={e => {
                        const age = convertDateToAge(e.target.value);
                        setFieldValue('age', age);
                      }}
                      mask='99/99/9999'
                    />

                    <BootstrapInput
                      label='גיל'
                      name='age'
                      error={errors.age}
                      touched={touched.age}
                      value={values.age}
                    />

                    <BootstrapInput
                      label='טלפון'
                      name='phone'
                      error={errors.phone}
                      touched={touched.phone}
                      value={values.phone}
                    />

                    <BootstrapInput
                      label='אימיל'
                      name='email'
                      error={errors.email}
                      touched={touched.email}
                      value={values.email}
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
                <button disabled={isSubmitting} type='submit' className='btn btn-primary btn-block'>
                  שמור
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default React.memo(PatientForm);
