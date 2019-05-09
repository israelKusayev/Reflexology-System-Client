import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
class Login extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username.trim()) this.setState({ error: 'חובה למלא שם משתמש' });
    else if (!password.trim()) this.setState({ error: 'חובה למלא סיסמא' });
    else {
      this.setState({ error: '' });

      const { state } = this.props.location;
      const returnUrl = state ? state.from.pathname : '';
      this.props.login({ username, password }, returnUrl);
    }
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div>
        <h1 className='text-center bold '>התחברות</h1>
        <div className='row'>
          <form onSubmit={this.handleSubmit} className='mx-auto col-md-6'>
            <div className='form-group'>
              <label htmlFor='username'>שם משתמש</label>
              <input
                type='text'
                className='form-control'
                id='username'
                value={username}
                onChange={this.handleChange}
                name='username'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>סיסמא</label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
            </div>
            {error && (
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            )}
            {this.props.error && (
              <div className='alert alert-danger' role='alert'>
                {this.props.error}
              </div>
            )}
            <button type='submit' className='btn btn-primary '>
              כניסה
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error.msg
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
