import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import { IntegrationImage } from '../IntegrationImage';
import emptySVG from '../../../../images/addon-catalog/recipes/recipe-empty.svg';

const { color, typography, breakpoint } = styles;

const RecipeItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
  border-bottom: 1px solid ${color.border};

  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  @media (min-width: ${1 * breakpoint}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 40px;
  }
`;

const Image = styled.div`
  flex: none;
  width: 64px;
  height: 64px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
Image.propTypes = {
  src: PropTypes.string.isRequired,
};

const TextContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.l1}px;
  line-height: ${typography.size.l2}px;
  color: ${color.darkest};
  position: relative;
  margin-top: 1rem;
  margin-bottom: 0.75rem;

  @media (min-width: ${1 * breakpoint}px) {
    margin-top: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  color: ${color.darkest};
  position: relative;
  max-width: 600px;
  margin: 0;
`;

const RecipeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const RecipeItemDetail = ({
  icon = emptySVG,
  name,
  displayName,
  description,
  weeklyDownloads,
  appearance,
  status,
  verifiedCreator,
  publishedAt,
  npmUrl,
  accentColor = '#ca8fff',
  ...props
}) => {
  const formattedName = displayName || name;
  const formattedDescription = `${description} This recipe shows you how to get the most out of ${formattedName} in Storybook.`;

  return (
    <RecipeItemWrapper {...props}>
      <RecipeInfo>
        <IntegrationImage icon={icon} accent={accentColor} withConnector />
        <TextContainer>
          <Title>{`Integrate ${formattedName} and Storybook`}</Title>
          <Description>{formattedDescription}</Description>
        </TextContainer>
      </RecipeInfo>
    </RecipeItemWrapper>
  );
};

/* eslint-disable react/require-default-props */
RecipeItemDetail.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrators', 'community']),
  status: PropTypes.oneOf(['default', 'essential', 'deprecated']),
  icon: PropTypes.string,
  name: PropTypes.string,
  displayName: PropTypes.string,
  description: PropTypes.string,
  weeklyDownloads: PropTypes.number,
  verifiedCreator: PropTypes.string,
  publishedAt: PropTypes.number,
  npmUrl: PropTypes.string,
};

RecipeItemDetail.defaultProps = {
  appearance: 'community',
  status: 'default',
  weeklyDownloads: 0,
  name: '',
  description: '',
  verifiedCreator: '',
  npmUrl: '',
};
