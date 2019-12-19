import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { Link, styles } from '@storybook/design-system';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import Feature from '../../layout/Feature';
import FeaturesLayout from '../../layout/FeaturesLayout';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import GitHubSVG from '../../../images/logos/social/github.svg';
import DiscordSVG from '../../../images/logos/social/discord.svg';

const { breakpoint } = styles;

const Features = styled(FeaturesLayout)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 5rem;
  }
`;

export function PureNotFoundScreen({ ...props }) {
  const { urls = {} } = useSiteMetadata();
  const { gitHub = {}, chat } = urls;
  return (
    <PageLayout {...props}>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <PageTitle
        heading="404"
        title="Yikes, this is embarassing"
        desc="Try double-checking the link or going back."
        color="purple"
      />
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
    </PageLayout>
  );
}

PureNotFoundScreen.propTypes = {};

export default function NotFoundScreen(props) {
  return <PureNotFoundScreen {...props} />;
}
