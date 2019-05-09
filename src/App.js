import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './utils/axiosSettings';

import Login from './components/login';
import Loading from './components/loading';
import NotFound from './components/notFound';
import Patients from './components/patient/patients';
import AddPatient from './components/patient/addPatient';
import AddTreatment from './components/treatment/addTreatment';
import Treatments from './components/treatment/treatments';
import EditPatient from './components/patient/editPatient';
import Treatment from './components/treatment/treatment';
import { logout } from './actions/authActions';
import EditTreatment from './components/treatment/editTreatment';
import ProtectedRoute from './components/common/protectedRoute';
import { sync } from './actions/syncActions';

class App extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  handleSync = () => {
    this.props.sync();
  };

  render() {
    return (
      <>
        <Loading />
        <span className='fixed-buttons '>
          <span onClick={this.handleLogout} title='Logout'>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
          <span title='sync' onClick={this.handleSync}>
            <FontAwesomeIcon icon={faSync} />
          </span>
        </span>

        <div className='container'>
          <Switch>
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/patients' component={Patients} />
            <ProtectedRoute path='/add-patient' component={AddPatient} />
            <ProtectedRoute path='/edit-patient/:id' component={EditPatient} />
            <ProtectedRoute
              path='/add-treatment/:id'
              component={AddTreatment}
            />
            <ProtectedRoute
              path='/edit-treatment/:id'
              component={EditTreatment}
            />
            <ProtectedRoute path='/treatments/:id' component={Treatments} />
            <ProtectedRoute path='/treatment/:id' component={Treatment} />
            <Route path='/404' component={NotFound} />
            <ProtectedRoute path='/' exact={true} component={Patients} />
            <Redirect to='/404' />
          </Switch>
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { logout, sync }
)(App);
