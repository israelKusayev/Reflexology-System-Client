import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../../actions/patientActions';
import PatientForm from './patientForm';
import { calcBirthday } from '../../utils/common';
import moment from 'moment';
class AddPatient extends Component {
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
      this.setState({ data, error: '' });
    } else if (target.value) {
      data.age = '';
      this.setState({ data, error: 'תאריך לידה לא תקין' });
    } else {
      data.age = '';
      this.setState({ data, error: '' });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const error = this.validate();

    if (error) this.setState({ error });
    else {
      this.setState({ error: '' });
      const { data } = this.state;
      debugger;

      data.birthday = moment(data.birthday, 'DD/MM/YYYY');
      this.props.addPatient(data);
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
          onBirthdayBlur={this.handleBirthdayBlur}
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
