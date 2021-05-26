import React from 'react';
import { IconGoogle } from '../../Icon/Icon';
import styles from './GoogleButton.module.css';

const GoogleButton = ({ text, to, disabled }) => (
  <a
    className={`${styles.GoogleButton} ${
      disabled ? styles.Disabled : undefined
    }`}
    href={to}
    onClick={e => {
      if (disabled) e.preventDefault();
    }}
  >
    <div className={styles.GoogleIconWrapper}>
      <IconGoogle />
    </div>
    <p className={styles.GoogleButtonText}>{text}</p>
  </a>
);

export default GoogleButton;
