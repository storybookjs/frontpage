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
    padding-top: 0px;
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
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
    `}

  @media (min-width: ${1.5 * breakpoint}px) {
    margin-right: ${spacing.padding.medium}px;
  }
`;
Image.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
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
          <span>{isLoading ? 'loading' : displayName || name}</span>
          {['official', 'integrators'].includes(appearance) && (
            <VerifiedBadge appearance={appearance} creator={verifiedCreator} />
          )}
          {status === 'deprecated' && <DeprecatedBadge>Deprecated</DeprecatedBadge>}
        </Title>
        <Description isLoading={isLoading}>
          <span>{isLoading ? 'loading description of addon' : description}</span>
        </Description>
        <Instructions status={status}>
          <ClipboardCode code={`npx install ${name}`} />
          {publishedAt && (
            <Update>
              <Link href={npmUrl} target="_blank" rel="noopener nofollow noreferrer">
                Last updated {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
              </Link>
              {status === 'essential' && (
                <>
                  {' • '}
                  <Link href={npmUrl}>Pre-installed with Storybook</Link>
                </>
              )}
            </Update>
          )}
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
            : humanFormat(weeklyDownloads, {
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

/* eslint-disable react/require-default-props */
AddonItemDetail.propTypes = {
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

AddonItemDetail.defaultProps = {
  appearance: 'community',
  status: 'default',
  weeklyDownloads: 0,
  isLoading: false,
  name: '',
  description: '',
  verifiedCreator: '',
  npmUrl: '',
};
