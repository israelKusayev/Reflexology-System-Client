import React from 'react';
import BootstrapInput from '../common/bootstrapInput';
import BootstrapTextarea from '../common/bootstrapTextarea';
import DatePicker from '../common/datePicker';
import PatientName from '../patient/patientName';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const TreatmentSchema = Yup.object().shape({
  date: Yup.date()
    .required('שדה חובה')
    .nullable(),
  treatmentNumber: Yup.number()
    .required('שדה חובה')
    .min(0, 'ערך לא יכול להיות שלילי')
});

const TreatmentForm = ({ patient, data, onSubmit, error }) => {
  return (
    <div className="row justify-content-center" style={{ marginTop: '20px' }}>
      <div className="card treatment-card col-md-7" style={{ padding: 0 }}>
        <div className="card-header">
          <PatientName className="mb-2 d-block bold" patient={patient || {}} />
        </div>
        <Formik enableReinitialize onSubmit={onSubmit} initialValues={data} validationSchema={TreatmentSchema}>
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form>
              <PerfectScrollbar style={{ maxHeight: '70vh', direction: 'ltr' }} options={{ suppressScrollX: true }}>
                <div className="card-body row" style={{ direction: 'rtl' }}>
                  <div className="col-md-8 mx-auto">
                    <DatePicker
                      label="תאריך"
                      name="date"
                      value={values.date}
                      error={errors.date}
                      touched={touched.date}
                      onChange={setFieldValue}
                    />
                    <BootstrapTextarea
                      label="סיבת ביקור"
                      name="visitReason"
                      error={errors.visitReason}
                      touched={touched.visitReason}
                      value={values.visitReason}
                      autoFocus={true}
                    />
                    <BootstrapInput
                      label="מספר טיפול"
                      name="treatmentNumber"
                      type="number"
                      error={errors.treatmentNumber}
                      touched={touched.treatmentNumber}
                      value={values.treatmentNumber}
                    />
                    <BootstrapInput
                      label='הופנה ע"י'
                      name="referredBy"
                      error={errors.referredBy}
                      touched={touched.referredBy}
                      value={values.referredBy}
                    />
                    <BootstrapTextarea
                      label="ממצאים"
                      name="findings"
                      error={errors.findings}
                      touched={touched.findings}
                      value={values.findings}
                    />
                    <BootstrapTextarea
                      label="המלצות"
                      name="recommendations"
                      error={errors.recommendations}
                      touched={touched.recommendations}
                      value={values.recommendations}
                    />
                    <BootstrapTextarea
                      label="תזכורות"
                      name="reminders"
                      error={errors.reminders}
                      touched={touched.reminders}
                      value={values.reminders}
                    />
                    <DatePicker
                      hasTime={false}
                      label="תאריך תזכורת"
                      name="reminderDate"
                      onChange={setFieldValue}
                      value={values.reminderDate}
                      minDate={new Date()}
                      isClearable={true}
                    />

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </PerfectScrollbar>
              <div className="card-footer">
                <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block">
                  שמור
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default React.memo(TreatmentForm);
