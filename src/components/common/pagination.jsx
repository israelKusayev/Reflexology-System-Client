import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <span
            className='page-link'
            aria-label='Previous'
            onClick={() => (currentPage > 1 ? onPageChange(currentPage - 1) : null)}
          >
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>Previous</span>
          </span>
        </li>
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <span className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
        <li className='page-item'>
          <span
            className='page-link'
            aria-label='Next'
            onClick={() => (currentPage < 4 ? onPageChange(currentPage + 1) : null)}
          >
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Next</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
