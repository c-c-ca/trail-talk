import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './LoginForm.module.css';
import * as actions from '../../../../actions';
import history from '../../../../history';

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

class LoginForm extends Component {
  onSubmit = async ({ username, password }) => {
    const { success, message } = (
      await axios.post('/auth/login', { username, password })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.fetchUser();
    history.push('/');
  };

  renderSignUpSection() {
    return (
      <div className={styles.SignUp}>
        New to TrailTalk?
        <Link className={styles.SignUpLink} to="/register">
          Sign Up
        </Link>
      </div>
    );
  }

  renderThirdPartyButtons() {
    return (
      <div className={styles.ThirdPartyButtons}>
        <h3 className={styles.ThirdPartyHeader}>Or Sign In with</h3>
        <div className={styles.ThirdPartyButtonContainer}>
          <FacebookButton text="Sign In with Facebook" />
          <GitHubButton text="Sign In with GitHub" />
          <GoogleButton text="Sign In With Google" to="/auth/google" />
          <TwitterButton text="Sign In with Twitter" to="/auth/twitter" />
        </div>
      </div>
    );
  }

  renderSubmitButton(submitting) {
    return (
      <button className={styles.SubmitButton}>
        <div className={submitting ? styles.Hidden : null}>Log In</div>
        <div className={styles.LoaderWrapper}>
          {submitting && <Loader color="white" />}
        </div>
      </button>
    );
  }

  renderSubmitError(submitError) {
    return (
      <div className={`${styles.Error} ${styles.SubmitError}`}>
        {submitError}
      </div>
    );
  }

  renderForm() {
    return (
      <Form onSubmit={this.onSubmit}>
        {({ handleSubmit, submitting, submitError }) => (
          <form className={styles.Form} onSubmit={handleSubmit}>
            {submitError && this.renderSubmitError(submitError)}
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
            {this.renderSubmitButton(submitting)}
          </form>
        )}
      </Form>
    );
  }

  render() {
    return (
      <div className={styles.LoginForm}>
        <div className={styles.FormWrapper}>
          <h1 className={styles.Header}>Log in to your account</h1>
          {this.renderForm()}
          {this.renderThirdPartyButtons()}
        </div>
        {this.renderSignUpSection()}
      </div>
    );
  }
}

export default connect(null, actions)(LoginForm);
