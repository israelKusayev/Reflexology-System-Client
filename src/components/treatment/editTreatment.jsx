import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTreatment, getTreatments } from '../../actions/treatmentActions';
import TreatmentForm from './treatmentForm';
import { getPatients } from '../../actions/patientActions';

class EditTreatment extends Component {
  state = {
    data: {
      date: null,
      visitReason: '',
      treatmentNumber: 0,
      referredBy: '',
      findings: '',
      recommendations: '',
      reminders: '',
      reminderDate: null
    },
    error: ''
  };

  async componentDidMount() {
    const {
      treatment,
      currentPatient,
      getPatients,
      getTreatments
    } = this.props;
    if (!treatment) {
      await getTreatments(currentPatient);
      await getPatients();
    }
    const data = this.props.treatment;

    data.date = new Date(data.date);
    data.reminderDate = data.reminderDate && new Date(data.reminderDate);
    this.setState({ data });
  }

  handleSubmit = async (values, { setSubmitting }) => {
    await this.props.editTreatment({
      ...values
    });
    this.props.getPatients();
    setSubmitting(false);
  };

  render() {
    const { data, error } = this.state;

    return (
      <>
        <h1 className="text-center bold">ערוך טיפול</h1>
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
  const treatment = state.treatments.find(
    t => t._id === ownProps.match.params.id
  );

  return {
    treatment,
    error: state.error.msg,
    patient: state.patients.patients.find(p => p._id === treatment.patientId),
    currentPatient: state.patients.currentPatient
  };
};

export default connect(
  mapStateToProps,
  { editTreatment, getPatients, getTreatments }
)(EditTreatment);
