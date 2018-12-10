import React from 'react';
import styled from 'styled-components';

import { Icon, Link, styles } from './basics';

const { background, color, spacing, typography, pageMargin, pageMargins, breakpoint } = styles;

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m1}px;
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const Desc = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  margin-bottom: 0.25rem;
`;

const Meta = styled.div``;
const Image = styled.img`
  width: 192px;
  margin-right: 30px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;

  padding: 3rem ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
    text-align: left;
  }

  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }

  ${Meta} {
    flex: 1;
  }
`;

const Wrapper = styled.div`
  background: ${background.app};
  border-top: 1px solid ${color.border};
  border-bottom: 1px solid ${color.border};
`;

export default function AddonCustom({ ...props }) {
  return (
    <Wrapper {...props}>
      <Inner>
        <Image src="images/addons/custom.svg" />
        <Meta>
          <Title>Create your own addon</Title>
          <Desc>
            Customize Storybook's UI, API, and create custom workflows by building your own addon
          </Desc>
          <Link>
            Learn how to build an addon <Icon icon="arrowright" />
          </Link>
        </Meta>
      </Inner>
    </Wrapper>
  );
}
