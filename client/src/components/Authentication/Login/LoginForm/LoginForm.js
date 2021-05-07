import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import styles from './LoginForm.module.css';

import Input from '../../Input/Input';
import GoogleButton from '../../Button/GoogleButton/GoogleButton';
import FacebookButton from '../../Button/FacebookButton/FacebookButton';
import TwitterButton from '../../Button/TwitterButton/TwitterButton';
import GitHubButton from '../../Button/GitHubButton/GitHubButton';
import Loader from '../../Spinner/Loader/Loader';

import {
  validateUsernameLogin,
  validatePassword,
} from '../../../../utils/validation';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async () => {
  await sleep(5000);
  return {
    [FORM_ERROR]: 'You have entered an invalid username or password.',
  };
};

const renderForm = () => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit, submitting, submitError }) => (
      <form className={styles.Form} onSubmit={handleSubmit}>
        {submitError && renderSubmitError(submitError)}
        <Field
          name="username"
          type="text"
          placeholder="Username"
          validate={validateUsernameLogin}
          component={Input}
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          validate={validatePassword}
          component={Input}
        />
        {renderSubmitButton(submitting)}
      </form>
    )}
  </Form>
);

const renderSubmitError = submitError => (
  <div className={`${styles.Error} ${styles.SubmitError}`}>{submitError}</div>
);

const renderSubmitButton = submitting => (
  <button className={styles.SubmitButton}>
    <div className={submitting && styles.Hidden}>Log In</div>
    <div className={styles.LoaderWrapper}>
      {submitting && <Loader color="white" />}
    </div>
  </button>
);

const renderThirdPartyButtons = () => (
  <div className={styles.ThirdPartyButtons}>
    <h3 className={styles.ThirdPartyHeader}>Or Sign In with</h3>
    <div className={styles.ThirdPartyButtonContainer}>
      <FacebookButton text="Sign In with Facebook" />
      <GitHubButton text="Sign In with GitHub" />
      <GoogleButton text="Sign In With Google" to="/auth/google" />
      <TwitterButton text="Sign In with Twitter" />
    </div>
  </div>
);

const renderSignUpSection = () => (
  <div className={styles.SignUp}>
    New to TrailTalk?
    <a className={styles.SignUpLink} href="#">
      Sign Up
    </a>
  </div>
);

const LoginForm = () => (
  <div className={styles.LoginForm}>
    <div className={styles.FormWrapper}>
      <h1 className={styles.Header}>Log in to your account</h1>
      {renderForm()}
      {renderThirdPartyButtons()}
    </div>
    {renderSignUpSection()}
  </div>
);

export default LoginForm;
