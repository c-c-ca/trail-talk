import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import styles from './VerifyForm.module.css';

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
} from '../../../../utils/validation';

class VerifyForm extends Component {
  isDisabled = signupMethod => !this.props.signupMethods.includes(signupMethod);

  onSubmit = async ({ username, password }) => {
    const { success, message } = (
      await axios.post('/api/login', { username, password })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.onVerify();
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

  renderForm = disabled => (
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
            validate={validateUsernameLogin}
            component={Input}
            disabled={disabled}
          />
          {/* <Field
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={this.props.email ? this.props.email : undefined}
            validate={validateEmail}
            component={Input}
            disabled
          /> */}
          <Field
            name="password"
            type="password"
            placeholder="Password"
            validate={validatePassword}
            component={Input}
            disabled={disabled}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  renderThirdPartyButtons = () => (
    <div className={styles.ThirdPartyButtons}>
      <div className={styles.ThirdPartyButtonContainer}>
        <FacebookButton
          text="Sign In with Facebook"
          to="/verify/facebook"
          disabled={this.isDisabled('facebook')}
        />
        <GitHubButton
          text="Sign In with GitHub"
          to="/verify/github"
          disabled={this.isDisabled('github')}
        />
        <GoogleButton
          text="Sign In With Google"
          to="/verify/google"
          disabled={this.isDisabled('google')}
        />
        <TwitterButton
          text="Sign In with Twitter"
          to="/verify/twitter"
          disabled={this.isDisabled('twitter')}
        />
      </div>
    </div>
  );

  renderDescription() {
    const { signupMethod } = this.props;
    return (
      <div className={styles.VerifyFormDescription}>
        <p>
          {`By linking your ${signupMethod} account, you will be able to access your
          account using Log in with ${signupMethod}.`}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.VerifyForm}>
        <div className={styles.VerifyFormInfo}>
          <p> It appears that an account with your email already exists.</p>
          <p>
            You can connect more than one social media account by verifying with
            one of the available sign up methods below that have already been
            registered wtih this email address.
          </p>
          <p>You will then be able to connect another account.</p>
        </div>

        <div className={styles.VerifyFormContent}>
          <div className={styles.FormWrapper}>
            {this.renderForm(this.isDisabled('local'))}
          </div>
          <div className={styles.ThirdPartyButtonWrapper}>
            {this.renderThirdPartyButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyForm;
