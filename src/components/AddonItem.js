import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, spacing, typography, pageMargin, breakpoint } from './../shared/styles';

const Image = styled.div`
  float: left;
  margin-right: 20px;
  margin-top: 4px;
  svg {
    display: block;
  }

  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1.25rem;
    margin-right: 0;
    margin-top: 0;
    float: none;
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.extrabold};
  margin-bottom: 0.25rem;
`;
const Desc = styled.div`
  color: ${color.dark};
`;

const Meta = styled.div`
  overflow: hidden;
`;

const Children = styled.div`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1.5;
`;

export default function AddonItem({ image, title, desc, appearance, ...props }) {
  return (
    <Wrapper appearance={appearance} {...props}>
      {appearance === 'official' && image && <Image>{image}</Image>}
      <Meta>
        {title && <Title>{title}</Title>}
        {desc && <Desc>{desc}</Desc>}
      </Meta>
    </Wrapper>
  );
}

AddonItem.propTypes = {
  appearance: PropTypes.oneOf(['official', 'community']),
  image: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
};

AddonItem.defaultProps = {
  appearance: 'community',
};
