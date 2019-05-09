import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableBody extends Component {
  renderCell = (item, column) =>
    column.content ? column.content(item) : item[column.path];

  createKey = (item, column) => item._id + (column.path || column.key);
  onRowClick = () => {};
  render() {
    const { data, columns, onRowClick } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr
            className={onRowClick ? 'clickable ' : ''}
            onClick={() => {
              if (onRowClick) onRowClick(item);
            }}
            key={item._id}
          >
            {columns.map(column => (
              <td className='align-middle' key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  onRowClick: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array.isRequired
};
export default TableBody;
