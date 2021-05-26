import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import styles from './AccountForm.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import history from '../../../../history';

import Input from '../../Input/Input';
import Loader from '../../Spinner/Loader/Loader';

import {
  validateUsername,
  validatePassword,
  validateConfirm,
  validatePasswordsMatch,
  composeFormValidators,
} from '../../../../utils/validation';

class AccountForm extends Component {
  onSubmit = async ({ username, password, confirm }) => {
    const { token } = this.props;
    const { success, message } = (
      await axios.post('/api/create-user', { username, password, token })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.fetchUser();
    history.push('/');
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
          Create Account
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
            type="text"
            placeholder="Username"
            validate={validateUsername}
            component={Input}
          />
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
            placeholder="Password"
            label="Confirm Password"
            validate={validateConfirm}
            component={Input}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  render() {
    return (
      <div className={styles.RegisterForm}>
        <div className={styles.FormWrapper}>{this.renderForm()}</div>
      </div>
    );
  }
}

export default connect(null, actions)(AccountForm);
