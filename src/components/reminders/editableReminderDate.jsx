import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { convertDateToString } from '../../utils/common';

const EditableReminderDate = ({ reminder, onClose }) => {
  const [date, setDate] = useState(convertDateToString(reminder.reminderDate));
  return (
    <div className="form-group">
      <span className="editable-date-container">
        <ReactInputMask
          className="form-control ltr input-mask editable-date"
          value={date}
          onChange={e => setDate(e.target.value)}
          mask="99/99/9999"
          onBlur={onClose}
          autoFocus></ReactInputMask>
      </span>
    </div>
  );
};
export default EditableReminderDate;
