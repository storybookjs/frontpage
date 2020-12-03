import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import humanFormat from 'human-format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { styles, animation, Cardinal, ClipboardCode, Link, Badge } from '@storybook/design-system';
import customSVG from '../../../images/addon-catalog/custom.svg';
import { VerifiedBadge } from './VerifiedBadge';
import { StorybookBadge } from './StorybookBadge';

const { spacing, color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const AddonItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0 24px 0;
  text-decoration: none;
  position: relative;
  border-top: 1px solid ${color.border};
  border-bottom: 1px solid ${color.border};
  margin-bottom: 40px;

  @media (min-width: ${1.5 * breakpoint}px) {
    padding-top: ${spacing.padding.medium}px;
    padding-bottom: 40px;
    flex-direction: row;
    align-items: flex-start;
    border-top: 0;
  }
`;

const Image = styled.div`
  flex: none;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  img {
    display: block;
    max-width: 100px;
    width: 100%;
    height: auto;
  }

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
      img {
        display: none;
      }
    `}

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-right: ${spacing.padding.medium}px;
  }
`;
Image.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.l2}px;
  color: ${color.darkest};
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 12px;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: 4px;
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
  line-height: ${typography.size.m1}px;
  color: ${color.darkest};
  position: relative;
  margin-bottom: 16px;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-bottom: ${spacing.padding.medium}px;
    margin-right: 40px;
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
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: ${1.5 * breakpoint}px) {
    flex-direction: row;
  }
`;

const Spacer = styled.div`
  margin-top: 0;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: ${spacing.padding.large}px;
    flex: 1 1 auto;
    min-width: 0;
  }
`;

const Meta = styled.div`
  @media (min-width: ${1.5 * breakpoint}px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 210px;
    flex: none;
  }
`;

const Stats = styled(Cardinal)`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  margin-bottom: 16px;
  display: none;

  @media (min-width: ${1.5 * breakpoint}px) {
    display: block;
  }
`;

const DeprecatedBadge = styled(Badge).attrs({ status: 'warning' })`
  margin-left: ${spacing.padding.small}px;
`;

const Update = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: #ccc;
  display: none;

  @media (min-width: ${1.5 * breakpoint}px) {
    display: block;
  }
`;

const Instructions = styled.div`
  display: flex;
  align-items: center;

  ${Update} {
    margin-left: ${spacing.padding.medium}px;
  }

  ${(props) =>
    props.status === 'essential' &&
    `
    flex-direction: column;
    align-items: flex-start;

    ${Update} {
      margin-top: 12px;
      margin-left: 0;
    }
  `}
`;
Instructions.propTypes = {
  status: PropTypes.oneOf(['default', 'essential', 'deprecated']).isRequired,
};

const MadeByStorybook = styled(StorybookBadge)`
  margin-top: 24px;

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-top: 0;
  }
`;

export const AddonItemDetail = ({
  image,
  title,
  description,
  downloads,
  addonUrl,
  appearance,
  status,
  isLoading,
  packageName,
  verifiedCreator,
  updated,
  ...props
}) => (
  <AddonItemWrapper {...props}>
    <AddonInfo>
      <Image isLoading={isLoading}>
        <img alt="" src={image} />
      </Image>
      <div>
        <Title isLoading={isLoading}>
          <span>{isLoading ? 'loading' : title}</span>
          {['official', 'integrator'].includes(appearance) && (
            <VerifiedBadge appearance={appearance} creator={verifiedCreator} />
          )}
          {status === 'deprecated' && <DeprecatedBadge>Deprecated</DeprecatedBadge>}
        </Title>
        <Description isLoading={isLoading}>
          <span>{isLoading ? 'loading description of addon' : description}</span>
        </Description>
        <Instructions status={status}>
          <ClipboardCode code={`npx install ${packageName}`} />
          <Update>
            <Link href={updated.url}>
              Last updated {formatDistanceToNow(new Date(updated.date), { addSuffix: true })}
            </Link>
            {status === 'essential' && (
              <>
                {' • '}
                <Link href={updated.url}>Pre-installed with Storybook</Link>
              </>
            )}
          </Update>
        </Instructions>
      </div>
    </AddonInfo>
    <Spacer />
    <Meta>
      <Stats
        size="large"
        status="link"
        count={
          isLoading
            ? undefined
            : humanFormat(downloads, {
                decimals: 1,
                separator: '',
              })
        }
        text={isLoading ? undefined : 'Downloads per week'}
        noPlural
        isLoading={isLoading}
      />
      {appearance === 'official' && <MadeByStorybook />}
    </Meta>
  </AddonItemWrapper>
);

AddonItemDetail.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrator', 'community']),
  status: PropTypes.oneOf(['default', 'essential', 'deprecated']),
  image: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  downloads: PropTypes.number,
  addonUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  verifiedCreator: PropTypes.string,
  updated: PropTypes.shape({
    date: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  packageName: PropTypes.string.isRequired,
};

AddonItemDetail.defaultProps = {
  appearance: 'community',
  status: 'default',
  image: customSVG,
  downloads: 0,
  isLoading: false,
  addonUrl: '#',
  title: '',
  description: '',
  verifiedCreator: '',
};
