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

  return (
    <>
      <h1 className="text-center bold">טיפול</h1>
      <div className="card border-dark my-5" style={{ width: '50%', margin: 'auto' }}>
        <div className="card-header text-center treatment-header">
          <PatientName patient={currentPatient} />
        </div>
        <div className="card-body text-dark">
          <h4 className="bold">תאריך</h4>
          <p>
            {date.format('DD/MM/YYYY')} יום {convertDayToText(date.day())}
          </p>
          <hr />

          {visitReason && (
            <>
              <h4 className="bold">סיבת ביקור</h4>
              <p>{visitReason} </p>
              <hr />
            </>
          )}

          <>
            <h4 className="bold">מספר טיפול</h4>
            <p>{treatmentNumber} </p>
            <hr />
          </>

          {referredBy && (
            <>
              <h4 className="bold">הופנה ע"י</h4>
              <p>{referredBy} </p>
              <hr />
            </>
          )}

          {findings && (
            <>
              <h4 className="bold">ממצאים</h4>
              <p>{findings} </p>
              <hr />
            </>
          )}

          {recommendations && (
            <>
              <h4 className="bold">המלצות</h4>
              <p>{recommendations} </p>
              <hr />
            </>
          )}

          {/* ישן */}
          {remarks && (
            <>
              <h4 className="bold">הערות</h4>
              <p>{remarks} </p>
              <hr />
            </>
          )}

          {reminders && (
            <>
              <h4 className="bold">תזכורות</h4>
              <p>{reminders} </p>
              <hr />
            </>
          )}
          <button
            className="btn btn-outline-secondary btn-block"
            onClick={() => history.push('/edit-treatment/' + _id)}
          >
            ערוך
          </button>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state, ownProps) => ({
  isPatientsExists: state.patients.patients.length !== 0,
  treatment: state.treatments.find(t => t._id === ownProps.match.params.id),
  currentPatient: state.patients.patients.find(p => p._id === state.patients.currentPatient)
});

export default connect(mapStateToProps)(React.memo(Treatment));
