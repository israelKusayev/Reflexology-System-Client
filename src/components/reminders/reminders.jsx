//@ts-check
import React, { Component } from 'react';
import Select from 'react-select';
import Table from '../common/table';
import moment from 'moment';
import SearchBox from '../common/searchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getReminders, editReminder } from '../../actions/reminderActions';
import { connect } from 'react-redux';

class Reminders extends Component {
  options = [{ value: 'all', label: 'כל התזכורות' }, { value: 'new', label: 'תזכורות חדשות' }];

  state = {
    searchQuery: '',
    currentPage: 1,
    pageSize: 8,
    selectedFilter: this.options[1]
  };

  componentDidMount() {
    this.getReminders();
  }

  filterReminders = () => {
    const { reminders } = this.props;
    const { searchQuery } = this.state;

    if (!searchQuery) return reminders;
    // TODO: refactor
    return reminders.filter(reminder => {
      for (let name in reminder) {
        if (name === '_id') continue;
        if (name === 'patient' && reminder[name] && reminder[name].length > 0) {
          for (const el in reminder[name][0]) {
            if (el === '_id') continue;

            if (
              reminder[name][0][el] &&
              reminder[name][0][el]
                .toString()
                .toLowerCase()
                .includes(searchQuery)
            )
              return true;
          }
        }
        if (
          reminder[name] &&
          reminder[name]
            .toString()
            .toLowerCase()
            .includes(searchQuery)
        )
          return true;
      }
      return false;
    });
  };

  handleCompleteChange = async reminder => {
    await this.props.editReminder(reminder._id, { isReminderCompleted: !reminder.isReminderCompleted });
    this.getReminders();
  };

  columns = [
    {
      key: 'isChecked',
      label: '',
      content: treatment => (
        <>
          <div className='custom-control custom-checkbox' onClick={e => e.stopPropagation()}>
            <input
              type='checkbox'
              className='custom-control-input'
              checked={treatment.isReminderCompleted}
              readOnly={true}
              id={treatment._id}
            />
            <label
              onClick={() => this.handleCompleteChange(treatment)}
              className='custom-control-label'
              htmlFor={treatment._id}
            />
          </div>
        </>
      )
    },
    {
      path: 'name',
      label: 'שם',
      content: ({ patient }) => {
        return patient[0].firstName + ' ' + patient[0].lastName;
      }
    },
    { path: 'reminders', label: 'תזכורת' },
    { path: 'reminderDate', label: 'תאריך', content: treatment => moment(treatment.reminderDate).format('DD/MM/YYYY') }
  ];

  handleRowClick = treatment => {
    this.props.history.push('/treatments/' + treatment.patient[0]._id);
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query.trimLeft().toLowerCase(),
      currentPage: 1
    });
  };

  handleFilter = selectedFilter => {
    this.setState({ selectedFilter }, this.getReminders);
  };

  getReminders = () => this.props.getReminders(this.state.selectedFilter.value);

  render() {
    const reminders = this.filterReminders();
    return (
      <>
        <h1 className='text-center bold mb-3'>תזכורות</h1>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-outline-primary' onClick={() => this.props.history.push('/patients')}>
            חזור ללקוחות
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
          </button>
        </div>
        <div className='flex-center'>
          <Select
            value={this.state.selectedFilter}
            isSearchable={false}
            onChange={this.handleFilter}
            className='react-select'
            isRtl
            options={this.options}
          />
          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
        </div>

        <Table columns={this.columns} data={reminders || []} onRowClick={this.handleRowClick} />
      </>
    );
  }
}

const mapStateToProps = state => ({ reminders: state.reminders.data });
export default connect(
  mapStateToProps,
  { getReminders, editReminder }
)(Reminders);
