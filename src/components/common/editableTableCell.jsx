import React, { useState } from 'react';

const EditableTableCell = ({ children }) => {
  const [isEditableMode, setIsEditableMode] = useState(false);

  const open = () => setIsEditableMode(true);
  const close = () => setIsEditableMode(false);
  return (
    <span
      onClick={e => {
        e.stopPropagation();
        open();
      }}
    >
      {children({ isEditableMode, open, close })}
    </span>
  );
};

export default EditableTableCell;
