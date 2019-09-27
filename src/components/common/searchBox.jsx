import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="search"
      name="filter"
      id="filter"
      placeholder="חפש..."
      className="form-control my-3"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default React.memo(SearchBox);
