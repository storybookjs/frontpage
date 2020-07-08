import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Button, Checkbox, Input, styles } from '@storybook/design-system';
import { FormState } from '../basics';

const { color, typography } = styles;

const Email = styled(Input)`
  flex: 1;
`;
const Send = styled(Button)`
  flex: inherit;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Form = styled.form`
  max-width: 340px;

  ${Email} {
    input {
      border-radius: 4px 0 0 4px;
    }
  }
  ${Send} {
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 5px 0;
    border-radius: 0 4px 4px 0;
  }
`;

const OptIn = styled.div`
  color: ${color.dark};
  margin-top: 1rem;

  label span {
    font-weight: ${typography.weight.regular} !important;
    display: inline !important;
  }
`;

class MailingListSubscribeForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.onFormSave = this.onFormSave.bind(this);

    const fields = {
      email: {
        name: 'email',
        type: 'email',
        placeholder: 'Your email',
        rules: 'required|string|email',
        bindings: 'Default',
      },
      ...(props.optIn && {
        optIn: {
          name: 'optIn',
          value: true,
          type: 'checkbox',
          rules: 'boolean',
          bindings: 'Checkbox',
        },
      }),
    };

    this.formData = new FormState({ fields }, { hooks: { onSuccess: this.onFormSave } });
  }

  onFormSave(form) {
    const { email, optIn } = form.values();
    const { onSubscribe } = this.props;
    onSubscribe({ email, optIn });
  }

  render() {
    const { cta, optIn, onSubscribe, ...props } = this.props;
    return (
      <Form onSubmit={this.formData.onSubmit} {...props}>
        <EmailWrapper>
          <Email
            {...this.formData.select('email').bind()}
            id="email"
            icon="email"
            label="Email"
            hideLabel
            autoCapitalize="off"
            autoCorrect="off"
            appearance="secondary"
          />
          <Send type="submit" appearance="secondary" onClick={this.formData.onSubmit}>
            {cta || 'Send'}
          </Send>
        </EmailWrapper>
        {optIn && (
          <OptIn>
            <Checkbox {...this.formData.select('optIn').bind()} label={optIn} />
          </OptIn>
        )}
      </Form>
    );
  }
}

MailingListSubscribeForm.propTypes = {
  onSubscribe: PropTypes.func.isRequired,
  cta: PropTypes.string,
  optIn: PropTypes.string,
};

MailingListSubscribeForm.defaultProps = {
  cta: null,
  optIn: null,
};

export default observer(MailingListSubscribeForm);
