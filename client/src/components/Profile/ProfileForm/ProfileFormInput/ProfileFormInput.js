import React, { Component } from 'react';
import { FormSpy } from 'react-final-form';
import styles from './ProfileFormInput.module.css';

import Input from '../../../Authentication/Input/Input';
import Button from '../../../Main/Button/Button';

class ProfileFormInput extends Component {
  state = { selected: false };

  toggleSelected = props => {
    //   console.log(props);
    //   const { valid } = props;
    const { edit, name, onEdit } = this.props;
    //   if (valid || edit == name) {
    //     this.setState(({ selected }) => ({ selected: !selected }));
    //     onEdit(name);
    //   }
    this.setState(({ selected }) => ({ selected: !selected }));
    onEdit(this.props.input.name);
  };

  render() {
    return (
      <FormSpy subscription={{ valid: true }}>
        {props => (
          <div className={styles.ProfileFormInput}>
            <Input
              // disabled={!this.state.selected || this.props.disabled}
              {...this.props}
              {...this.state}
            />
            <div className={styles.ButtonWrapper}>
              <Button
                level="warm"
                text="Edit"
                onClick={() => this.toggleSelected(props)}
              />
            </div>
          </div>
        )}
      </FormSpy>
    );
  }
}

export default ProfileFormInput;
