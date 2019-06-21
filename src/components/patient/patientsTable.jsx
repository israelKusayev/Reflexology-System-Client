import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';
import Table from '../common/table';
import { connect } from 'react-redux';
import { getTreatments } from '../../actions/treatmentActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import moment from 'moment';

class PatientsTable extends Component {
  handleRowClick = patient => {
    this.props.history.push('/treatments/' + patient._id);
  };

  handleEmailCopy = e => {
    e.stopPropagation();
  };

  handleCallToggle = patient => {
    this.props.onCallToggle(patient);
  };

  columns = [
    { label: 'שם משפחה', path: 'lastName' },
    { label: 'שם פרטי', path: 'firstName' },
    {
      label: 'שם האם',
      path: 'momName',
      content: patient => (patient.momName ? <span> ({patient.momName})</span> : '')
    },
    {
      label: 'גיל',
      path: 'age',
      content: patient => (
        <>
          <span data-tip={patient.age}>{patient.age}</span>
          <ReactTooltip effect='solid' />
        </>
      )
    },
    {
      label: 'V',
      path: 'lastTreatmentCall',
      content: patient => (
        <>
          <div
            data-tip={patient.lastTreatmentCall ? moment(patient.lastTreatmentCallDate).format('DD/MM/YYYY') : ''}
            className='custom-control custom-checkbox'
            onClick={e => e.stopPropagation()}
          >
            <input
              type='checkbox'
              className='custom-control-input'
              data-for={'v' + patient._id}
              checked={patient.lastTreatmentCall}
              readOnly={true}
              id={patient._id}
            />
            <label
              onClick={() => this.handleCallToggle(patient)}
              className='custom-control-label'
              htmlFor={patient._id}
            />
          </div>
          <ReactTooltip id={'v' + patient._id} className='v-tooltip' effect='solid' />
        </>
      )
    },
    { label: 'טלפון', path: 'phone' },
    {
      label: 'טיפול אחרון',
      path: 'lastTreatment',
      content: patient => (patient.lastTreatment ? moment(patient.lastTreatment).format('DD/MM/YYYY') : '')
    },
    {
      label: 'אימיל',
      path: 'email',
      content: patient =>
        patient.email ? (
          <span className='emailCheck' onClick={e => this.handleEmailCopy(e)}>
            <CopyToClipboard text={patient.email}>
              <FontAwesomeIcon className='text-success' icon={faCheck} />
            </CopyToClipboard>
          </span>
        ) : null
    },
    {
      key: 'addTreatment',
      content: patient => (
        <div style={{ display: 'flex' }}>
          <button
            className='btn btn-outline-primary btn-sm '
            onClick={e => {
              e.stopPropagation();
              this.props.getTreatments(patient._id).then(() => {
                this.props.history.push('/add-treatment/' + patient._id);
              });
            }}
          >
            הוסף טיפול
          </button>
          <button
            className='btn btn-outline-primary btn-sm ml-3'
            onClick={e => {
              e.stopPropagation();
              this.props.history.push('/edit-patient/' + patient._id);
            }}
          >
            ערוך
          </button>
        </div>
      )
    }
  ];

  render() {
    return <Table onRowClick={this.handleRowClick} columns={this.columns} data={this.props.patients} />;
  }
}

PatientsTable.propTypes = {
  patients: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};
export default connect(
  null,
  { getTreatments }
)(PatientsTable);
