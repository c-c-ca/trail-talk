import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../../../actions';
import styles from './LinkAccountForm.module.css';

import Input from '../../Input/Input';
import GoogleButton from '../../Button/GoogleButton/GoogleButton';
import FacebookButton from '../../Button/FacebookButton/FacebookButton';
import TwitterButton from '../../Button/TwitterButton/TwitterButton';
import GitHubButton from '../../Button/GitHubButton/GitHubButton';
import Loader from '../../Spinner/Loader/Loader';

import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../../../../utils/validation';

class LinkAccountForm extends Component {
  onSubmit = async ({ username, email, password }) => {
    const { success, message } = (
      await axios.post('/register', { username, email, password })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.onRegister();
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
        <div className={submitting ? styles.Hidden : undefined}>Connect</div>
        <div className={styles.LoaderWrapper}>
          {submitting && <Loader color="white" />}
        </div>
      </button>
    );
  }

  renderForm = () => (
    <Form onSubmit={this.onSubmit}>
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
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={this.props.email ? this.props.email : undefined}
            validate={validateEmail}
            component={Input}
            disabled
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            validate={validatePassword}
            component={Input}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  renderThirdPartyButtons = () => (
    <div className={styles.ThirdPartyButtons}>
      <div className={styles.ThirdPartyButtonContainer}>
        <FacebookButton text="Connect with Facebook" to="/connect/facebook" />
        <GitHubButton text="Connect with GitHub" to="/connect/github" />
        <GoogleButton text="Connect With Google" to="/connect/google" />
        <TwitterButton text="Connect with Twitter" to="/connect/twitter" />
      </div>
    </div>
  );

  renderDescription() {
    const { signupMethod } = this.props;
    return (
      <div className={styles.LinkAccountFormDescription}>
        <p>
          {`By linking your ${signupMethod} account, you will be able to access your
          account using Log in with ${signupMethod}.`}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.LinkAccountForm}>
        <div className={styles.FormWrapper}>
          {/* {this.renderDescription()} */}
          {this.renderForm()}
        </div>
        <div className={styles.ThirdPartyButtonWrapper}>
          <h3 className={styles.ThirdPartyButtonHeader}>Verify Your Account</h3>
          {this.renderThirdPartyButtons()}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(LinkAccountForm);
