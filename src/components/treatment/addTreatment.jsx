import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTreatment, getTreatments } from '../../actions/treatmentActions';
import TreatmentForm from './treatmentForm';
import { getPatients, setCurrentPatient } from '../../actions/patientActions';

class AddTreatment extends Component {
  state = {
    data: {
      date: new Date(),
      visitReason: '',
      treatmentNumber: 0,
      referredBy: '',
      findings: '',
      recommendations: '',
      reminders: '',
      reminderDate: new Date().setDate(new Date().getDate() + 7)
    },
    error: ''
  };

  async componentDidMount() {
    if (!this.props.patient) {
      await this.props.getPatients();
      await this.props.getTreatments(this.props.match.params.id);
    }

    this.props.setCurrentPatient(this.props.match.params.id);
    const data = { ...this.state.data, ...this.props.prevTreatment };
    this.setState({ data });
  }

  handleSubmit = async (values, { setSubmitting }) => {
    await this.props.addTreatment({
      ...values,
      patientId: this.props.match.params.id
    });
    this.props.getPatients();
    setSubmitting(false);
  };

  render() {
    const { data, error } = this.state;

    return (
      <>
        <h1 className="text-center bold">הוסף טיפול</h1>
        <TreatmentForm
          patient={this.props.patient}
          data={data}
          error={error}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const lastTreatment = state.treatments[0];
  return {
    error: state.error.msg,
    prevTreatment: {
      treatmentNumber: lastTreatment
        ? lastTreatment.treatmentNumber + 1 || 1
        : 1,
      referredBy: lastTreatment ? lastTreatment.referredBy : ''
    },
    patient: state.patients.patients.find(
      p => p._id === ownProps.match.params.id
    )
  };
};

export default connect(
  mapStateToProps,
  { addTreatment, getPatients, getTreatments, setCurrentPatient }
)(AddTreatment);
