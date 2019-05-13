import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../../actions/patientActions';
import PatientForm from './patientForm';

class AddPatient extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      momName: '',
      age: '',
      phone: '',
      email: ''
    },
    error: ''
  };

  handleChange = ({ target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();

    const error = this.validate();

    if (error) this.setState({ error });
    else {
      this.setState({ error: '' });
      this.props.addPatient(this.state.data);
    }
  };

  validate = () => {
    if (!this.state.data.lastName.trim()) return 'חובה למלא שם משפחה';
    if (!this.state.data.firstName.trim()) return 'חובה למלא שם פרטי';
  };

  render() {
    return (
      <>
        <h1 className='text-center bold'>הוסף לקוח</h1>
        <PatientForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          error={this.state.error || this.props.error}
          data={this.state.data}
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
