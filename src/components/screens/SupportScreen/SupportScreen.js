import React from 'react';

import styled from 'styled-components';

import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import Feature from '../../layout/Feature';
import FeaturesLayout from '../../layout/FeaturesLayout';

import { Link, SocialGraph, styles, site } from '../../basics';

const { breakpoint } = styles;
const { metadata, url } = site;

const Features = styled(FeaturesLayout)`
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 5rem;
  }
`;

export default function SupportScreen({ ...props }) {
  return (
    <PageLayout {...props}>
      <SocialGraph
        title={`Support | ${metadata.title}`}
        desc="Get answers to your Storybook questions from the thriving community and maintainers. Developers of all skill levels welcome."
        url={`${url.home}/support`}
        image={metadata.ogImage}
      />

      <PageTitle
        heading="Support"
        title="We’re happy to help"
        desc="Storybook’s thriving community can help answer your questions. Developers of all skill levels welcome."
        color="purple"
      />
      <Features columns={3}>
        <Feature
          image={<img src="/images/colored-icons/repo.svg" alt="Storybook docs" />}
          title="Check the docs"
          desc="First check the Storybook docs. There’s likely an article for your issue already."
        >
          <Link withArrow href={url.docs.home}>
            Read docs
          </Link>
        </Feature>
        <Feature
          image={<img src="/images/logos/social/github.svg" alt="GitHub" />}
          title="File an issue on GitHub"
          desc="If you encounter an issue, do us a favor and report it. Someone else may have the same issue."
        >
          <Link withArrow href={url.gitHub.issues}>
            View GitHub issues
          </Link>
        </Feature>
        <Feature
          image={<img src="/images/logos/social/discord.svg" alt="Discord" />}
          title="Ask a question in chat"
          desc="Get help over chat from community members. A maintainer is usually online."
        >
          <Link withArrow href={url.chat}>
            Chat now
          </Link>
        </Feature>
      </Features>
    </PageLayout>
  );
}
