import React, { Component } from 'react';
import styles from './Account.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../../actions';
import history from '../../../history';

import Form from '../Form/Form';
import AccountForm from './AccountForm/AccountForm';

import parseQueryString from '../../../utils/parseQueryString';

class Account extends Component {
  state = { id: null };

  async componentDidMount() {
    const { search } = this.props.location;
    if (!search) {
      return history.push('/');
    }
    const { token } = parseQueryString(search);
    if (token && (await this.ticketExists(token))) {
      return this.setState({ token });
    }
    history.push('/');
  }
  async ticketExists(token) {
    return (await axios.post('/api/ticket-exists', { token })).data;
  }

  render() {
    const { token } = this.state;
    return (
      <Form
        title="Create Your Account"
        formStyles={styles.Account}
        loading={!token}
      >
        <AccountForm token={token} />
      </Form>
    );
  }
}

export default connect(null, actions)(withRouter(Account));
