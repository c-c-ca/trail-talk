import React from 'react';
import styles from './Failure.module.css';

const Failure = ({ title, children }) => (
  <div className={styles.Failure}>
    <div className={styles.FailureBody}>
      <h2 className={styles.FailureTitle}>{title}</h2>
      <div className={styles.FailureMessage}>{children}</div>
    </div>
  </div>
);

export default Failure;
