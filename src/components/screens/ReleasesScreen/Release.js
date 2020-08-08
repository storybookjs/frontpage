import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Highlight, styles } from '@storybook/design-system';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import ConfirmedMailingList from '../../layout/ConfirmedMailingList';

import { mdFormatting } from '../../../styles/formatting';

const { color, typography } = styles;

const Wrapper = styled.div`
  ${mdFormatting}
  flex: 1;
`;

const Title = styled.h1`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

const EmailWrapper = styled.div`
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

const StyledConfirmedMailingList = styled(ConfirmedMailingList)`
  min-width: auto;
`;

function Release({ title, body, ...props }) {
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <Highlight withHTMLChildren={false}>
        <MDXRenderer>{body}</MDXRenderer>
      </Highlight>
      <EmailWrapper>
        <Heading>Join the mailing list</Heading>
        <Message>Get news, free tutorials, and Storybook tips emailed to you.</Message>
        <StyledConfirmedMailingList />
      </EmailWrapper>
    </Wrapper>
  );
}

Release.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Release;
