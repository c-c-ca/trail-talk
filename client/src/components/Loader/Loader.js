import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.LoaderWrapper}>
    <div className={styles.psoload}>
      <div className={styles.straight}></div>
      <div className={styles.curve}></div>
      <div className={styles.center}></div>
      <div className={styles.inner}></div>
    </div>
  </div>
);

export default Loader;
