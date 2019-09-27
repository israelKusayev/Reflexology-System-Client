import React from 'react';
import { connect } from 'react-redux';

function Loading({ loading }) {
  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return { loading: state.loading };
};

export default connect(mapStateToProps)(React.memo(Loading));
