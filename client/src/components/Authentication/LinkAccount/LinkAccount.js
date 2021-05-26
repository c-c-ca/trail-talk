import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import styles from './LinkAccount.module.css';

import LinkAccountForm from './LinkAccountForm/LinkAccountForm';
import AvailableSignUpMethodsForm from './AvailableSignUpMethodsForm/AvailableSignUpMethodsForm';
import parseQueryString from '../../../utils/parseQueryString';

const capitalize = s => s[0].toUpperCase() + s.slice(1);

class LinkAccount extends Component {
  state = { registrationComplete: false, signupMethod: null, email: null };

  componentDidMount() {
    const { email, signupMethod } = parseQueryString(
      this.props.location.search
    );

    this.setState({ email, signupMethod: capitalize(signupMethod) });
  }

  onRegisterHandler = () => {
    this.setState({ registrationComplete: true });
  };

  renderHeader(signupMethod) {
    return (
      <h1
        className={styles.LinkAccountHeader}
      >{`Link ${signupMethod} Account`}</h1>
    );
  }

  renderChooseFrom() {
    return <div>Choose from the available options</div>;
  }

  render() {
    const { signupMethod, email } = this.state;

    return (
      <div className={styles.LinkAccount}>
        {this.renderHeader(signupMethod)}
        <div className={styles.LinkAccountContent}>
          <Route to="/verify" component={AvailableSignUpMethodsForm} />
          <Route to="/connect" component={LinkAccountForm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(withRouter(LinkAccount));
