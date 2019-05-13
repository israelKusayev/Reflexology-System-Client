import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTreatments } from '../../actions/treatmentActions';
import { setCurrentPatient } from '../../actions/patientActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import TreatmentsTable from './treatmentsTable';
import PatientName from '../patient/patientName';

class Treatments extends Component {
  componentDidMount() {
    const { treatments, match, setCurrentPatient, getTreatments } = this.props;
    if (!treatments || !treatments[0]) getTreatments(match.params.id);

    setCurrentPatient(match.params.id);
  }

  render() {
    const { treatments, isFetching, currectPatient, history } = this.props;
    return (
      <>
        <h1 className='text-center bold'>טיפולים</h1>
        <button
          className='btn btn-outline-primary my-3'
          onClick={() =>
            this.props.history.push(
              '/add-treatment/' + this.props.match.params.id
            )
          }
        >
          הוסף טיפול
        </button>
        <span className='ml-3 bold'>
          <PatientName patient={currectPatient} />
        </span>
        <button
          className='btn btn-outline-primary float-right my-3 text-center'
          onClick={() => history.push('/patients')}
        >
          חזור ללקוחות
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </button>
        <TreatmentsTable treatments={treatments} history={history} />
        {!treatments[0] && !isFetching && (
          <div className='alert alert-light text-center' role='alert'>
            אין טיפולים
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  treatments: state.treatments,
  isFetching: state.loading,
  currectPatient: state.patients.patients.find(
    p => p._id === ownProps.match.params.id
  )
});

export default connect(
  mapStateToProps,
  { getTreatments, setCurrentPatient }
)(Treatments);
