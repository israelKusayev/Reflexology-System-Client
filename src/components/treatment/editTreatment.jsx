import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTreatment } from '../../actions/treatmentActions';
import TreatmentForm from './treatmentForm';

class EditTreatment extends Component {
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
    const data = this.props.treatment;
    data.date = new Date(data.date).toISOString().split('T')[0];
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

      this.props.editTreatment({
        ...this.state.data
      });
    }
  };

  render() {
    const { data, error } = this.state;

    return (
      <>
        <h1 className='text-center bold'>ערוך טיפול</h1>
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
const mapStateToProps = (state, ownProps) => ({
  error: state.error.msg,
  treatment: state.treatments.find(t => t._id === ownProps.match.params.id)
});

export default connect(
  mapStateToProps,
  { editTreatment }
)(EditTreatment);
