import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import styles from './RegisterForm.module.css';

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const renderSubmitError = submitError => (
  <div className={`${styles.Error} ${styles.SubmitError}`}>{submitError}</div>
);

const renderSubmitButton = (submitting, valid, modifiedSinceLastSubmit) => {
  const enabled = valid || modifiedSinceLastSubmit;
  return (
    <button
      className={`${styles.SubmitButton} ${enabled || styles.ButtonDisabled}`}
      disabled={!enabled}
    >
      <div className={submitting && styles.Hidden}>Create New Account</div>
      <div className={styles.LoaderWrapper}>
        {submitting && <Loader color="white" />}
      </div>
    </button>
  );
};

class RegisterForm extends Component {
  onSubmit = async () => {
    await sleep(500);

    // return {
    //   [FORM_ERROR]: 'You have entered an invalid username or password.',
    // };

    this.props.onRegister();
  };

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
          {submitError && renderSubmitError(submitError)}
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
            validate={validateEmail}
            component={Input}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            validate={validatePassword}
            component={Input}
          />
          {renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  renderThirdPartyButtons = () => (
    <div className={styles.ThirdPartyButtons}>
      <h3 className={styles.ThirdPartyHeader}>Or Sign Up with</h3>
      <div className={styles.ThirdPartyButtonContainer}>
        <FacebookButton text="Sign Up with Facebook" />
        <GitHubButton text="Sign Up with GitHub" />
        <GoogleButton text="Sign Up With Google" />
        <TwitterButton text="Sign Up with Twitter" />
      </div>
    </div>
  );

  render() {
    return (
      <div className={styles.RegisterForm}>
        <div className={styles.FormWrapper}>
          {this.renderForm()}
          {this.renderThirdPartyButtons()}
        </div>
      </div>
    );
  }
}

export default RegisterForm;
