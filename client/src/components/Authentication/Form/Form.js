import React from 'react';
import styles from './Form.module.css';

import Loader from '../../Loader/Loader';

const Form = ({ formStyles, children, title, footer, loading = false }) => (
  <div className={`${styles.Form} ${formStyles}`}>
    {loading ? (
      <Loader />
    ) : (
      <div className={styles.FormBody}>
        <div className={styles.FormWrapper}>
          <h1 className={styles.FormHeader}>{title}</h1>
          <div className={styles.FormContent}>{children}</div>
        </div>
        {footer ? footer() : null}
      </div>
    )}
  </div>
);

export default Form;
