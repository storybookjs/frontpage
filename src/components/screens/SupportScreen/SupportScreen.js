import React from 'react';
import styled from 'styled-components';

import { Link, styles } from '@storybook/design-system';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import Feature from '../../layout/Feature';
import FeaturesLayout from '../../layout/FeaturesLayout';

import useSiteMetadata from '../../../lib/useSiteMetadata';
import { SocialGraph } from '../../basics';
import GitHubSVG from '../../../images/logos/social/github.svg';
import DiscordSVG from '../../../images/logos/social/discord.svg';
import RepoSVG from '../../../images/colored-icons/repo.svg';

const { breakpoint } = styles;

const Features = styled(FeaturesLayout)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 5rem;
  }
`;

export function PureSupportScreen({ ...props }) {
  const { title, ogImage, urls = {} } = useSiteMetadata();
  const { home, chat, docsIntro = '', gitHub = {} } = urls;
  return (
    <PageLayout {...props}>
      <SocialGraph
        title={`Support | ${title}`}
        desc="Get answers to your Storybook questions from the thriving community and maintainers. Developers of all skill levels welcome."
        url={`${home}/support`}
        image={ogImage}
      />

      <PageTitle
        heading="Support"
        title="We’re happy to help"
        desc="Storybook’s thriving community can help answer your questions. Developers of all skill levels welcome."
        color="purple"
      />
      <Features columns={3}>
        <Feature
          image={<img src={RepoSVG} alt="Storybook docs" />}
          title="Check the docs"
          desc="First check the Storybook docs. There’s likely an article for your issue already."
        >
          <Link withArrow href={docsIntro}>
            Read docs
          </Link>
        </Feature>
        <Feature
          image={<img src={GitHubSVG} alt="GitHub" />}
          title="File an issue on GitHub"
          desc="If you encounter an issue, do us a favor and report it. Someone else may have the same issue."
        >
          <Link withArrow href={gitHub.issues}>
            View GitHub issues
          </Link>
        </Feature>
        <Feature
          image={<img src={DiscordSVG} alt="Discord" />}
          title="Ask a question in chat"
          desc="Get help over chat from community members. A maintainer is usually online."
        >
          <Link withArrow href={chat}>
            Chat now
          </Link>
        </Feature>
      </Features>
    </PageLayout>
  );
}

PureSupportScreen.propTypes = {};

export default function SupportScreen(props) {
  return <PureSupportScreen {...props} />;
}
