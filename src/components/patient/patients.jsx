import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPatients } from '../../actions/patientActions';
import { removeTreatmnets } from '../../actions/treatmentActions';
import { paginate } from '../../utils/paginate';
import PatientsTable from './patientsTable';
import Pagination from '../common/pagination';
import SearchBox from '../common/searchBox';

class Patients extends Component {
  state = { searchQuery: '', currentPage: 1, pageSize: 8 };

  componentDidMount() {
    this.initComponent();
  }

  initComponent = () => {
    if (!this.props.patients || this.props.patients.length === 0)
      this.props.getPatients();
    this.props.removeTreatmnets();
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query.trimLeft().toLowerCase(),
      currentPage: 1
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  filterPatients = () => {
    const { patients } = this.props;
    const { searchQuery } = this.state;

    if (!searchQuery) return patients;

    return patients.filter(patient => {
      for (let name in patient) {
        if (name === '_id' || name === 'createdAt') continue;
        if (
          patient[name]
            .toString()
            .toLowerCase()
            .includes(searchQuery)
        )
          return true;
      }
      return false;
    });
  };

  render() {
    const { history } = this.props;
    const { searchQuery, pageSize, currentPage, isFetching } = this.state;

    const filteredPatients = this.filterPatients();
    const filteredCount = filteredPatients.length;
    const paginatedPatients = paginate(
      filteredPatients,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <>
        <h1 className='text-center bold mb-3'>לקוחות</h1>
        <button
          className='btn btn-primary'
          onClick={() => this.props.history.push('/add-patient')}
        >
          הוסף לקוח
        </button>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <PatientsTable patients={paginatedPatients} history={history} />
        {!paginatedPatients[0] && !isFetching && (
          <div className='alert alert-light text-center' role='alert'>
            אין לקוחות
          </div>
        )}
        {searchQuery && !filteredCount && (
          <div className='alert alert-warning' role='alert'>
            אין תוצאות עבור&nbsp;
            {searchQuery}
          </div>
        )}
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemsCount={filteredCount}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patients.patients,
  isFetching: state.loading
});

export default connect(
  mapStateToProps,
  { getPatients, removeTreatmnets }
)(Patients);
