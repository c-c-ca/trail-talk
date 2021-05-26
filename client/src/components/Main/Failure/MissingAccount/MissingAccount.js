import React from 'react';
import Failure from '../Failure';
import Button from '../../Button/Button';
import styles from '../Failure.module.css';

const MissingAccount = () => (
  <Failure tilte="Account Not Found">
    <p>
      <span className={styles.Bold}>Uh, oh!</span> It looks like the account you
      are trying to verify cannot be found.
    </p>
    <p>Please create a new account.</p>
    <div className={styles.ButtonWrapper}>
      <Button text="Return to Registration" level="primary" to="/register" />
    </div>
  </Failure>
);

export default MissingAccount;
