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
      remarks: ''
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

  handleChange = ({ target }) => {
    const data = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const error = this.validate();
    if (error) this.setState({ error });
    else {
      this.setState({ error: '' });

      await this.props.addTreatment({
        ...this.state.data,
        patientId: this.props.match.params.id
      });
      this.props.getPatients();
    }
  };

  validate = () => {
    if (!this.state.data.treatmentNumber) return 'חובה למלא מספר טיפול';
    if (Number.isNaN(this.state.data.treatmentNumber)) return 'מספר טיפול צריך להיות מספר';
    if (this.state.data.treatmentNumber <= 0) return 'מספר טיפול חייב להיות גדול יותר מ 0';
  };

  render() {
    const { data, error } = this.state;

    return (
      <>
        <h1 className='text-center bold'>הוסף טיפול</h1>
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
      treatmentNumber: lastTreatment ? lastTreatment.treatmentNumber + 1 || 1 : 1,
      referredBy: lastTreatment ? lastTreatment.referredBy : ''
    },
    patient: state.patients.patients.find(p => p._id === ownProps.match.params.id)
  };
};

export default connect(
  mapStateToProps,
  { addTreatment, getPatients, getTreatments, setCurrentPatient }
)(AddTreatment);
