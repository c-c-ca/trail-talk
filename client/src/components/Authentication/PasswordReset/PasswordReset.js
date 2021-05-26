import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PasswordReset.module.css';
import history from '../../../history';

import Form from '../Form/Form';
import PassportRecoverForm from './PasswordResetForm/PasswordResetForm';

class PasswordReset extends Component {
  componentDidMount() {
    if (this.props.auth) {
      history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.auth) {
      history.push('/');
    }
  }

  render() {
    return (
      <Form
        title="Recover Password"
        formStyles={styles.PasswordReset}
        loading={this.props.auth != false}
      >
        <PassportRecoverForm />
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PasswordReset);
