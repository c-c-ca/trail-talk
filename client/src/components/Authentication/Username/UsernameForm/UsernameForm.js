import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './UsernameForm.module.css';
import * as actions from '../../../../actions';
import history from '../../../../history';

import Input from '../../Input/Input';
import Loader from '../../Spinner/Loader/Loader';

import { validateUsername } from '../../../../utils/validation';
import parseQueryString from '../../../../utils/parseQueryString';

const extractToken = queryString => parseQueryString(queryString).token;

class UsernameForm extends Component {
  state = { token: null };

  async componentDidMount() {
    const token = extractToken(this.props.location.search);

    if (await this.freshUsernameToken(token)) {
      return this.setState({ token });
    }

    history.push('/');
  }

  async freshUsernameToken(token) {
    return (await axios.post('/api/fresh-username-token', { token })).data;
  }

  onSubmit = async ({ username }) => {
    const { token } = this.state;

    const { success, message } = (
      await axios.post('/auth/create-username', { token, username })
    ).data;

    if (!success) {
      return { [FORM_ERROR]: message };
    }

    this.props.fetchUser();
    history.push('/');
  };

  renderSubmitButton(submitting, valid, modifiedSinceLastSubmit) {
    const enabled = valid || modifiedSinceLastSubmit;
    return (
      <button
        className={`${styles.SubmitButton} ${enabled || styles.ButtonDisabled}`}
        disabled={!enabled}
      >
        <div className={submitting ? styles.Hidden : undefined}>
          Create New Account
        </div>
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
            {this.renderSubmitButton(
              submitting,
              valid,
              modifiedSinceLastSubmit
            )}
          </form>
        )}
      </Form>
    );
  }

  renderPage() {
    return (
      <div className={styles.UsernameForm}>
        <div className={styles.FormWrapper}>
          <h1 className={styles.Header}>Welcome to TrailTalk!</h1>
          <h3 className={styles.SubHeader}>
            Create a username to activate your account
          </h3>
          {this.renderForm()}
        </div>
      </div>
    );
  }

  render() {
    return this.state.token ? this.renderPage() : null;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(withRouter(UsernameForm));
