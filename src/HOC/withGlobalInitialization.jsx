import React from 'react';
import { connect } from 'react-redux';
import { getHocDisplayName } from '../utils/common';
import { getRemindersCount } from '../actions/reminderActions';

const withGlobalInitialization = WrappedComponent => {
  class WithGlobalInitialization extends React.Component {
    componentDidMount() {
      this.props.getRemindersCount();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithGlobalInitialization.displayName = `withGlobalInitialization(${getHocDisplayName(WrappedComponent)})`;

  return connect(
    null,
    { getRemindersCount }
  )(WithGlobalInitialization);
};
export default withGlobalInitialization;
