import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Button } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  ProjectCard,
  HorizontalScroll,
  StorybookProject,
  SocialCard,
  ColoredIcon,
} from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import { Community } from '../../layout/Community';

const { color, breakpoints, pageMargins } = styles;

const Wrapper = styled.section`
  padding-top: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
  }
`;

const Storybooks = styled(HorizontalScroll)`
  padding: 0 30px;
  padding-bottom: 1rem;
  margin-top: 3rem;

  & * {
    color: ${color.lightest} !important;
  }

  & > * {
    width: 240px;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 5rem;
    margin-bottom: calc(5rem -1rem); // accounts for horiz scroll bar
    & > * {
      width: 480px;
    }
  }

  @media (min-width: ${breakpoints[2]}px) {
    margin-top: 7rem;
  }
`;
const StorybookLink = styled.a`
  display: block;
  text-decoration: none;
`;

const Projects = styled(HorizontalScroll)`
  padding: 0 30px;

  margin-top: calc(3rem - 1rem);
  margin-bottom: 3rem;

  @media (min-width: ${breakpoints[2]}px) {
    margin-top: calc(5rem - 1rem);
    margin-bottom: 5rem;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    width: 240px;
  }
`;

const SocialCTAs = styled.div`
  ${pageMargins};
  padding-bottom: 7rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 35px;

  @media (min-width: ${breakpoints[1]}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints[2]}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const YouTubeIcon = styled.div`
  position: relative;

  &:before {
    content: '';
    background: #fff;
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
  }
`;

const Contributors = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  img:not(:last-of-type) {
    margin-left: -5px;
  }

  img:nth-of-type(2n + 1) {
    display: none;
  }

  @media (min-width: ${breakpoints[1]}px) {
    img:nth-of-type(2n + 1) {
      display: block;
    }
  }
`;

const CommunityCTA = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const contributors = [
  'images/community/contributor6.jpg',
  'images/community/contributor5.jpg',
  'images/community/contributor4.jpg',
  'images/community/contributor3.jpg',
  'images/community/contributor2.jpg',
  'images/community/contributor1.jpg',
];

export function SocialValidation({
  docs,
  projects,
  storybooks,
  twitterFollowerCount,
  discordMemberCount,
  githubContributorCount,
  youTubeSubscriberCount,
  ...props
}) {
  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Made for frontend developers"
        copy="The top frontend engineering teams rely on Storybook to ship world-changing products. Join our open source community to learn new techniques and get support."
        actions={
          <CommunityCTA>
            <Button
              appearance="inverseOutline"
              href="/community/"
              isLink
              ButtonWrapper={GatsbyLinkWrapper}
            >
              Get involved
            </Button>
            <Contributors>
              {contributors.map((image) => (
                <img loading="lazy" key={image} src={image} alt="" />
              ))}
            </Contributors>
          </CommunityCTA>
        }
      />
      <Storybooks gap="30px" scrollPadding="0 30px">
        {storybooks.map((storybookProject) => (
          <StorybookLink
            href={storybookProject.url}
            key={storybookProject.name}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            <StorybookProject {...storybookProject} />
          </StorybookLink>
        ))}
      </Storybooks>
      <Projects gap="30px" scrollPadding="0 30px">
        {projects.map((project) => (
          <ProjectCard key={project.logoAlt} {...project} />
        ))}
      </Projects>
      <Community />
      <SocialCTAs>
        <SocialCard
          inverse
          icon={<ColoredIcon icon="github" aria-label="Github" color="#fff" />}
          description="Join 1440+ contributors building the future of UI development."
          link={{
            label: 'Star on GitHub',
            href: 'https://github.com/storybookjs/storybook',
          }}
          stat={{
            count: `${githubContributorCount.toLocaleString()}+`,
            label: 'Contributors',
          }}
        />
        <SocialCard
          inverse
          icon={<ColoredIcon icon="discord" aria-label="Discord" color="#5A65EA" />}
          description="Get support and chat with 13,000+ frontend developers."
          link={{
            label: 'Join Discord server',
            href: 'https://discord.gg/storybook',
          }}
          stat={{
            count: `${discordMemberCount.toLocaleString()}+`,
            label: 'Server members',
          }}
        />
        <SocialCard
          inverse
          icon={<ColoredIcon icon="twitter" aria-label="Twitter" color="#4999E9" />}
          description="Get the latest news and updates from Storybook maintainers."
          link={{
            label: 'Follow on Twitter',
            href: 'https://twitter.com/storybookjs',
          }}
          stat={{
            count: `${twitterFollowerCount.toLocaleString()}+`,
            label: 'Followers',
          }}
        />
        <SocialCard
          inverse
          icon={
            <YouTubeIcon>
              <ColoredIcon icon="youtube" aria-label="YouTube" color="#EA3223" />
            </YouTubeIcon>
          }
          description="Watch tutorials, feature previews, and interviews."
          link={{
            label: 'Watch on YouTube',
            href: 'https://www.youtube.com/channel/UCr7Quur3eIyA_oe8FNYexfg',
          }}
          stat={{
            count: `${youTubeSubscriberCount.toLocaleString()}+`,
            label: 'Subscribers',
          }}
        />
      </SocialCTAs>
    </Wrapper>
  );
}

SocialValidation.propTypes = {
  docs: PropTypes.string.isRequired,
  twitterFollowerCount: PropTypes.number.isRequired,
  discordMemberCount: PropTypes.number.isRequired,
  githubContributorCount: PropTypes.number.isRequired,
  youTubeSubscriberCount: PropTypes.number.isRequired,
};
