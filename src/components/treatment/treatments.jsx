import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTreatments } from '../../actions/treatmentActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import TreatmentsTable from './treatmentsTable';

class Treatments extends Component {
  componentDidMount() {
    if (!this.props.treatments || !this.props.treatments[0])
      this.props.getTreatments(this.props.match.params.id);
  }

  render() {
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

        <button
          className='btn btn-outline-primary float-right my-3 text-center'
          onClick={() => this.props.history.push('/patients')}
        >
          חזור ללקוחות
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </button>
        <TreatmentsTable
          treatments={this.props.treatments}
          history={this.props.history}
        />
        {!this.props.treatments[0] && !this.props.isFetching && (
          <div className='alert alert-light text-center' role='alert'>
            אין טיפולים
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  treatments: state.treatments,
  isFetching: state.loading
});

export default connect(
  mapStateToProps,
  { getTreatments }
)(Treatments);
