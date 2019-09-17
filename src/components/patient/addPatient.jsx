import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../../actions/patientActions';
import PatientForm from './patientForm';

class AddPatient extends PureComponent {
  initialValues = {
    firstName: '',
    lastName: '',
    momName: '',
    birthday: '',
    age: '',
    phone: '',
    email: ''
  };

  handleSubmit = (values, { setSubmitting }) => {
    this.props.addPatient(values);
    setSubmitting(false);
  };

  render() {
    return (
      <>
        <h1 className='text-center bold'>הוסף לקוח</h1>
        <PatientForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          error={this.props.error}
          data={this.initialValues}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error.msg
});

export default connect(
  mapStateToProps,
  { addPatient }
)(AddPatient);
