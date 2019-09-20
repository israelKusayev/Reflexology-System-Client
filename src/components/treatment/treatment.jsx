import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import convertDayToText from '../../utils/convertDayToText';
import PatientName from '../patient/patientName';

const Treatment = ({ treatment, currentPatient, history, isPatientsExists }) => {
  if (!isPatientsExists) {
    history.push('/patients');
    return null;
  }

  const { visitReason, treatmentNumber, referredBy, findings, recommendations, remarks, reminders, _id } = treatment;

  const date = moment(treatment.date);
  console.log(findings.split('\\n'));

  return (
    <>
      <h1 className="text-center bold">טיפול</h1>
      <h4 className="bold">פרטי לקוח</h4>
      <p>
        <PatientName patient={currentPatient} />
      </p>

      <h4 className="bold">תאריך</h4>
      <p>
        {date.format('DD/MM/YYYY')} יום {convertDayToText(date.day())}
      </p>

      {visitReason && (
        <>
          <h4 className="bold">סיבת ביקור</h4>
          <p>{visitReason} </p>
        </>
      )}

      <>
        <h4 className="bold">מספר טיפול</h4>
        <p>{treatmentNumber} </p>
      </>

      {referredBy && (
        <>
          <h4 className="bold">הופנה ע"י</h4>
          <p>{referredBy} </p>
        </>
      )}

      {findings && (
        <>
          <h4 className="bold">ממצאים</h4>
          <p>{findings} </p>
        </>
      )}

      {recommendations && (
        <>
          <h4 className="bold">המלצות</h4>
          <p>{recommendations} </p>
        </>
      )}

      {/* ישן */}
      {remarks && (
        <>
          <h4 className="bold">הערות</h4>
          <p>{remarks} </p>
        </>
      )}

      {reminders && (
        <>
          <h4 className="bold">תזכורות</h4>
          <p>{reminders} </p>
        </>
      )}

      <button className="btn btn-outline-secondary" onClick={() => history.push('/edit-treatment/' + _id)}>
        ערוך
      </button>
    </>
  );
};
const mapStateToProps = (state, ownProps) => ({
  isPatientsExists: state.patients.patients.length !== 0,
  treatment: state.treatments.find(t => t._id === ownProps.match.params.id),
  currentPatient: state.patients.patients.find(p => p._id === state.patients.currentPatient)
});

export default connect(mapStateToProps)(Treatment);
