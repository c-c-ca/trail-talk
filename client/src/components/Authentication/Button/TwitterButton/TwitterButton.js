import React from 'react';
import { IconTwitter } from '../../Icon/Icon';
import styles from './TwitterButton.module.css';

const TwitterButton = ({ text, to }) => (
  <a className={styles.TwitterButton} href={to}>
    <div className={styles.TwitterIconWrapper}>
      <IconTwitter />
    </div>

    <p className={styles.TwitterButtonText}>{text}</p>
  </a>
);

export default TwitterButton;
