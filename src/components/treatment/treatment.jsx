import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import convertDayToText from '../../utils/convertDayToText';
const Treatment = ({ treatment, history }) => {
  const {
    visitReason,
    treatmentNumber,
    referredBy,
    findings,
    recommendations,
    remarks,
    _id
  } = treatment;

  const date = moment(treatment.date);

  return (
    <>
      <h1 className='text-center bold'>טיפול</h1>

      <h4 className='bold'>תאריך</h4>
      <p>
        {date.format('DD/MM/YYYY')} יום {convertDayToText(date.day())}
      </p>

      {visitReason && (
        <>
          <h4 className='bold'>סיבת ביקור</h4>
          <p>{visitReason} </p>
        </>
      )}

      <>
        <h4 className='bold'>מספר טיפול</h4>
        <p>{treatmentNumber} </p>
      </>

      {referredBy && (
        <>
          <h4 className='bold'>הופנה ע"י</h4>
          <p>{referredBy} </p>
        </>
      )}

      {findings && (
        <>
          <h4 className='bold'>ממצאים</h4>
          <p>{findings} </p>
        </>
      )}

      {recommendations && (
        <>
          <h4 className='bold'>המלצות</h4>
          <p>{recommendations} </p>
        </>
      )}

      {remarks && (
        <>
          <h4 className='bold'>הערות</h4>
          <p>{remarks} </p>
        </>
      )}

      <button
        className='btn btn-outline-secondary'
        onClick={() => history.push('/edit-treatment/' + _id)}
      >
        ערוך
      </button>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    treatment: state.treatments.find(t => t._id === ownProps.match.params.id)
  };
};

export default connect(mapStateToProps)(Treatment);
