import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPatient } from '../../actions/patientActions';
import PatientForm from './patientForm';

class EditPatient extends Component {
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

  componentDidMount() {
    this.setState({ data: this.props.patient });
  }

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
      this.props.editPatient(this.state.data);
    }
  };

  render() {
    return (
      <>
        <h1 className='text-center bold'>ערוך לקוח</h1>
        <PatientForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          error={this.state.error}
          data={this.state.data || this.props.error}
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  patient: state.patients.find(p => p._id === ownProps.match.params.id),
  error: state.error.msg
});

export default connect(
  mapStateToProps,
  { editPatient }
)(EditPatient);
