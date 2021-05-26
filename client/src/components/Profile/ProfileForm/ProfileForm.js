import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import styles from './ProfileForm.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import history from '../../../history';

import ProfileFormInput from './ProfileFormInput/ProfileFormInput';
import Loader from '../../Authentication/Spinner/Loader/Loader';
import Button from '../../Main/Button/Button';

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirm,
  validatePasswordsMatch,
  validateUsernameUpdate,
  //   composeFormValidators,
} from '../../../utils/validation';

class ProfileForm extends Component {
  state = { edit: null, modified: [] };

  async editUsername(username) {
    return (
      await axios.post('/api/edit-username', {
        username,
      })
    ).data;
  }

  async editEmail(email) {
    return (
      await axios.post('/api/edit-email', {
        email,
      })
    ).data;
  }

  onSubmit = async ({ username, email }) => {
    const { modified } = this.state;
    if (modified.includes('email') && email != this.props.email) {
      const { success, message } = await this.editEmail(email);
      if (!success) {
        return { [FORM_ERROR]: message };
      }
    } else if (
      modified.includes('username') &&
      username != this.props.username
    ) {
      const { success, message } = await this.editUsername(username);
      if (!success) {
        return { [FORM_ERROR]: message };
      }
    }

    this.props.fetchUser();
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
        <div className={submitting ? styles.Hidden : undefined}>Save</div>
        <div className={styles.LoaderWrapper}>
          {submitting && <Loader color="white" />}
        </div>
      </button>
    );
  }

  validate = ({ username, email }) => {
    if (username == this.props.username && email == this.props.email) {
      return { error: 'Username and email not modified' };
    }
  };

  onEditHandler = name => {
    this.setState(({ modified }) => ({
      edit: name,
      modified: [...modified, name],
    }));
  };

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
            defaultValue={this.props.username}
            validate={validateUsernameUpdate(this.props.username)}
            edit={this.state.edit}
            onEdit={this.onEditHandler}
            component={ProfileFormInput}
            disabled={'username' != this.state.edit}
          />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            label="Email Address"
            defaultValue={this.props.email}
            validate={validateEmail}
            edit={this.state.edit}
            onEdit={this.onEditHandler}
            component={ProfileFormInput}
            disabled={'email' != this.state.edit}
          />
          {this.renderSubmitButton(submitting, valid, modifiedSinceLastSubmit)}
        </form>
      )}
    </Form>
  );

  deleteAccount = async () => {
    await axios.post('/api/delete-user');
    history.push('/');
  };

  render() {
    return (
      <div className={styles.ProfileForm}>
        <div className={styles.FormWrapper}>
          {this.props.username ? this.renderForm() : null}
          <div className={styles.DeleteButtonWrapper}>
            <Button
              level="warm"
              text="Delete Account"
              onClick={this.deleteAccount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(ProfileForm);
