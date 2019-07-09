import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTreatment } from '../../actions/treatmentActions';
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
      remarks: ''
    },
    error: ''
  };

  componentDidMount() {
    const data = this.props.treatment;
    data.date = new Date(data.date);
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

      await this.props.editTreatment({
        ...this.state.data
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
        <h1 className='text-center bold'>ערוך טיפול</h1>
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
  const treatment = state.treatments.find(t => t._id === ownProps.match.params.id);
  return {
    treatment,
    error: state.error.msg,
    patient: state.patients.patients.find(p => p._id === treatment.patientId)
  };
};

export default connect(
  mapStateToProps,
  { editTreatment, getPatients }
)(EditTreatment);
