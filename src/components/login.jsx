import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BootstrapInput from './common/bootstrapInput';

export class Login extends Component {
  initialValues = { username: '', password: '' };

  loginSchema = Yup.object().shape({
    username: Yup.string().required('חובה למלא שם משתמש'),
    password: Yup.string().required('חובה למלא סיסמא')
  });

  handleSubmit = (values, { setSubmitting }) => {
    const { state } = this.props.location;
    const returnUrl = state ? state.from.pathname : '';
    this.props.login(values, returnUrl);
    setSubmitting(false);
  };

  render() {
    return (
      <>
        <h1 className="text-center bold">התחברות</h1>
        <div className="row justify-content-center" style={{ marginTop: '100px' }}>
          <div className="card login-card col-md-7">
            <div className="card-body row">
              <Formik initialValues={this.initialValues} onSubmit={this.handleSubmit}>
                {({ isSubmitting, errors, touched, values }) => (
                  <Form className="mx-auto col-md-8">
                    <BootstrapInput
                      label="שם משתמש"
                      name="username"
                      autoFocus
                      error={errors.username}
                      touched={touched.username}
                      value={values.username}
                    />
                    <BootstrapInput
                      label="סיסמא"
                      name="password"
                      type="password"
                      error={errors.password}
                      touched={touched.password}
                      value={values.password}
                    />
                    {this.props.error && (
                      <div className="alert alert-danger" role="alert">
                        {this.props.error}
                      </div>
                    )}
                    <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block mt-4">
                      כניסה
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
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
