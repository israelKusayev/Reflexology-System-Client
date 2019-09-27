import React, { PureComponent } from 'react';
import Select from 'react-select';
import SearchBox from '../common/searchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getReminders, editReminder } from '../../actions/reminderActions';
import { connect } from 'react-redux';
import RemindersTable from './remindersTable';
import { filter } from '../../utils/common';

class Reminders extends PureComponent {
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

    return reminders.filter(reminder => filter(reminder, searchQuery));
  };

  handleCompleteChange = async reminder => {
    await this.props.editReminder(reminder._id, { isReminderCompleted: !reminder.isReminderCompleted });
    this.getReminders();
  };

  handleDateChange = async (id, reminderDate) => {
    if (reminderDate) {
      await this.props.editReminder(id, { reminderDate });
      this.getReminders();
    }
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
        <h1 className="text-center bold mb-3">תזכורות</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-primary" onClick={() => this.props.history.push('/patients')}>
            חזור ללקוחות
            <span>
              &nbsp;&nbsp;
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
          </button>
        </div>
        <div className="flex-center">
          <Select
            value={this.state.selectedFilter}
            isSearchable={false}
            onChange={this.handleFilter}
            className="react-select"
            isRtl
            options={this.options}
          />
          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
        </div>

        <RemindersTable
          onDateChange={this.handleDateChange}
          onCompleteChange={this.handleCompleteChange}
          reminders={reminders}
        ></RemindersTable>
      </>
    );
  }
}

const mapStateToProps = state => ({ reminders: state.reminders.data });
export default connect(
  mapStateToProps,
  { getReminders, editReminder }
)(Reminders);
