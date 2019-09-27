import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './utils/axiosSettings';
import './utils/yupGlobals';

import Login from './components/login';
import Loading from './components/loading';
import NotFound from './components/notFound';
import Patients from './components/patient/patients';
import AddPatient from './components/patient/addPatient';
import AddTreatment from './components/treatment/addTreatment';
import Treatments from './components/treatment/treatments';
import EditPatient from './components/patient/editPatient';
import Treatment from './components/treatment/treatment';
import EditTreatment from './components/treatment/editTreatment';
import ProtectedRoute from './components/common/protectedRoute';
import Reminders from './components/reminders/reminders';
import Logout from './components/logout';

class App extends PureComponent {
  render() {
    return (
      <>
        <Loading />
        <span className="fixed-buttons">
          <Logout></Logout>
        </span>

        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/patients" component={Patients} />
            <ProtectedRoute path="/add-patient" component={AddPatient} />
            <ProtectedRoute path="/edit-patient/:id" component={EditPatient} />
            <ProtectedRoute path="/add-treatment/:id" component={AddTreatment} />
            <ProtectedRoute path="/edit-treatment/:id" component={EditTreatment} />
            <ProtectedRoute path="/treatments/:id" component={Treatments} />
            <ProtectedRoute path="/treatment/:id" component={Treatment} />
            <ProtectedRoute path="/reminders" component={Reminders} />
            <Route path="/404" component={NotFound} />
            <ProtectedRoute path="/" exact={true} component={Patients} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
