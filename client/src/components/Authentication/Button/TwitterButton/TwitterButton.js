import React from 'react';
import { IconTwitter } from '../../Icon/Icon';
import styles from './TwitterButton.module.css';

const TwitterButton = ({ text }) => (
  <a className={styles.TwitterButton} href="/auth/Twitter">
    <div className={styles.TwitterIconWrapper}>
      <IconTwitter />
    </div>

    <p className={styles.TwitterButtonText}>{text}</p>
  </a>
);

export default TwitterButton;
