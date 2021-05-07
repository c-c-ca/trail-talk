import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ children }) =>
  ReactDOM.createPortal(
    <div className={styles.Modal}>
      <div className={styles.ModalContent}>{children}</div>
    </div>,
    document.querySelector('#modal')
  );

export default Modal;
