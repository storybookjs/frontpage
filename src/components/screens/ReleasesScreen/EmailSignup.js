import React from 'react';
import styled from 'styled-components';
import { styles } from '@storybook/design-system';
import ConfirmedMailingList from '../../layout/ConfirmedMailingList';

const { typography } = styles;

const Wrapper = styled.div`
  padding: 30px;
  margin-top: 50px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
`;

const Heading = styled.div`
  font-weight: ${typography.weight.black};
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
`;

export default function EmailSignup() {
  return (
    <Wrapper>
      <Heading>Join the mailing list</Heading>
      <Message>Get news, free tutorials, and Storybook tips emailed to you.</Message>
      <ConfirmedMailingList />
    </Wrapper>
  );
}
