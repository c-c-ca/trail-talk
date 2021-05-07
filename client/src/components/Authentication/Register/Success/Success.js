import React from 'react';
import styles from './Success.module.css';

import Modal from '../../Modal/Modal';
import { IconCheck } from '../../Icon/Icon';

const Success = () => (
  <Modal>
    <div className={styles.Success}>
      <div className={styles.SuccessHeader}>
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
