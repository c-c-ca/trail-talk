import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ onDismiss, children }) =>
  ReactDOM.createPortal(
    <div onClick={onDismiss} className={styles.Modal}>
      <div onClick={e => e.stopPropagation()} className={styles.ModalContent}>
        {children}
      </div>
    </div>,
    document.querySelector('#modal')
  );

export default Modal;
