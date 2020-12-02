import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { styles } from '@storybook/design-system';
import { LazyLoad } from '../basics';

const { color, typography, pageMargins, breakpoint } = styles;

const Media = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled.h2`
  font-size: ${typography.size.m2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 24px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoint}px) {
    font-size: ${typography.size.l1}px;
    line-height: 36px;
    margin-bottom: 0.75rem;
  }
`;

const Desc = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
  color: ${color.dark};

  @media (min-width: ${breakpoint}px) {
    font-size: ${typography.size.m1}px;
    line-height: 32px;
  }
`;

const Meta = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  @media (min-width: ${breakpoint}px) {
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;

  @media (min-width: ${breakpoint}px) {
    text-align: left;
    padding-top: 7rem !important;
    padding-bottom: 7rem !important;

    ${Meta} {
      order: 1;
      flex: 1;
    }

    ${Media} {
      order: 2;
      flex: 0 0 auto;
      display: block;
      width: 50%;
    }

    ${(props) =>
      props.orientation === 'left' &&
      css`
        /* Text on left */
        ${Meta} {
          padding-right: 10%;
        }
      `};

    ${(props) =>
      props.orientation === 'right' &&
      css`
        /* Text on right */
        flex-direction: row-reverse;
        ${Meta} {
          padding-right: 0;
          padding-left: 10%;
        }
      `};

    ${(props) =>
      props.orientation === 'center' &&
      css`
        /* Image in center */
        padding-top: 5rem !important;
        padding-bottom: 5rem !important;

        text-align: center;
        flex-direction: column;

        ${Meta} {
          order: 1;
          max-width: 600px;
          margin-bottom: 2rem;
        }

        ${Media} {
          order: 2;
          width: 100%;
        }
      `};
  }
`;

export default function ValueProp({
  orientation,
  media,
  title,
  desc,
  lazyload,
  lazyloadPlaceholder,
  ...props
}) {
  return (
    <Wrapper orientation={orientation} {...props}>
      <Meta>
        {title && <Title>{title}</Title>}
        {desc && <Desc>{desc}</Desc>}
      </Meta>

      <Media>
        {lazyload ? (
          <LazyLoad once placeholder={lazyloadPlaceholder}>
            {media}
          </LazyLoad>
        ) : (
          media
        )}
      </Media>
    </Wrapper>
  );
}

ValueProp.propTypes = {
  orientation: PropTypes.oneOf(['left', 'right', 'center']),
  media: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  lazyload: PropTypes.bool,
  lazyloadPlaceholder: PropTypes.node,
};

ValueProp.defaultProps = {
  orientation: 'left',
  lazyload: true,
  lazyloadPlaceholder: null,
};
