import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTreatment } from '../../actions/treatmentActions';
import TreatmentForm from './treatmentForm';

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

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.data.treatmentNumber)
      this.setState({ error: 'חובה למלא מספר טיפול' });
    else if (this.state.data.treatmentNumber <= 0)
      this.setState({ error: 'מספר טיפול חייב להיות גדול יותר מ 0' });
    else {
      this.setState({ error: '' });

      this.props.addTreatment({
        ...this.state.data,
        patientId: this.props.match.params.id
      });
    }
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
  { addTreatment }
)(AddTreatment);
