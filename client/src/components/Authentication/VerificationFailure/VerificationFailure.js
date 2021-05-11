import React from 'react';
import styles from './VerificationFailure.module.css';

const VerificationFailure = () => (
  <div className={styles.VerificationFailure}>
    <div className={styles.VerificationFailureBody}>
      <h2 className={styles.VerificationFailureTitle}>Account Not Found</h2>
      <p className={styles.VerificationFailureMessage}>
        <p>
          <span className={styles.Bold}>Uh, oh!</span> It looks like the account
          you are trying to verify cannot be found.
        </p>
        <p>Please create a new account.</p>
      </p>
    </div>
  </div>
);

export default VerificationFailure;
