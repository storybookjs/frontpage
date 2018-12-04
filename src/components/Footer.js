import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import Subheading from './Subheading';

import Link from './Link';

import { background, color, typography, pageMargins, breakpoint } from './../shared/styles';
import { url } from './../shared/urls';

const Title = styled(Subheading)`
  display: block;
  font-size: ${typography.size.s1}px;
  margin-bottom: 0.75rem;
  color: ${color.mediumdark};
`;

const LogotypeWrapper = styled.a`
  margin-bottom: 1rem;
  display: block;

  svg {
    height: 26px;
    width: 132.8px;
    display: block;

    transition: all 150ms ease-out;
    transform: translate3d(0, 0, 0);
    &:hover {
      transform: translate3d(0, -1px, 0);
    }
    &:active {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const FooterLink = styled(Link)``;

const Text = styled.div`
  color: ${color.mediumdark};
`;

const Service = styled.div``;
const Services = styled.div``;

const Colophon = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  display: block;

  @media (min-width: ${breakpoint * 1.5}px) {
    margin-bottom: 0;
    width: auto;
  }
`;

const Column = styled.div`
  width: 50%;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoint}px) {
    width: auto;
    margin-bottom: 0;
  }

  > ${FooterLink} {
    display: block;
    margin-bottom: 0.75rem;
  }
`;

const Upper = styled.div`
  ${pageMargins};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Lower = styled.div`
  ${pageMargins};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Footer = styled.div`
  background-color: ${background.app};
  border-top: 1px solid ${color.mediumlight};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  padding: 3rem 0;
`;

const ResourceTitle = styled.div``;
const ResourceTitleLink = styled.div``;
const ResourceDesc = styled.div``;
const ResourceAction = styled(Link)``;
const ResourceActions = styled.div``;

const Meta = styled.div`
  overflow: hidden;
`;
const Resource = styled.div``;
const Resources = styled.div``;

export default function MarketingFooter({ ...props }) {
  return (
    <Footer {...props}>
      <Upper>
        <Column>
          <Title>Learn</Title>
          <Resources>
            <Resource>
              <img src="" alt="Docs image" />
              <Meta>
                <ResourceTitle>Get started with Storybook</ResourceTitle>
                <ResourceDesc>
                  Add Storybook to your project in less than a minute to build components faster and
                  easier.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction>
                    React <Icon icon="arrowright" />
                  </ResourceAction>
                  <ResourceAction>
                    Vue <Icon icon="arrowright" />
                  </ResourceAction>
                  <ResourceAction>
                    Angular <Icon icon="arrowright" />
                  </ResourceAction>
                  <ResourceAction>
                    View more <Icon icon="arrowright" />
                  </ResourceAction>
                </ResourceActions>
              </Meta>
            </Resource>
            <Resource>
              <img src="" alt="Tutorial image" />
              <Meta>
                <ResourceTitle>Storybook tutorial</ResourceTitle>
                <ResourceDesc>
                  Learn Storybook with a 9-chapter tutorial that teaches Storybook best practices as
                  you build a UI from scratch.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction href="https://www.learnstorybook.com/">
                    Learn Storybook now <Icon icon="arrowright" />
                  </ResourceAction>
                </ResourceActions>
              </Meta>
            </Resource>
          </Resources>
        </Column>
        <Column>
          <Title>News</Title>{' '}
          <Link>
            Read more <Icon icon="arrowright" />
          </Link>
          // TODO: Pull latest articles from Medium API by tag "news"
          <Resources>
            <Resource>
              <Meta>
                <ResourceTitleLink>Storybook 4.0 is here</ResourceTitleLink>
                <ResourceDesc>Big updates to support more build tools and frameworks</ResourceDesc>
              </Meta>
            </Resource>
            <Resource>
              <Meta>
                <ResourceTitleLink>Storybook 4.0 is here</ResourceTitleLink>
                <ResourceDesc>Big updates to support more build tools and frameworks</ResourceDesc>
              </Meta>
            </Resource>
            <Resource>
              <Meta>
                <ResourceTitleLink>Storybook 4.0 is here</ResourceTitleLink>
                <ResourceDesc>Big updates to support more build tools and frameworks</ResourceDesc>
              </Meta>
            </Resource>
          </Resources>
        </Column>
      </Upper>
      <hr />
      <Lower>
        <Colophon>
          <LogotypeWrapper href="/">
            <img src="logos/logo-storybook.svg" alt="Storybook" />
          </LogotypeWrapper>
          <Text>
            The MIT License (MIT)
            <br />
            Website design by{' '}
            <Link tertiary href="https://www.chromaui.com">
              Chroma
            </Link>{' '}
            and the awesome Storybook community.
          </Text>
          <Services>
            <Service>
              <Text>Hosting by</Text>
              <a href="https://netlify.com">
                <img src="logos/user/logo-netlify.svg" alt="Netlify" />
              </a>
            </Service>
            <Service>
              <Text>Visual testing by</Text>
              <a href="https://www.chromaticqa.com/">
                <img src="logos/user/logo-chromatic.svg" alt="Chromatic" />
              </a>
            </Service>
            <Service>
              <Text>Continuous integration by</Text>
              <a href="https://www.jetbrains.com/teamcity/">
                <img src="logos/user/logo-teamcity.svg" alt="Teamcity" />
              </a>
              <a href="https://circleci.com/">
                <img src="logos/user/logo-circleci.svg" alt="CircleCI" />
              </a>
            </Service>
          </Services>
        </Colophon>
        <Column>
          <Title>Storybook</Title>
          <FooterLink tertiary href={url.docs}>
            Docs
          </FooterLink>
          <FooterLink tertiary href={url.addons}>
            Addons
          </FooterLink>
          <FooterLink tertiary href={url.community}>
            Community
          </FooterLink>
          <FooterLink tertiary href={url.useCases}>
            Use cases
          </FooterLink>
          <FooterLink tertiary href={url.Support}>
            Support
          </FooterLink>
          <FooterLink tertiary href={url.releases}>
            Releases
          </FooterLink>
        </Column>
        <Column>
          <Title>Community</Title>
          <FooterLink tertiary href={url.gitHub.repo}>
            <Icon icon="github" /> GitHub
          </FooterLink>
          <FooterLink tertiary href={url.blog}>
            <Icon icon="medium" /> Blog
          </FooterLink>
          <FooterLink tertiary href={url.twitter}>
            <Icon icon="twitter" /> Twitter
          </FooterLink>
          <FooterLink tertiary href={url.chat}>
            <Icon icon="discord" /> Discord chat
          </FooterLink>
          <FooterLink tertiary href={url.youtube}>
            <Icon icon="youtube" /> Youtube
          </FooterLink>
        </Column>
        <Column>
          <Title>Mailing list</Title>
          Get news, free tutorials, and Storybook tips emailed to you.
          <br />
          // Insert mailing list form
        </Column>
      </Lower>
    </Footer>
  );
}
