import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import humanFormat from 'human-format';
import { styles, Cardinal, AvatarList, Icon } from '@storybook/design-system';
import customSVG from '../../../images/addon-catalog/custom.svg';

const { hoverEffect, spacing, color, typography, breakpoint } = styles;

const VerifiedBadge = styled(Icon).attrs({ icon: 'verified', block: true })`
  color: ${(props) => (props.appearance === 'official' ? color.secondary : color.green)};
  width: 14px;
  height: 14px;
  margin-left: ${spacing.padding.small}px;
  margin-bottom: 2px;
`;
VerifiedBadge.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrator']),
};

const AddonItemLink = styled.a`
  ${hoverEffect}
  display: block;
  padding: ${spacing.padding.medium}px ${spacing.padding.medium}px 0;
  text-decoration: none;

  @media (min-width: ${breakpoint}px) {
    padding: ${spacing.padding.medium}px;

    ${(props) =>
      props.orientation === 'horizontal' &&
      css`
        display: flex;
        align-items: center;
      `}
  }
`;
AddonItemLink.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

const Image = styled.div`
  flex: none;
  width: 48px;
  height: 48px;
  margin-right: ${spacing.padding.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    max-width: 100px;
    width: 100%;
    height: auto;
  }

  @media (min-width: ${breakpoint}px) {
    width: 64px;
    height: 64px;

    ${(props) =>
      props.orientation === 'vertical' &&
      css`
        margin-bottom: 16px;
      `}
  }
`;
Image.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m2}px;
  color: ${color.darker};
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: ${color.darkest};
`;

const AddonInfo = styled.div`
  display: flex;
  align-items: flex-start;

  @media (min-width: ${breakpoint}px) {
    ${(props) =>
      props.orientation === 'horizontal' &&
      css`
        align-items: center;
        margin-right: ${spacing.padding.large}px;
      `}

    ${(props) =>
      props.orientation === 'vertical' &&
      css`
        display: block;
        margin-bottom: ${spacing.padding.medium}px;
      `}
  }
`;
AddonInfo.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

const Spacer = styled.div`
  border-top: 1px solid ${color.border};
  margin-top: ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint}px) {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    border: 0;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 16px;
  padding-bottom: 16px;

  @media (min-width: ${breakpoint}px) {
    padding: 0;
  }
`;

const Stats = styled(Cardinal)`
  padding: 0;
  margin-right: ${spacing.padding.large}px;
`;

export const AddonItem = ({
  image,
  title,
  description,
  downloads,
  addonUrl,
  authors,
  orientation,
  appearance,
  ...props
}) => (
  <AddonItemLink href={addonUrl} orientation={orientation} {...props}>
    <AddonInfo orientation={orientation}>
      <Image orientation={orientation}>
        <img alt="" src={image} />
      </Image>
      <div>
        <Title>
          {title}
          {['official', 'integrator'].includes(appearance) && (
            <VerifiedBadge appearance={appearance} />
          )}
        </Title>
        <Description>{description}</Description>
      </div>
    </AddonInfo>
    <Spacer />
    <Meta>
      <Stats
        size="small"
        count={humanFormat(downloads, {
          decimals: 1,
        })}
        text="Downloads"
        noPlural
      />
      <AvatarList users={authors} />
    </Meta>
  </AddonItemLink>
);

AddonItem.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  appearance: PropTypes.oneOf(['official', 'integrator', 'community']),
  image: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  downloads: PropTypes.number,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    })
  ),
  addonUrl: PropTypes.string.isRequired,
};

AddonItem.defaultProps = {
  orientation: 'horizontal',
  appearance: 'community',
  image: customSVG,
  downloads: 0,
  authors: [],
};
