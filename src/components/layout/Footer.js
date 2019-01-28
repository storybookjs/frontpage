import React from 'react';
import styled from 'styled-components';

import { Icon, Link, Subheading, styles, site, WithMediumData } from '../basics';

import ConfirmedMailingList from './ConfirmedMailingList';
import { navLinks } from './PageLayout';

const { background, color, typography, pageMargins, pageMargin, spacing, breakpoint } = styles;
const { url } = site;

const Title = styled(Subheading)`
  display: block;
  font-size: ${typography.size.s1}px;
  margin-bottom: 1rem;
  color: ${color.mediumdark};
`;

const SubLink = styled(Link)`
  text-transform: none;
  letter-spacing: 0;
  font-weight: ${typography.weight.regular};
  margin-left: 20px;
`;

const ResourceTitle = styled.div`
  font-weight: ${typography.weight.black};
  margin-bottom: 0.25rem;
`;

const ResourceTitleLink = styled(Link)`
  font-weight: ${typography.weight.black};
  margin-bottom: 0.25rem;

  svg {
    height: 0.7rem;
    width: 0.7rem;
    vertical-align: initial;
  }
`;

const ResourceDesc = styled.div`
  margin-bottom: 0.25rem;
`;

const ResourceAction = styled(Link)`
  margin-right: 15px;
`;

const ResourceActions = styled.div``;

const Meta = styled.div`
  overflow: hidden;
`;

const Resource = styled.div`
  display: flex;
  align-items: start;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  img {
    margin-right: 20px;
    display: block;
    width: 40px;
    height: auto;
  }

  @media (min-width: ${breakpoint * 1}px) {
    img {
      width: 48px;
    }
  }
`;

const Resources = styled.div``;

const UpperColumn = styled.div`
  flex: 1;

  padding-left: ${spacing.padding.medium}px;
  padding-right: ${spacing.padding.medium}px;
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:last-child {
    border-top: 1px solid ${color.border};
  }

  @media (min-width: ${breakpoint * 1}px) {
    &:first-child {
      margin-left: ${pageMargin * 1}%;
      padding-right: 60px;
    }
    &:last-child {
      margin-right: ${pageMargin * 1}%;
      padding-left: 60px;
      border-top: none;
      border-left: 1px solid ${color.border};
    }
  }

  @media (min-width: ${breakpoint * 2}px) {
    &:first-child {
      margin-left: ${pageMargin * 2}%;
    }
    &:last-child {
      margin-right: ${pageMargin * 2}%;
    }
  }

  @media (min-width: ${breakpoint * 3}px) {
    &:first-child {
      margin-left: ${pageMargin * 3}%;
    }
    &:last-child {
      margin-right: ${pageMargin * 3}%;
    }
  }

  @media (min-width: ${breakpoint * 4}px) {
    &:first-child {
      margin-left: ${pageMargin * 4}%;
    }
    &:last-child {
      margin-right: ${pageMargin * 4}%;
    }
  }
`;

const Upper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-bottom: 1px solid ${color.border};

  @media (min-width: ${breakpoint}px) {
    flex-direction: row;
  }
`;

const LogotypeWrapper = styled(Link)`
  margin-bottom: 1rem;
  display: block;

  img {
    height: 28px;
    width: auto;
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
  color: ${color.darker};
`;
const Colophon = styled.div`
  a {
    display: inline-block;
    vertical-align: top;
  }
`;

const Column = styled.div`
  > ${FooterLink} {
    display: block;
    margin-bottom: 0.75rem;
  }
`;

const Subscribe = styled.div`
  ${Text} {
    margin-bottom: 1rem;
  }
`;

const HrWrapper = styled.div`
  ${pageMargins};
  hr {
    margin: 0;
  }
`;

const Netlify = styled.img``;
const Chromatic = styled.img``;
const Teamcity = styled.img``;
const CircleCI = styled.img``;

const Service = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  ${Text} {
    margin-bottom: 0.5rem;
    color: ${color.mediumdark};
  }
`;

const Services = styled.div`
  ${pageMargins};
  padding-top: 2rem;
  padding-bottom: 1rem;

  display: flex;
  flex-wrap: wrap;

  @media (min-width: ${breakpoint}px) {
    justify-content: space-around;
    text-align: center;
  }

  ${Service} {
    flex: 0 0 50%;
    @media (min-width: ${breakpoint}px) {
      flex: 1;
    }
  }

  a {
    display: inline-block;
    transition: all 150ms ease-out;
    transform: translate3d(0,0,0);

    &:hover {
      transform: translate3d(0,-2px,0);
    }

    &:active {
      transform: translate3d(0,0,0);
    }
  }

  ${Netlify}, ${Chromatic}, ${Teamcity}, ${CircleCI} {
    height: 22px;
    width: auto;
    display: inline-block;
    filter: grayscale(100%);
    transition: all 150ms ease-out;

    &:hover {
      filter: grayscale(0%);
    }
  }

  ${Teamcity} {
    /* Makes visual impact the same as other logos */
    padding: 2px 0;
    margin-right: 10px;
  }

  ${Teamcity}, ${CircleCI} {
    /* Turn down the pure black of these logos */
    opacity: .75;
  }
`;

const Lower = styled.div`
  ${pageMargins};
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${Colophon} {
    width: 100%;
    margin-bottom: 3rem;
    display: block;

    @media (min-width: ${breakpoint * 1}px) {
      margin-bottom: 3rem;
      width: auto;
      max-width: 200px;
    }
  }

  ${Column} {
    width: 50%;
    margin-bottom: 2.25rem;

    @media (min-width: ${breakpoint}px) {
      padding-right: 20px;
      width: auto;
      margin-bottom: 2.25rem;
    }
  }

  ${Subscribe} {
    width: 100%;
    margin-bottom: 3rem;
    @media (min-width: ${breakpoint}px) {
      width: auto;
      margin-bottom: 3rem;
    }
  }
`;

const FooterWrapper = styled.div`
  background-color: ${background.app};
  border-top: 1px solid ${color.border};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
`;

export default function Footer({ hasSubscribed, onSubscribe, ...props }) {
  return (
    <FooterWrapper {...props}>
      <Upper>
        <UpperColumn>
          <Title>Learn</Title>
          <Resources>
            <Resource>
              <img src="/images/colored-icons/repo.svg" alt="Docs" />
              <Meta>
                <ResourceTitle>Get started with Storybook</ResourceTitle>
                <ResourceDesc>
                  Add Storybook to your project in less than a minute to build components faster and
                  easier.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction withArrow href={url.framework.react}>
                    React
                  </ResourceAction>
                  <ResourceAction withArrow href={url.framework.vue}>
                    Vue
                  </ResourceAction>
                  <ResourceAction withArrow href={url.framework.angular}>
                    Angular
                  </ResourceAction>
                  <ResourceAction withArrow href={url.docs.home}>
                    View more
                  </ResourceAction>
                </ResourceActions>
              </Meta>
            </Resource>
            <Resource>
              <img src="/images/colored-icons/direction.svg" alt="Tutorial" />
              <Meta>
                <ResourceTitle>Storybook tutorial</ResourceTitle>
                <ResourceDesc>
                  Learn Storybook with a 10-chapter tutorial that teaches Storybook best practices
                  as you build a UI from scratch.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction href="https://www.learnstorybook.com/" withArrow>
                    Learn Storybook now
                  </ResourceAction>
                </ResourceActions>
              </Meta>
            </Resource>
          </Resources>
        </UpperColumn>
        <UpperColumn>
          <Title>
            News
            <SubLink tertiary withArrow href={url.blog}>
              Read more
            </SubLink>
          </Title>{' '}
          <Resources>
            <WithMediumData
              render={posts =>
                posts.map(({ id, title, subtitle, link }) => (
                  <Resource key={id}>
                    <Meta>
                      <ResourceTitleLink tertiary withArrow href={link}>
                        {title}
                      </ResourceTitleLink>
                      <ResourceDesc>{subtitle}</ResourceDesc>
                    </Meta>
                  </Resource>
                ))
              }
            />
          </Resources>
        </UpperColumn>
      </Upper>
      <Lower>
        <Colophon>
          <LogotypeWrapper isGatsby to="/">
            <img src="/images/logos/logo-storybook.svg" alt="Storybook" />
          </LogotypeWrapper>
          <Text>
            The MIT License (MIT). Website design by{' '}
            <Link tertiary href="https://twitter.com/domyen" target="_blank">
              <b>@domyen</b>
            </Link>{' '}
            and the awesome Storybook community.
          </Text>
        </Colophon>
        <Column>
          <Title>Storybook</Title>
          {navLinks.map(({ title, href, isGatsby }) => (
            <FooterLink
              tertiary={1}
              key={title}
              href={!isGatsby ? href : undefined}
              to={isGatsby ? href : undefined}
              isGatsby={isGatsby}
            >
              {title}
            </FooterLink>
          ))}
          <FooterLink tertiary href={url.gitHub.releases}>
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
        <Subscribe>
          <Title>Subscribe</Title>
          <Text>Get news, free tutorials, and Storybook tips emailed to you.</Text>
          <ConfirmedMailingList />
        </Subscribe>
      </Lower>
      <HrWrapper>
        <hr />
      </HrWrapper>
      <Services>
        <Service>
          <Text>Hosting by</Text>
          <a href="https://netlify.com">
            <Netlify src="/images/logos/user/logo-netlify.svg" alt="Netlify" />
          </a>
        </Service>
        <Service>
          <Text>Visual testing by</Text>
          <a href="https://www.chromaticqa.com/">
            <Chromatic src="/images/logos/user/logo-chromatic.svg" alt="Chromatic" />
          </a>
        </Service>
        <Service>
          <Text>Continuous integration by</Text>
          <a href="https://www.jetbrains.com/teamcity/">
            <Teamcity src="/images/logos/user/logo-teamcity.svg" alt="Teamcity" />
          </a>
          <a href="https://circleci.com/">
            <CircleCI src="/images/logos/user/logo-circleci.svg" alt="CircleCI" />
          </a>
        </Service>
      </Services>
    </FooterWrapper>
  );
}
