import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

function Table({ columns, data, onRowClick }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover ">
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} onRowClick={onRowClick} />
      </table>
    </div>
  );
}
export default React.memo(Table);
