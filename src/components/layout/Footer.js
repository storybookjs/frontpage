import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

import { Icon, Link, Subheading, styles } from '@storybook/design-system';
import useSiteMetadata from '../lib/useSiteMetadata';

import ConfirmedMailingList from './ConfirmedMailingList';

import DirectionSVG from '../../images/colored-icons/direction.svg';
import RepoSVG from '../../images/colored-icons/repo.svg';
import StorybookLogoSVG from '../../images/logo-storybook.svg';
import NetlifyLogoSVG from '../../images/logos/user/logo-netlify.svg';
import ChromaticLogoSVG from '../../images/logos/user/logo-chromatic.svg';
import CircleCILogoSVG from '../../images/logos/user/logo-circleci.svg';

const { background, color, typography, pageMargins, pageMargin, spacing, breakpoint } = styles;

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

  ${Netlify}, ${Chromatic}, ${CircleCI} {
    height: 22px;
    width: auto;
    display: inline-block;
    filter: grayscale(100%);
    transition: all 150ms ease-out;

    &:hover {
      filter: grayscale(0%);
    }
  }

  ${CircleCI} {
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

const LinkWrapper = ({ href, isGatsby, ...props }) => {
  if (isGatsby) {
    return <GatsbyLink to={href} {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={href} {...props} />;
};

LinkWrapper.propTypes = {
  href: PropTypes.string.isRequired,
  isGatsby: PropTypes.bool.isRequired,
};

export default function Footer({ mediumPosts, ...props }) {
  const { urls = {} } = useSiteMetadata();
  const {
    blog,
    twitter,
    medium,
    chat,
    youtube,
    navLinks = {},
    framework = {},
    docs = {},
    tutorials,
    gitHub = {},
  } = urls;

  return (
    <FooterWrapper {...props}>
      <Upper>
        <UpperColumn>
          <Title>Learn</Title>
          <Resources>
            <Resource>
              <img src={RepoSVG} alt="Docs" />
              <Meta>
                <ResourceTitle>Get started with Storybook</ResourceTitle>
                <ResourceDesc>
                  Add Storybook to your project in less than a minute to build components faster and
                  easier.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction withArrow href={framework.react}>
                    React
                  </ResourceAction>
                  <ResourceAction withArrow href={framework.vue}>
                    Vue
                  </ResourceAction>
                  <ResourceAction withArrow href={framework.angular}>
                    Angular
                  </ResourceAction>
                  <ResourceAction withArrow href={docs.home}>
                    View more
                  </ResourceAction>
                </ResourceActions>
              </Meta>
            </Resource>
            <Resource>
              <img src={DirectionSVG} alt="Tutorial" />
              <Meta>
                <ResourceTitle>Storybook tutorial</ResourceTitle>
                <ResourceDesc>
                  Learn Storybook with a 10-chapter tutorial that teaches Storybook best practices
                  as you build a UI from scratch.
                </ResourceDesc>
                <ResourceActions>
                  <ResourceAction withArrow href={tutorials}>
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
            <SubLink tertiary withArrow href={blog}>
              Read more
            </SubLink>
          </Title>
          <Resources>
            {mediumPosts.edges.map(({ node: { id, title, virtuals, uniqueSlug } }) => (
              <Resource key={id}>
                <Meta>
                  <ResourceTitleLink tertiary withArrow href={`${medium}/${uniqueSlug}`}>
                    {title}
                  </ResourceTitleLink>
                  <ResourceDesc>{virtuals.subtitle}</ResourceDesc>
                </Meta>
              </Resource>
            ))}
          </Resources>
        </UpperColumn>
      </Upper>
      <Lower>
        <Colophon>
          <LogotypeWrapper isGatsby to="/">
            <img src={StorybookLogoSVG} alt="Storybook" />
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
              tertiary
              key={title}
              href={href}
              isGatsby={isGatsby}
              LinkWrapper={LinkWrapper}
            >
              {title}
            </FooterLink>
          ))}
          <FooterLink tertiary href={gitHub.releases}>
            Releases
          </FooterLink>
        </Column>
        <Column>
          <Title>Community</Title>
          <FooterLink tertiary href={gitHub.repo}>
            <Icon icon="github" /> GitHub
          </FooterLink>
          <FooterLink tertiary href={blog}>
            <Icon icon="medium" /> Blog
          </FooterLink>
          <FooterLink tertiary href={twitter}>
            <Icon icon="twitter" /> Twitter
          </FooterLink>
          <FooterLink tertiary href={chat}>
            <Icon icon="discord" /> Discord chat
          </FooterLink>
          <FooterLink tertiary href={youtube}>
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
            <Netlify src={NetlifyLogoSVG} alt="Netlify" />
          </a>
        </Service>
        <Service>
          <Text>Visual testing by</Text>
          <a href="https://www.chromaticqa.com/">
            <Chromatic src={ChromaticLogoSVG} alt="Chromatic" />
          </a>
        </Service>
        <Service>
          <Text>Continuous integration by</Text>
          <a href="https://circleci.com/">
            <CircleCI src={CircleCILogoSVG} alt="CircleCI" />
          </a>
        </Service>
      </Services>
    </FooterWrapper>
  );
}

Footer.propTypes = {
  mediumPosts: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          virtuals: PropTypes.shape({
            subtitle: PropTypes.string,
          }),
          uniqueSlug: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};
