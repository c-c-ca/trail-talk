import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import history from '../../../../history';
import styles from './ConnectForm.module.css';

import Input from '../../Input/Input';
import GoogleButton from '../../Button/GoogleButton/GoogleButton';
import FacebookButton from '../../Button/FacebookButton/FacebookButton';
import TwitterButton from '../../Button/TwitterButton/TwitterButton';
import GitHubButton from '../../Button/GitHubButton/GitHubButton';
import Loader from '../../Spinner/Loader/Loader';

import {
  validateUsernameLogin,
  validateEmail,
  validatePassword,
  validateConfirm,
  validatePasswordsMatch,
  composeFormValidators,
} from '../../../../utils/validation';

class ConnectForm extends Component {
  isDisabled = signupMethod => !this.props.signupMethods.includes(signupMethod);

  onSubmit = async ({ password }) => {
    const { success, message } = (
      await axios.post('/connect/local', { password })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.onConnect();
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
    // const enabled = valid || modifiedSinceLastSubmit;
    const enabled = valid;
    console.log('valid', valid);
    console.log('modifiedSinceLastSubmit', modifiedSinceLastSubmit);
    return (
      <button
        className={`${styles.SubmitButton} ${enabled || styles.ButtonDisabled}`}
        disabled={!enabled}
      >
        <div className={submitting ? styles.Hidden : undefined}>
          {this.props.registeredEmail ? 'Connect' : 'Register Email'}
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

  renderForm = disabled => {
    const { username } = this.props;
    return (
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
              defaultValue={username}
              disabled
              validate={validateUsernameLogin}
              component={Input}
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              disabled={disabled}
              validate={validatePassword}
              component={Input}
            />
            <Field
              name="confirm"
              type="password"
              placeholder="Password"
              disabled={disabled}
              label="Confirm Password"
              validate={validateConfirm}
              component={Input}
            />
            {this.renderSubmitButton(
              submitting,
              valid,
              modifiedSinceLastSubmit
            )}
          </form>
        )}
      </Form>
    );
  };

  onEmailSubmit = async ({ email }) => {
    await axios.post('/api/create-ticket', { email });
    this.props.onEmailSubmit();
  };

  renderEmailForm = () => {
    return (
      <Form onSubmit={this.onEmailSubmit}>
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
              name="email"
              type="email"
              placeholder="Email"
              validate={validateEmail}
              component={Input}
            />
            {this.renderSubmitButton(
              submitting,
              valid,
              modifiedSinceLastSubmit
            )}
          </form>
        )}
      </Form>
    );
  };

  renderThirdPartyButtons = () => (
    <div className={styles.ThirdPartyButtons}>
      <div className={styles.ThirdPartyButtonContainer}>
        <FacebookButton
          text="Connect with Facebook"
          to="/connect/facebook"
          disabled={this.props.unavailableSignupMethods.includes('facebook')}
        />
        <GitHubButton
          text="Connect with GitHub"
          to="/connect/github"
          disabled={this.props.unavailableSignupMethods.includes('github')}
        />
        <GoogleButton
          text="Connect With Google"
          to="/connect/google"
          disabled={this.props.unavailableSignupMethods.includes('google')}
        />
        <TwitterButton
          text="Connect with Twitter"
          to="/connect/twitter"
          disabled={this.props.unavailableSignupMethods.includes('twitter')}
        />
      </div>
    </div>
  );

  renderDescription() {
    const { signupMethod } = this.props;
    return (
      <div className={styles.ConnectFormDescription}>
        <p>
          {`By linking your ${signupMethod} account, you will be able to access your
          account using Log in with ${signupMethod}.`}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.ConnectForm}>
        <div className={styles.ConnectFormContent}>
          <div className={styles.FormWrapper}>
            {this.props.registeredEmail
              ? this.renderForm(
                  this.props.unavailableSignupMethods.includes('local')
                )
              : this.renderEmailForm()}
          </div>
          <div className={styles.ThirdPartyButtonWrapper}>
            {this.renderThirdPartyButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectForm;
