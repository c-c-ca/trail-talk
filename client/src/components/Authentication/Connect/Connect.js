import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Connect.module.css';
import * as actions from '../../../actions';
import axios from 'axios';
import history from '../../../history';

import ConnectForm from './ConnectForm/ConnectForm';
import Loader from '../../Loader/Loader';
import Success from '../Register/Success/Success';

const SIGN_UP_METHODS = ['facebook', 'github', 'google', 'local', 'twitter'];

const findUnavailableSignupMethods = user =>
  SIGN_UP_METHODS.filter(signupMethod => user[signupMethod]);

class Connect extends Component {
  state = {
    registrationComplete: false,
    unavailableSignupMethods: SIGN_UP_METHODS,
    username: undefined,
    registeredEmail: undefined,
  };

  async componentDidMount() {
    this.updateAvailableSignupMethods();
    const { email: registeredEmail } = (
      await axios.post('/api/registered-email')
    ).data;
    const { auth } = this.props;
    const localEmail = auth && auth.local ? auth.local.email : null;
    this.setState({ registeredEmail: registeredEmail || localEmail });
  }

  componentDidUpdate() {
    this.updateAvailableSignupMethods();
  }

  updateAvailableSignupMethods() {
    if (this.props.auth === false) {
      history.push('/');
    }

    if (
      this.props.auth &&
      this.state.unavailableSignupMethods == SIGN_UP_METHODS
    ) {
      const { username } = this.props.auth;
      this.setState({
        unavailableSignupMethods: findUnavailableSignupMethods(this.props.auth),
        username,
      });
    }
  }

  onConnectHandler = () => {
    this.props.fetchUser();
  };

  onEmailSubmitHandler = () => {
    this.setState({ registrationComplete: true });
  };

  renderContent() {
    return (
      <>
        {this.props.auth && this.state.registeredEmail !== undefined ? (
          <div>
            <h1 className={styles.ConnectHeader}>Connect Another Account</h1>
            <div className={styles.ConnectContent}>
              <ConnectForm
                {...this.state}
                onEmailSubmit={this.onEmailSubmitHandler}
                onConnect={this.onConnectHandler}
              />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }

  render() {
    return (
      <div className={styles.Connect}>
        {this.state.registrationComplete ? <Success /> : this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(Connect);
