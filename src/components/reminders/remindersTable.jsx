import React from 'react';
import { withRouter } from 'react-router-dom';
import Table from '../common/table';
import EditableReminderDate from './editableReminderDate';
import EditableTableCell from '../common/editableTableCell';
import moment from 'moment';

const RemindersTable = ({ reminders, onCompleteChange, onDateChange, editReminder, history = undefined }) => {
  const columns = [
    {
      key: 'isChecked',
      label: '',
      content: reminder => (
        <div className="custom-control custom-checkbox" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            className="custom-control-input"
            checked={reminder.isReminderCompleted}
            readOnly={true}
            id={reminder._id}
          />
          <label onClick={() => onCompleteChange(reminder)} className="custom-control-label" htmlFor={reminder._id} />
        </div>
      )
    },
    {
      path: 'name',
      label: 'שם',
      content: ({ patient }) => {
        return patient[0].firstName + ' ' + patient[0].lastName;
      }
    },
    { path: 'reminders', label: 'תזכורת' },
    {
      path: 'reminderDate',
      label: 'תאריך',
      content: reminder => (
        <EditableTableCell>
          {({ isEditableMode, open, close }) => {
            return !isEditableMode ? (
              moment(reminder.reminderDate).format('DD/MM/YYYY')
            ) : (
              <EditableReminderDate
                onClose={reminderDate => {
                  close();
                  onDateChange(reminder._id, reminderDate);
                }}
                reminder={reminder}
              ></EditableReminderDate>
            );
          }}
        </EditableTableCell>
      )
    }
  ];

  const handleRowClick = treatment => {
    history.push('/treatments/' + treatment.patient[0]._id);
  };

  return <Table columns={columns} data={reminders || []} onRowClick={handleRowClick} />;
};

export default withRouter(React.memo(RemindersTable));
