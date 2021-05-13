import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Avatar, styles } from '@storybook/design-system';

const { color, spacing, typography, pageMargin, pageMargins, breakpoint } = styles;

const Quote = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  color: ${color.darker};

  @media (min-width: ${breakpoint * 1}px) {
    color: ${color.darkest};
    font-size: ${typography.size.m1}px;
    line-height: ${typography.size.l1}px;
  }
  margin-bottom: 1.5rem;
  max-width: 480px;
  text-align: center;
`;

const Name = styled.div`
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
`;

const JobTitle = styled.div`
  font-size: ${typography.size.s1}px;
  color: ${color.dark};
`;

const Meta = styled.div`
  margin-left: 10px;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  margin-left: 20px;
  padding-left: 20px;
  img {
    display: inline-block;
    width: auto;
    max-height: 24px;
  }
`;
const Attribution = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HrWrapper = styled.div`
  ${pageMargins};
`;

const Hr = styled.hr`
  margin: 0;
  display: block;
`;

const Inner = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 3rem ${spacing.padding.medium}px;
  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
    padding-bottom: 5rem;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

const Wrapper = styled.div``;

export default function Testimonial({ text, avatarUrl, name, jobTitle, logo, ...props }) {
  return (
    <Wrapper {...props}>
      <HrWrapper>
        <Hr />
      </HrWrapper>
      <Inner>
        <Quote>{text}</Quote>
        <Attribution>
          <Author>
            <Avatar size="large" username={name} src={avatarUrl} />
            <Meta>
              <Name>{name}</Name>
              <JobTitle>{jobTitle}</JobTitle>
            </Meta>
          </Author>
          <Logo>
            <img src={logo} alt="company logo" />
          </Logo>
        </Attribution>
      </Inner>
    </Wrapper>
  );
}

Testimonial.propTypes = {
  text: PropTypes.node,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  jobTitle: PropTypes.string,
  logo: PropTypes.string,
};

Testimonial.defaultProps = {
  text: null,
  avatarUrl: null,
  name: null,
  jobTitle: null,
  logo: null,
};
