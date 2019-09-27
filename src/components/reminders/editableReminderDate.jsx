import React, { useState } from 'react';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';
import { convertDateToString } from '../../utils/common';

const EditableReminderDate = ({ reminder, onClose }) => {
  const [date, setDate] = useState(convertDateToString(reminder.reminderDate));

  const schema = Yup.object().shape({
    birthday: Yup.date().format('DD/MM/YYYY')
  });

  return (
    <div className="form-group">
      <span className="editable-date-container">
        <ReactInputMask
          className="form-control ltr input-mask editable-date"
          value={date}
          onChange={e => setDate(e.target.value)}
          mask="99/99/9999"
          onBlur={e => {
            if (schema.isValid(e.target.value) && e.target.value !== convertDateToString(reminder.reminderDate))
              onClose(e.target.value);
            else onClose(null);
          }}
          autoFocus
        />
      </span>
    </div>
  );
};
export default React.memo(EditableReminderDate);
