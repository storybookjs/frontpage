import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';

import { background, color, typography, pageMargins, breakpoint } from './../shared/styles';
import { url } from './../shared/urls';

import MailingListSubscribeForm from './MailingListSubscribeForm';
import Cardinal from './Cardinal';

import { Heading, Title, Desc } from './PageTitle';

const Image = styled.img``;

const Media = styled.div`
  width: 100%;
  position: relative;

  ${Image} {
    max-width: 320px;
    height: auto;
    display: block;
    width: 100%;
    object-fit: contain;

    @media (min-width: ${breakpoint}px) {
      max-width: 440px;
    }
  }
`;

const Meta = styled.div``;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;

  ${Media} {
    display: flex;
    justify-content: center;

    ${Image} {
      align-self: start;
    }
  }

  @media (min-width: ${breakpoint}px) {
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
    text-align: left;

    align-items: center;
    flex-direction: row;

    ${Meta}, ${Media} {
      flex: 1;
    }

    ${Meta} {
      max-width: 480px;
      padding-right: 5%;
    }

    ${Media} {
      justify-content: flex-end;

      ${Image} {
        align-self: flex-end;
      }
    }
  }
`;

const GitHubWrapper = styled.div`
  margin-bottom: 0.75rem;

  @media (min-width: ${breakpoint * 2}px) {
    ${'' /* this has a bit different styling than stats children */};
    margin-bottom: 1.25rem;
  }

  ${'' /* Overrides to make a medium-sized button */};
  .github-btn {
    font: bold 12px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: block;

    height: auto;
    .gh-btn,
    .gh-count {
      padding: 2px 6px;
    }

    .gh-ico {
      height: 12px;
      width: 12px;
      margin-top: 1px;
    }
  }
`;

const Stat = styled(Cardinal)`
  padding: 0;
  display: block;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  justify-content: space-around;

  @media (min-width: ${breakpoint}px) {
    justify-content: stretch;
    > ${Stat} {
      flex: 1;
    }
  }
`;

const MailingListText = styled.div`
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  margin-bottom: 0.5rem;
  color: ${color.mediumdark};
`;

const MailingListConfirm = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  background: ${background.positive};
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  max-width: 340px;
`;

const MailingListForm = styled(MailingListSubscribeForm)`
  min-width: 280px;
  width: 100%;
`;

const MailingListWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoint}px) {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  ${MailingListConfirm}, ${MailingListForm} {
    margin: 0 auto;
    @media (min-width: ${breakpoint}px) {
      margin: 0;
    }
  }
`;

export default function CommunityHero({ hasSubscribed, onSubscribe, ...props }) {
  const [namespace, repo] = url.gitHub.repo.match(/github.com\/(.*)\/(.*)$/).slice(1);
  return (
    <Wrapper {...props}>
      <Meta>
        <Heading color="seafoam">Community</Heading>
        <Title>Get involved</Title>
        <Desc>
          Thousands of frontend developers use Storybook every day. Join us to learn new techniques,
          get help, and develop UIs faster.
        </Desc>
        <MailingListWrapper>
          <MailingListText>Subscribe to the official mailing list</MailingListText>
          {hasSubscribed ? (
            <MailingListConfirm>
              <b>👍 Thanks, you're all signed up!</b>
            </MailingListConfirm>
          ) : (
            <MailingListForm onSubscribe={onSubscribe} cta="Sign up" />
          )}
        </MailingListWrapper>
        <Stats>
          <Stat
            size="small"
            count={`800k`}
            text="Installs per month"
            noPlural
            status="secondary"
            countLink={url.npm}
          />
          <Stat
            size="small"
            count={`+550`}
            text="Contributors"
            noPlural
            status="tertiary"
            countLink={url.gitHub.contributors}
          />
          <GitHubWrapper>
            <GitHubButton type="stargazers" namespace={namespace} repo={repo} />
          </GitHubWrapper>
        </Stats>
      </Meta>

      <Media>
        <Image src="images/community/hero.jpg" />
      </Media>
    </Wrapper>
  );
}

CommunityHero.propTypes = {
  hasSubscribed: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
