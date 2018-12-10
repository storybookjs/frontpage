import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles, urls } from './basics';

const { color, spacing, typography, pageMargin, breakpoint } = styles;
const { url } = urls;

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  float: left;
  margin-right: 30px;

  @media (min-width: ${breakpoint * 1}px) {
    float: none;
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.s3}px;
  color: ${color.darkest};
  line-height: 20px;
  margin-bottom: 0.25rem;
`;

const Desc = styled.div`
  color: ${color.darker};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
`;

const Meta = styled.div`
  overflow: hidden;
`;

const Item = styled.a`
  text-decoration: none;

  padding: 1.5rem 1.25rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${color.border};
  }

  @media (min-width: ${breakpoint * 1}px) {
    padding: 2.5rem 2rem 3rem;

    &:not(:last-child) {
      border-bottom: none;
      border-right: 1px solid ${color.border};
    }
  }

  // Hover effect
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);
  cursor: pointer;

  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translate3d(0, 0, 0);
  }
`;

const Wrapper = styled.div`
  border-top: 1px solid ${color.border};
  border-bottom: 1px solid ${color.border};

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media (min-width: ${breakpoint * 1}px) {
    flex-direction: row;
    text-align: center;
  }

  ${Item} {
    flex: 1;
  }
`;

export default function CommunitySocial({ ...props }) {
  return (
    <Wrapper {...props}>
      <Item href={url.gitHub.repo}>
        <Image src="images/logos/social/github.svg" />
        <Meta>
          <Title>Star on GitHub</Title>
          <Desc>Check out the official Storybook repo on GitHub</Desc>
        </Meta>
      </Item>
      <Item href={url.twitter}>
        <Image src="images/logos/social/twitter.svg" />
        <Meta>
          <Title>Follow on Twitter</Title>
          <Desc>Get the latest updates from the Storybook team</Desc>
        </Meta>
      </Item>
      <Item href={url.blog}>
        <Image src="images/logos/social/medium.svg" />
        <Meta>
          <Title>Read the blog</Title>
          <Desc>Get news, articles, and guides from the Storybook community</Desc>
        </Meta>
      </Item>
      <Item href={url.chat}>
        <Image src="images/logos/social/discord.svg" />
        <Meta>
          <Title>Chat on Discord</Title>
          <Desc>Talk UI development and get help from the community</Desc>
        </Meta>
      </Item>
    </Wrapper>
  );
}
