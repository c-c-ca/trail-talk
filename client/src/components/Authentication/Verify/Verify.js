import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import history from '../../../history';
import styles from './Verify.module.css';

import Loader from '../../Loader/Loader';
import VerifyForm from './VerifyForm/VerifyForm';
import parseQueryString from '../../../utils/parseQueryString';

class Verify extends Component {
  state = { verificationComplete: false, signupMethods: [] };

  componentDidMount() {
    const { search } = this.props.location;
    if (!search) {
      return history.push('/');
    }

    const { signupMethods } = parseQueryString(search);

    if (!signupMethods) {
      return history.push('/');
    }

    this.setState({ signupMethods: signupMethods.split(',') });
  }

  componentDidUpdate() {
    if (this.props.auth) {
      history.push(this.state.verificationComplete ? '/connect' : '/');
    }
  }

  onVerifyHandler = () => {
    this.setState({ verificationComplete: true });
    this.props.fetchUser();
  };

  renderHeader() {
    return <h1 className={styles.VerifyHeader}>Verify Your Account</h1>;
  }

  render() {
    const { signupMethods } = this.state;

    return (
      <div className={styles.Verify}>
        {this.props.auth !== null && signupMethods.length > 0 ? (
          <div>
            {this.renderHeader()}
            <div className={styles.VerifyContent}>
              <VerifyForm {...this.state} onVerify={this.onVerifyHandler} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(withRouter(Verify));
