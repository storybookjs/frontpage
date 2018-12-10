import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import pluralize from 'pluralize';

import { background, color, typography } from './../../shared/styles';
import { inlineGlow } from './../../shared/animation';
import Link from './Link';

const Count = styled.div`
  color: ${color.dark};
  display: block;

  ${props =>
    props.status === 'primary' &&
    css`
      color: ${color.gold};
    `};

  ${props =>
    props.status === 'secondary' &&
    css`
      color: ${color.secondary};
    `};

  ${props =>
    props.status === 'tertiary' &&
    css`
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
  text-align: ${props => (props.size === 'small' ? 'left' : 'center')};
  vertical-align: top;
  padding: 8px 12px;
  border-radius: 4px;

  ${Count} {
    font-weight: ${props =>
      props.size === 'small' ? typography.weight.bold : typography.weight.regular};
    font-size: ${props => (props.size === 'small' ? typography.size.s2 : typography.size.l1)}px;
    line-height: ${props => (props.size === 'small' ? typography.size.s3 : typography.size.l1)}px;
    margin-bottom: 2px;
  }

  ${Text} {
    color: ${props => (props.size === 'small' ? color.mediumdark : color.dark)};
    font-size: ${props => (props.size === 'small' ? typography.size.s1 : typography.size.s2)}px;
    line-height: ${typography.size.s2}px;
    clear: both;
  }
`;

function Cardinal({ size, count, countLink, text, noPlural, status, ...props }) {
  const cardinalInner = (
    <CardinalInner size={size} {...props}>
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
  size: PropTypes.oneOf(['small', 'large']),
  count: PropTypes.node,
  countLink: PropTypes.string,
  text: PropTypes.string.isRequired,
  noPlural: PropTypes.bool,
  status: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'default']),
};

Cardinal.defaultProps = {
  size: 'large',
  status: 'default',
  count: '000',
  countLink: null,
  noPlural: false,
  text: 'loading',
};

export default Cardinal;
