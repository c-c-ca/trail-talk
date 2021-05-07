import React from 'react';
import { IconGoogle } from '../../Icon/Icon';
import styles from './GoogleButton.module.css';

const GoogleButton = ({ text, to }) => (
  <a className={styles.GoogleButton} href={to}>
    <div className={styles.GoogleIconWrapper}>
      <IconGoogle />
    </div>
    <p className={styles.GoogleButtonText}>{text}</p>
  </a>
);

export default GoogleButton;
