import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import styles from './PasswordResetForm.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../actions';
import history from '../../../../history';

import Input from '../../Input/Input';
import Loader from '../../Spinner/Loader/Loader';

import {
  validateUsernamePasswordRecovery,
  validateEmail,
  composeFormValidators,
  validatePassword,
  validateConfirm,
  passwordValidate,
  validatePasswordsMatch,
} from '../../../../utils/validation';
import parseQueryString from '../../../../utils/parseQueryString';

class PasswordResetForm extends Component {
  state = { token: null };

  componentDidMount() {
    this.validateToken();
  }

  componentDidUpdate() {
    this.validateToken();
  }

  async validateToken() {
    if (this.state.token !== null) return;

    const { search } = this.props.location;
    if (!search) {
      return this.setState({ token: false });
    }
    const { token } = parseQueryString(search);
    if (token && (await this.ticketExists(token))) {
      return this.setState({ token });
    }
    history.push('/');
  }

  async ticketExists(token) {
    return (await axios.post('/api/ticket-exists', { token })).data;
  }

  onSubmit = async ({ username }) => {
    const credential = validateEmail(username) ? 'username' : 'email';
    const { success, message } = (
      await axios.post(`/api/recover-password`, {
        [credential]: username,
      })
    ).data;
    history.push('/');
    // if (!success) {
    //   return { [FORM_ERROR]: message };
    // }
    // this.props.fetchUser();
    // history.push('/');
  };

  renderSubmitError(submitError) {
    return (
      <div className={`${styles.Error} ${styles.SubmitError}`}>
        {submitError}
      </div>
    );
  }

  renderSubmitButton(submitting, valid, modifiedSinceLastSubmit) {
    const enabled = valid || modifiedSinceLastSubmit;
    return (
      <button
        className={`${styles.SubmitButton} ${enabled || styles.ButtonDisabled}`}
        disabled={!enabled}
      >
        <div className={submitting ? styles.Hidden : undefined}>
          {this.state.token ? 'Email Recovery Link' : 'Reset Password'}
        </div>
        <div className={styles.LoaderWrapper}>
          {submitting && <Loader color="white" />}
        </div>
      </button>
    );
  }

  validate(formValues) {
    return composeFormValidators(formValues, [validatePasswordsMatch]);
  }

  renderForm = () => (
    <Form onSubmit={this.onSubmit} validate={this.validate}>
      {({
        handleSubmit,
        submitting,
        submitError,
        valid,
        modifiedSinceLastSubmit,
      }) => (
        <form className={styles.Form} onSubmit={handleSubmit}>
          {submitError && this.renderSubmitError(submitError)}
          <Field
            name="username"
            placeholder="Username or Email"
            type="text"
            validate={validateUsernamePasswordRecovery}
            component={Input}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  onPasswordSubmit = async ({ password }) => {
    const { token } = this.state;
    const { success, message } = await axios.post('/api/reset-password', {
      token,
      password,
    });
    history.push('/');
  };

  passwordFormValidate(formValues) {
    return composeFormValidators(formValues, [validatePasswordsMatch]);
  }

  renderPasswordForm = () => (
    <Form onSubmit={this.onPasswordSubmit} validate={this.passwordFormValidate}>
      {({
        handleSubmit,
        submitting,
        submitError,
        valid,
        modifiedSinceLastSubmit,
      }) => (
        <form className={styles.Form} onSubmit={handleSubmit}>
          {submitError && this.renderSubmitError(submitError)}
          <Field
            name="password"
            type="password"
            placeholder="Password"
            validate={validatePassword}
            component={Input}
          />
          <Field
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            validate={validateConfirm}
            component={Input}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  renderContent() {
    switch (this.state.token) {
      case null:
        return;
      case false:
        return this.renderForm();
      default:
        return this.renderPasswordForm();
    }
  }

  render() {
    return (
      <div>
        <div className={styles.FormWrapper}>{this.renderContent()}</div>
      </div>
    );
  }
}

export default connect(null, actions)(withRouter(PasswordResetForm));
