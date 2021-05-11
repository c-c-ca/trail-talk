import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Row from '../Layout/Grid/Row';
import styles from './Header.module.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <Link className={styles.HeaderButton} to="/login">
              Sign In
            </Link>
          </li>,
        ];
      default:
        return [
          <li key="1">
            <Link className={styles.HeaderButton} to="/trails">
              Discuss
            </Link>
          </li>,
          <li key="2">
            <a className={styles.HeaderButton} href="/api/logout">
              Logout
            </a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav className={styles.Header}>
        <Row>
          <div className={styles.HeaderContainer}>
            <Link className={styles.HeaderButton} to="/">
              Trail Talk
            </Link>
            <ul className={styles.Buttons}>{this.renderContent()}</ul>
          </div>
        </Row>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
