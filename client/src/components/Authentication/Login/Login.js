import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Login.module.css';
import history from '../../../history';

import Form from '../Form/Form';
import LoginForm from './LoginForm/LoginForm';
import SignUpSection from './SignUpSection/SignUpSection';

class Login extends Component {
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
        title="Log in to your account"
        formStyles={styles.Login}
        footer={SignUpSection}
        loading={this.props.auth !== false}
      >
        <LoginForm />
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
