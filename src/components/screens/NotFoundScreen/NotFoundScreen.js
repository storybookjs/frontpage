import React from 'react';
import Helmet from 'react-helmet';
import { styled } from '@storybook/theming';

import { Link } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import Feature from '../../layout/Feature';
import FeaturesLayout from '../../layout/FeaturesLayout';

import useSiteMetadata from '../../lib/useSiteMetadata';
import GitHubSVG from '../../../images/logos/social/github.svg';
import DiscordSVG from '../../../images/logos/social/discord.svg';
import { PuzzlePieces } from './PuzzlePieces';

const { breakpoint, marketing, text, color } = styles;

const Features = styled(FeaturesLayout)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 5rem;
  }
`;

const Hero = styled.div`
  max-width: 460px;
  margin: 5rem auto;
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

export function PureNotFoundScreen({ ...props }) {
  const { urls = {} } = useSiteMetadata();
  const { gitHub = {}, chat } = urls;
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Hero>
        <PuzzlePieces />
        <Copy>
          <Title>404</Title>
          <Description>
            The page you were looking for couldn’t be found. It may have moved. Try double-checking
            the link or going back.
          </Description>
        </Copy>
      </Hero>

      <Features columns={2}>
        <Feature
          image={<img src={GitHubSVG} alt="GitHub" />}
          title="Report an issue on GitHub"
          desc="If you encounter an issue with this site, do us a favor and report it."
        >
          <Link withArrow href={gitHub.frontpage}>
            Report an issue
          </Link>
        </Feature>
        <Feature
          image={<img src={DiscordSVG} alt="Discord" />}
          title="Not finding something?"
          desc="Ask community members in chat. A maintainer is usually online."
        >
          <Link withArrow href={chat}>
            Chat now
          </Link>
        </Feature>
      </Features>
    </>
  );
}

PureNotFoundScreen.propTypes = {};

export default function NotFoundScreen(props) {
  return <PureNotFoundScreen {...props} />;
}
