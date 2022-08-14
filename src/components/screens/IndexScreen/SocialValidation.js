import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link, Icon } from '@storybook/design-system';
import {
  styles,
  SectionLede,
  ValuePropCopy,
  ProjectCard,
  HorizontalScroll,
  StorybookProject,
  SocialCard,
  ColoredIcon,
} from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import GitlabLogoSVG from '../../../images/logos/user/logo-gitlab.svg';
import storybookMockUI from './storybook-mock-ui.svg';

const { typography, breakpoints, pageMargins } = styles;

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

const ValueProp = styled(ValuePropCopy)`
  grid-column: 1 / 2;

  &:first-child {
    padding-top: 0;
  }
`;

const Projects = styled(HorizontalScroll)`
  padding: 0 30px;
  margin-top: 5rem;
  margin-bottom: 5rem;

  & > * {
    width: 240px;
  }
`;

const Storybooks = styled(HorizontalScroll)`
  padding: 0 30px;
  margin-top: 5rem;
  margin-bottom: 5rem;

  & > * {
    width: 480px;
  }
`;

const SocialCTAs = styled.div`
  ${pageMargins};
  padding-top: 7rem;
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

export function SocialValidation({ docs, projects, storybooks, ...props }) {
  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Made for frontend developers"
        copy="The top frontend engineering teams rely on Storybook to ship world-changing products. Join our open source community to learn new techniques and get support."
        links="TODO: Get involved and avatar list"
      />
      <Storybooks gap="30px">
        {storybooks.map((storybookProject) => (
          <StorybookProject key={storybookProject.name} {...storybookProject} />
        ))}
      </Storybooks>
      <Projects gap="30px">
        {projects.map((project) => (
          <ProjectCard key={project.logoAlt} {...project} />
        ))}
      </Projects>
      <SocialCTAs>
        <SocialCard
          inverse
          icon={<ColoredIcon icon="github" aria-label="Github" color="#fff" />}
          description="Join 1440+ contributors building the future of UI development."
          link={{
            label: 'Star on GitHub',
            href: 'https://github.com/storybookjs/',
          }}
          stat={{
            count: '1440+',
            label: 'Contributors',
          }}
        />
        <SocialCard
          inverse
          icon={<ColoredIcon icon="discord" aria-label="Discord" color="#5A65EA" />}
          description="Get support and chat with 13,000+ frontend developers."
          link={{
            label: 'Join Discord server',
            href: 'https://github.com/storybookjs/',
          }}
          stat={{
            count: '13,000+',
            label: 'Server members',
          }}
        />
        <SocialCard
          inverse
          icon={<ColoredIcon icon="twitter" aria-label="Twitter" color="#4999E9" />}
          description="Get the latest news and updates from Storybook maintainers."
          link={{
            label: 'Follow on Twitter',
            href: 'https://github.com/storybookjs/',
          }}
          stat={{
            count: '16,300+',
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
            href: 'https://github.com/storybookjs/',
          }}
          stat={{
            count: '1,830+',
            label: 'Subscribers',
          }}
        />
      </SocialCTAs>
    </Wrapper>
  );
}

SocialValidation.propTypes = {
  docs: PropTypes.string.isRequired,
};
