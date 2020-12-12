import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import pluralize from 'pluralize';

import { Link, styles, animation } from '@storybook/design-system';

const { color, typography } = styles;
const { inlineGlow } = animation;

const Count = styled.div`
  color: ${color.dark};
  display: block;

  ${(props) =>
    props.status === 'primary' &&
    `
      color: ${color.gold};
    `};

  ${(props) =>
    props.status === 'secondary' &&
    `
      color: ${color.secondary};
    `};

  ${(props) =>
    props.status === 'tertiary' &&
    `
      color: ${color.green};
    `};

  span {
    display: inline-block;
  }
`;

const Text = styled.div`
  span {
    display: inline-block;
  }
`;

const CardinalInner = styled.div`
  display: inline-block;
  text-align: ${(props) => (props.size === 'small' ? 'left' : 'center')};
  vertical-align: top;
  padding: 8px 12px;
  border-radius: 4px;

  ${(props) =>
    props.loading &&
    css`
      ${Count}, ${Text} {
        overflow: hidden;

        > span,
        a {
          ${inlineGlow};
        }
      }
    `};

  ${Count} {
    font-weight: ${(props) =>
      props.size === 'small' ? typography.weight.bold : typography.weight.regular};
    font-size: ${(props) => (props.size === 'small' ? typography.size.s2 : typography.size.l1)}px;
    line-height: ${(props) => (props.size === 'small' ? typography.size.s3 : typography.size.l1)}px;
    margin-bottom: 2px;
  }

  ${Text} {
    color: ${(props) => (props.size === 'small' ? color.mediumdark : color.dark)};
    font-size: ${(props) => (props.size === 'small' ? typography.size.s1 : typography.size.s2)}px;
    line-height: ${typography.size.s2}px;
    clear: both;
  }
`;

function Cardinal({ loading, size, count, countLink, text, noPlural, status, ...props }) {
  const cardinalInner = (
    <CardinalInner loading={loading} size={size} {...props}>
      <Count status={status}>
        <span>{count}</span>
      </Count>
      <Text>
        <span>{!noPlural && typeof count === 'number' ? pluralize(text, count) : text}</span>
      </Text>
    </CardinalInner>
  );

  let cardinal = cardinalInner;
  if (countLink) {
    cardinal = (
      <Link href={countLink} {...props}>
        {cardinalInner}
      </Link>
    );
  }

  return <Fragment>{cardinal}</Fragment>;
}

Cardinal.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  count: PropTypes.node,
  countLink: PropTypes.string,
  text: PropTypes.string,
  noPlural: PropTypes.bool,
  status: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'default']),
};

Cardinal.defaultProps = {
  loading: false,
  size: 'large',
  status: 'default',
  count: '000',
  countLink: null,
  noPlural: false,
  text: 'loading',
};

export default Cardinal;
