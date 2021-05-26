import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from '../Layout/Grid/Row';
import Button from '../Button/Button';
import styles from './Home.module.css';

class Home extends Component {
  renderButton() {
    return this.props.auth === false ? (
      <Button text="Register Now" level="warm" to="/register" />
    ) : null;
  }

  render() {
    return (
      <div className={styles.Home}>
        <Row>
          <div className={styles.TextContainer}>
            <h1 className={styles.Title}>Find The Perfect Trail</h1>
            <div className={styles.SubHeader}>
              <h3>Connect.</h3>
              <h3>Share.</h3>
              <h3>Learn.</h3>
            </div>
            <div className={styles.ButtonWrapper}>{this.renderButton()}</div>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
