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
    if (!this.state.data.lastName.trim())
      this.setState({ error: 'חובה למלא שם משפחה' });
    else if (!this.state.data.firstName.trim())
      this.setState({ error: 'חובה למלא שם פרטי' });
    else {
      this.setState({ error: '' });
      this.props.addPatient(this.state.data);
    }
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
