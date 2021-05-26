import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import styles from './RegisterForm.module.css';

import Input from '../../Input/Input';
import GoogleButton from '../../Button/GoogleButton/GoogleButton';
import FacebookButton from '../../Button/FacebookButton/FacebookButton';
import TwitterButton from '../../Button/TwitterButton/TwitterButton';
import GitHubButton from '../../Button/GitHubButton/GitHubButton';
import Loader from '../../Spinner/Loader/Loader';

import { validateEmail } from '../../../../utils/validation';

class RegisterForm extends Component {
  onSubmit = async ({ email }) => {
    await this.props.onRegister(email);
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
          Sign Up with Email
        </div>
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
            name="email"
            type="email"
            placeholder="Email"
            validate={validateEmail}
            component={Input}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  renderThirdPartyButtons = () => (
    <div className={styles.ThirdPartyButtons}>
      <h3 className={styles.ThirdPartyHeader}>Or Sign Up with</h3>
      <div className={styles.ThirdPartyButtonContainer}>
        <FacebookButton text="Sign Up with Facebook" to="/auth/facebook" />
        <GitHubButton text="Sign Up with GitHub" to="/auth/github" />
        <GoogleButton text="Sign Up With Google" to="/auth/google" />
        <TwitterButton text="Sign Up with Twitter" to="/auth/twitter" />
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
