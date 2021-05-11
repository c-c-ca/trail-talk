import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Success.module.css';
import history from '../../../../history';

import Modal from '../../Modal/Modal';
import { IconCheck, IconCross } from '../../Icon/Icon';

const Success = () => (
  <Modal onDismiss={() => history.push('/')}>
    <div className={styles.Success}>
      <div className={styles.SuccessHeader}>
        <Link to="/" className={styles.IconCrossWrapper}>
          <IconCross fill="#fff" />
        </Link>
        <div className={styles.IconShadowWrapper}>
          <IconCheck fill="rgba(0,0,0,0.15)" />
        </div>
        <div className={styles.IconWrapper}>
          <IconCheck fill="#fff" />
        </div>
      </div>
      <div className={styles.SuccessContent}>
        <h2 className={styles.SuccessTitle}>Thank You</h2>
        <p className={styles.SuccessMessage}>
          We just sent you a confirmation email. Please check your inbox.
        </p>
      </div>
    </div>
  </Modal>
);

export default Success;
