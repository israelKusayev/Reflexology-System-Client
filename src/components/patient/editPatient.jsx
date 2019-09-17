import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { editPatient, getPatients } from '../../actions/patientActions';
import PatientForm from './patientForm';
import { convertDateToString } from '../../utils/common';

class EditPatient extends PureComponent {
  state = {
    data: {
      firstName: '',
      lastName: '',
      momName: '',
      birthday: '',
      age: '',
      phone: '',
      email: ''
    }
  };

  async componentDidMount() {
    if (!this.props.patient) await this.props.getPatients();
    this.props.patient.birthday = convertDateToString(this.props.patient.birthday);
    this.props.patient.age = this.props.patient.calculatedAge;
    this.setState({ data: this.props.patient });
  }

  handleSubmit = (values, { setSubmitting }) => {
    this.props.editPatient(values);
    setSubmitting(false);
  };

  render() {
    return (
      <>
        <h1 className='text-center bold'>ערוך לקוח</h1>
        <PatientForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          error={this.props.error}
          onBirthdayBlur={this.handleBirthdayBlur}
          data={this.state.data}
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  patient: state.patients.patients.find(p => p._id === ownProps.match.params.id),
  error: state.error.msg
});

export default connect(
  mapStateToProps,
  { editPatient, getPatients }
)(EditPatient);
