import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Table from '../common/table';
import { connect } from 'react-redux';
import { getTreatments } from '../../actions/treatmentActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from 'rc-tooltip';

import moment from 'moment';

class PatientsTable extends Component {
  handleRowClick = patient => {
    this.props.history.push('/treatments/' + patient._id);
  };

  handleEmailCopy = e => {
    e.stopPropagation();
  };

  columns = [
    { label: 'שם משפחה', path: 'lastName' },
    { label: 'שם פרטי', path: 'firstName' },
    {
      label: 'שם האם',
      path: 'momName',
      content: patient =>
        patient.momName ? <span> ({patient.momName})</span> : ''
    },
    { label: 'גיל', path: 'age' },
    { label: 'טלפון', path: 'phone' },
    {
      label: 'תאריך טיפול אחרון',
      path: 'lastTreatment',
      content: patient =>
        patient.lastTreatment
          ? moment(patient.lastTreatment).format('DD/MM/YYYY')
          : ''
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
    return (
      <Table
        onRowClick={this.handleRowClick}
        columns={this.columns}
        data={this.props.patients}
      />
    );
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
