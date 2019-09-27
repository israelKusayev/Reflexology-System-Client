import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Logout(props) {
  return (
    <span onClick={() => props.logout()} title="Logout">
      <FontAwesomeIcon icon={faSignOutAlt} />
    </span>
  );
}

export default connect(
  null,
  { logout }
)(React.memo(Logout));
