import React from 'react';
import PropTypes from 'prop-types';
import ReactJsPagination from 'react-js-pagination';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  return (
    <ReactJsPagination
      activePage={currentPage}
      itemsCountPerPage={pageSize}
      totalItemsCount={itemsCount}
      pageRangeDisplayed={5}
      onChange={onPageChange}
      itemClass="page-item"
      activeClass="active"
      linkClass="page-link"
      nextPageText="&rsaquo;"
      prevPageText="&lsaquo;"
    />
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default React.memo(Pagination);
