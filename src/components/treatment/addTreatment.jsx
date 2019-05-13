import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTreatment } from '../../actions/treatmentActions';
import TreatmentForm from './treatmentForm';
import { getPatients } from '../../actions/patientActions';

class AddTreatment extends Component {
  state = {
    data: {
      date: new Date().toISOString().split('T')[0],
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
    if (this.state.data.treatmentNumber <= 0)
      return 'מספר טיפול חייב להיות גדול יותר מ 0';
  };

  render() {
    const { data, error } = this.state;

    return (
      <>
        <h1 className='text-center bold'>הוסף טיפול</h1>
        <TreatmentForm
          data={data}
          error={error}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  const lastTreatment = state.treatments[0];

  return {
    error: state.error.msg,
    prevTreatment: {
      treatmentNumber: lastTreatment
        ? lastTreatment.treatmentNumber + 1 || 1
        : 1,
      referredBy: lastTreatment ? lastTreatment.referredBy : ''
    }
  };
};

export default connect(
  mapStateToProps,
  { addTreatment, getPatients }
)(AddTreatment);
