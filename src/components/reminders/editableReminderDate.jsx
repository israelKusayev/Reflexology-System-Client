import React, { useState } from 'react';
import InputMask from '../common/inputMask';
import { convertDateToString } from '../../utils/common';

const EditableReminderDate = ({ reminder, onClose }) => {
  const [date, setDate] = useState(convertDateToString(reminder.reminderDate));
  return (
    <span className='editable-date-container'>
      <InputMask
        className='editable-date'
        label=''
        name='birthday'
        value={date}
        onChange={e => setDate(e.target.value)}
        mask='99/99/9999'
        onBlur={onClose}
        autoFocus
      ></InputMask>
    </span>
  );
};
export default EditableReminderDate;
