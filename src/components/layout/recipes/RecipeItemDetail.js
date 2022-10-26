import React from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import { styles, animation, Cardinal, ClipboardCode, Link, Badge } from '@storybook/design-system';
import customSVG from '../../../images/addon-catalog/custom.svg';

const { spacing, color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const AddonItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 24px 0;
  text-decoration: none;
  position: relative;
  border-bottom: 1px solid ${color.border};
  margin-top: 40px;
  margin-bottom: 40px;

  @media (min-width: ${1.5 * breakpoint}px) {
    padding-top: 0px;
    padding-bottom: 40px;
  }
`;

const Image = styled.div`
  flex: none;
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
    `}
`;
Image.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

const Title = styled.div`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.l2}px;
  text-align: center;
  color: ${color.darkest};
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 12px;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: 24px;
  }

  span {
    width: 100%;
  }

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.l1}px;
      span {
        ${inlineGlow}
        margin-bottom: 8px;
      }
    `}
`;
Title.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Description = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m2}px;
  text-align: center;
  color: ${color.darkest};
  position: relative;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-bottom: ${spacing.padding.medium}px;
    padding-left: 100px;
    padding-right: 100px;
  }

  span {
    width: 100%;
  }

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.s3}px;
      span {
        ${inlineGlow}
      }
    `};
`;

const AddonInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Spacer = styled.div`
  margin-top: 0;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: ${spacing.padding.large}px;
    flex: 1 1 auto;
    min-width: 0;
  }
`;

export const RecipeItemDetail = ({
  icon,
  name,
  displayName,
  description,
  weeklyDownloads,
  appearance,
  status,
  isLoading,
  verifiedCreator,
  publishedAt,
  npmUrl,
  ...props
}) => (
  <AddonItemWrapper {...props}>
    <AddonInfo>
      <Image isLoading={isLoading} src={icon || customSVG} />
      <div>
        <Title isLoading={isLoading}>
          <span>{isLoading ? 'loading' : `Integrate Storybook and ${displayName || name}`}</span>
        </Title>
        <Description isLoading={isLoading}>
          <span>{isLoading ? 'loading description of addon' : description}</span>
        </Description>
      </div>
    </AddonInfo>
    <Spacer />
  </AddonItemWrapper>
);

/* eslint-disable react/require-default-props */
RecipeItemDetail.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrators', 'community']),
  status: PropTypes.oneOf(['default', 'essential', 'deprecated']),
  icon: PropTypes.string,
  name: PropTypes.string,
  displayName: PropTypes.string,
  description: PropTypes.string,
  weeklyDownloads: PropTypes.number,
  isLoading: PropTypes.bool,
  verifiedCreator: PropTypes.string,
  publishedAt: PropTypes.number,
  npmUrl: PropTypes.string,
};

RecipeItemDetail.defaultProps = {
  appearance: 'community',
  status: 'default',
  weeklyDownloads: 0,
  isLoading: false,
  name: '',
  description: '',
  verifiedCreator: '',
  npmUrl: '',
};
