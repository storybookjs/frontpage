import React from 'react';
import PropTypes from 'prop-types';
import { css, styled } from '@storybook/theming';
import { styles, animation, Cardinal, AvatarList } from '@storybook/design-system';
import humanFormat from 'human-format';
import { Link as GatsbyLinkWrapper } from 'gatsby';

import { IntegrationImage } from '../IntegrationImage';
import emptySVG from '../../../../images/addon-catalog/recipes/recipe-empty.svg';

const { hoverEffect, spacing, color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const RecipeItemWrapper = styled.div`
  ${hoverEffect}
  display: flex;
  flex-direction: column;
  padding: ${spacing.padding.medium}px ${spacing.padding.medium}px 0;
  text-decoration: none;
  position: relative;

  @media (min-width: ${breakpoint * 1.5}px) {
    padding: ${spacing.padding.medium}px;

    ${(props) =>
      props.orientation === 'horizontal' &&
      `
        flex-direction: row;
        align-items: center;
      `}
  }
`;
RecipeItemWrapper.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};

const ClickIntercept = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Image = styled(IntegrationImage)`
  flex: none;
  width: 48px;
  height: 48px;

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
    `}

  @media (min-width: ${breakpoint * 1.5}px) {
    width: 64px;
    height: 64px;

    ${(props) => props.orientation === 'vertical' && `margin-bottom: 16px;`}
  }
`;

Image.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const ImageLoading = styled.div`
  flex: none;
  width: 48px;
  height: 48px;
  margin-right: ${spacing.padding.medium}px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  ${inlineGlow}

  @media (min-width: ${breakpoint * 1.5}px) {
    width: 64px;
    height: 64px;

    ${(props) => props.orientation === 'vertical' && `margin-bottom: 16px;`}
  }
`;

const TextContainer = styled.div`
  margin-left: ${spacing.padding.medium}px;

  @media (min-width: ${breakpoint * 1.5}px) {
    ${({ orientation }) =>
      orientation === 'vertical' &&
      css`
        margin-top: 16px;
        margin-left: 0px;
      `}
  }
`;

const Title = styled.div`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m2}px;
  color: ${color.darker};
  display: flex;
  align-items: center;
  position: relative;

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.m1}px;
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
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: ${color.darkest};
  position: relative;

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.s3}px;
      span {
        ${inlineGlow}
      }
    `}
`;
Description.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const RecipeInfo = styled.div`
  display: flex;
  align-items: flex-start;
  word-break: break-word;

  @media (min-width: ${breakpoint * 1.5}px) {
    ${(props) =>
      props.orientation === 'horizontal' &&
      `
        align-items: center;
        margin-right: ${spacing.padding.large}px;
      `}

    ${(props) =>
      props.orientation === 'vertical' &&
      `
        display: block;
        margin-bottom: ${spacing.padding.medium}px;
      `}
  }
`;
RecipeInfo.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};

const Spacer = styled.div`
  border-top: 1px solid ${color.border};
  margin-top: ${spacing.padding.large}px;

  @media (min-width: ${breakpoint * 1.5}px) {
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

  @media (min-width: ${breakpoint * 1.5}px) {
    padding: 0;
  }
`;

const Stats = styled(Cardinal)`
  padding: 0;
  margin-right: ${spacing.padding.large}px;
  min-width: 72px;
`;

const Authors = styled(AvatarList)`
  min-width: 95.5px;
`;

export const RecipeItem = ({
  icon = emptySVG,
  accentColor = '#ca8fff',
  name,
  displayName,
  description,
  views,
  orientation,
  isLoading,
  from,
  authors,
  ...props
}) => (
  <RecipeItemWrapper orientation={orientation} {...props}>
    {!isLoading && (
      <ClickIntercept state={{ from }} as={GatsbyLinkWrapper} to={`/recipes/${name}/`} />
    )}
    <RecipeInfo orientation={orientation}>
      {isLoading ? (
        <ImageLoading orientation={orientation} />
      ) : (
        <Image
          orientation={orientation}
          isLoading={isLoading}
          icon={icon && icon !== '' ? icon : emptySVG}
          hideDropShadow
          accent={accentColor}
        />
      )}

      <TextContainer orientation={orientation}>
        <Title isLoading={isLoading}>
          <span>{isLoading ? 'loading' : `How to setup ${displayName || name} and Storybook`}</span>
        </Title>
        <Description isLoading={isLoading}>
          <span>{isLoading ? 'loading description of recipe' : description}</span>
        </Description>
      </TextContainer>
    </RecipeInfo>
    <Spacer />
    <Meta>
      <Stats
        size="small"
        count={
          isLoading
            ? undefined
            : humanFormat(views || 0, {
                decimals: 1,
                separator: '',
              })
        }
        text={isLoading ? undefined : 'Recipe views'}
        noPlural
        isLoading={isLoading}
      />
      <Authors users={isLoading ? undefined : authors || []} isLoading={isLoading} />
    </Meta>
  </RecipeItemWrapper>
);

/* eslint-disable react/require-default-props */
RecipeItem.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  icon: PropTypes.string,
  name: PropTypes.string,
  displayName: PropTypes.string,
  description: PropTypes.string,
  views: PropTypes.number,
  isLoading: PropTypes.bool,
  from: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
};

RecipeItem.defaultProps = {
  orientation: 'horizontal',
  views: 0,
  isLoading: false,
  name: '',
  description: '',
};
