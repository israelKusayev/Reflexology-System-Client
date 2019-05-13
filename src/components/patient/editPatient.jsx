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

    const error = this.validate();

    if (error) this.setState({ error });
    else {
      this.setState({ error: '' });
      this.props.editPatient(this.state.data);
    }
  };

  validate = () => {
    if (!this.state.data.lastName.trim()) return 'חובה למלא שם משפחה';
    if (!this.state.data.firstName.trim()) return 'חובה למלא שם פרטי';
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
  patient: state.patients.patients.find(
    p => p._id === ownProps.match.params.id
  ),
  error: state.error.msg
});

export default connect(
  mapStateToProps,
  { editPatient }
)(EditPatient);
