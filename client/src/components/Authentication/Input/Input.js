import React from 'react';
import styles from './Input.module.css';

import {
  IconUser,
  IconEmail,
  IconKey,
  IconCheck,
  IconCross,
} from '../Icon/Icon';
import Loader from '../Spinner/Loader/Loader';

const ICON_COLOR = 'hsl(20, 89%, 50%)';

const renderIcon = name => {
  switch (name) {
    case 'username':
      return <IconUser fill={ICON_COLOR} />;
    case 'email':
      return <IconEmail fill={ICON_COLOR} />;
    case 'password':
      return <IconKey fill={ICON_COLOR} />;
    default:
      return null;
  }
};

const renderValid = ({
  submitFailed,
  touched,
  modifiedSinceLastSubmit,
  error,
  active,
}) => {
  if (((!submitFailed && touched) || modifiedSinceLastSubmit) && !active) {
    return error ? <IconCross /> : <IconCheck />;
  }
};

const renderError = ({
  touched,
  error,
  submitFailed,
  modifiedSinceLastSubmit,
  active,
}) =>
  error &&
  touched &&
  !active &&
  (!submitFailed || modifiedSinceLastSubmit) && (
    <div className={styles.Error}>{error}</div>
  );

const renderStatus = meta =>
  meta.validating && meta.active ? <Loader /> : renderValid(meta);

const renderInput = (placeholder, input) => (
  <input
    className={styles.Input}
    id={placeholder}
    {...input}
    placeholder={placeholder}
    type={input.type}
    autoComplete="off"
  />
);

const Input = ({ placeholder, input, meta }) => (
  <div className={styles.FieldWrapper}>
    <label className={styles.Label} htmlFor={placeholder}>
      {placeholder}
    </label>
    <div className={styles.InputWrapper}>
      <div>
        <div className={styles.IconWrapperLeft}>{renderIcon(input.name)}</div>
        <div className={styles.IconWrapperRight}>{renderStatus(meta)}</div>
        {renderInput(placeholder, input)}
      </div>
    </div>
    {renderError(meta)}
  </div>
);

export default Input;
