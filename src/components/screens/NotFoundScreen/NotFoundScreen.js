import React from 'react';
import Helmet from 'react-helmet';
import { styled } from '@storybook/theming';

import { Link, Icon } from '@storybook/design-system';
import { styles, Search } from '@storybook/components-marketing';

import useSiteMetadata from '../../lib/useSiteMetadata';
import { PuzzlePieces } from './PuzzlePieces';
import { SupportFeature } from './SupportFeature';

const { breakpoints, marketing, text, color, spacing, pageMargins } = styles;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

const Hero = styled.div`
  max-width: 460px;
  margin: 0 auto 5rem auto;
  position: relative;
`;
const Copy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
const Title = styled.h1`
  ${marketing.hero1};
  color: ${color.midnight};
`;
const Description = styled.p`
  ${text.large};
  margin: 0;
  text-align: center;
  color: ${color.darker};
`;

const Content = styled.main`
  ${pageMargins};
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const SupportOptions = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${breakpoints[2]}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SearchFeature = styled(SupportFeature)`
  @media (min-width: ${breakpoints[2]}px) {
    grid-column: 1 / span 2;
  }
`;
const StyledSearch = styled(Search)`
  button {
    border-radius: ${spacing.borderRadius.small}px;
  }
`;

export function PureNotFoundScreen({ ...props }) {
  const { urls = {}, latestVersionString } = useSiteMetadata();
  const { gitHub = {}, chat } = urls;
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Content>
        <Hero>
          <PuzzlePieces />
          <Copy>
            <Title>404</Title>
            <Description>
              The page you were looking for couldn’t be found. It may have moved. Try
              double-checking the link or going back.
            </Description>
          </Copy>
        </Hero>

        <SupportOptions>
          <SearchFeature
            image={<Icon icon="search" alt="search" style={{ color: '#FFC445' }} />}
            title="Search the docs"
            desc="There’s probably an article for your issue already."
            layout="horizontal"
          >
            <StyledSearch
              framework="react"
              version={latestVersionString}
              apiKey={ALGOLIA_API_KEY}
            />
          </SearchFeature>
          <SupportFeature
            image={<Icon icon="discord" alt="Discord" style={{ color: '#5A65EA' }} />}
            title="Ask a question in #support chat"
            desc="Resolve issues with community help. A maintainer is usually online."
          >
            <Link withArrow href={chat}>
              Chat now
            </Link>
          </SupportFeature>
          <SupportFeature
            image={<Icon icon="github" alt="Github" style={{ color: '#333333' }} />}
            title="File an issue on GitHub"
            desc="Please report issues, someone else may have the same issue."
          >
            <Link withArrow href={gitHub.frontpage}>
              View GitHub issues
            </Link>
          </SupportFeature>
        </SupportOptions>
      </Content>
    </>
  );
}

PureNotFoundScreen.propTypes = {};

export default function NotFoundScreen(props) {
  return <PureNotFoundScreen {...props} />;
}
