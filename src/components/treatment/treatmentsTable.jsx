import React, { Component } from 'react';
import Table from '../common/table';
import moment from 'moment';

export class TreatmentsTable extends Component {
  columns = [
    {
      key: 'date',
      label: 'תאריך',
      content: treatment => moment(treatment.date).format('DD/MM/YYYY')
    },

    {
      path: 'treatmentNumber',
      label: 'מספר ביקור'
    },
    {
      path: 'visitReason',
      label: 'סיבת ביקור'
    },
    {
      path: 'findings',
      label: 'ממצאים'
    },
    {
      path: 'recommendations',
      label: 'המלצות'
    },
    {
      path: 'reminders',
      label: 'תזכורת'
    },
    {
      key: 'editTreatment',
      content: treatment => (
        <>
          <button
            className='btn btn-outline-primary btn-sm '
            onClick={e => {
              e.stopPropagation();
              this.props.history.push('/edit-treatment/' + treatment._id);
            }}
          >
            ערוך
          </button>
        </>
      )
    }
  ];

  handleRowClick = treatment => {
    this.props.history.push('/treatment/' + treatment._id);
  };

  render() {
    return (
      <>
        <Table columns={this.columns} data={this.props.treatments} onRowClick={this.handleRowClick} />
      </>
    );
  }
}

export default TreatmentsTable;
