import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPatient, getPatients } from '../../actions/patientActions';
import PatientForm from './patientForm';
import { calcBirthday } from '../../utils/common';

class EditPatient extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      momName: '',
      birthday: '',
      age: '',
      phone: '',
      email: ''
    },
    error: ''
  };

  async componentDidMount() {
    if (!this.props.patient) await this.props.getPatients();
    this.setState({ data: this.props.patient });
  }

  handleChange = ({ target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  handleBirthdayBlur = ({ target }) => {
    const data = { ...this.state.data };
    const diff = calcBirthday(target.value);
    if (diff.isValid()) {
      data.age = diff.years() + '.' + diff.months();
      data[target.name] = target.value;
      this.setState({ data, error: '' });
    } else if (target.value) {
      this.setState({ error: 'תאריך לידה לא תקין' });
    } else {
      this.setState({ error: '' });
    }
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
          onBirthdayBlur={this.handleBirthdayBlur}
          data={this.state.data || this.props.error}
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
