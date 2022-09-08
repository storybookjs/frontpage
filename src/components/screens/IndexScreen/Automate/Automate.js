import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Link } from '@storybook/design-system';
import { styles, FeatureStep, StepIcon } from '@storybook/components-marketing';
import { Publish } from './Publish';
import { UITests } from './UITests';
import { UIReview } from './UIReview';
import { MergeAndShip } from './MergeAndShip';
import GatsbyLinkWrapper from '../../../basics/GatsbyLinkWrapper';

const MergeIcon = styled(StepIcon)`
  background: linear-gradient(180deg, #cf60ff 0%, #af44ff 100%);

  svg {
    transform: translateX(2px);
  }
`;

const { color, marketing, breakpoints, pageMargins } = styles;

const Wrapper = styled.section`
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }
`;

const Content = styled.div`
  ${pageMargins};
`;

const SectionHeader = styled.div`
  ${pageMargins}
`;

const SectionHeading = styled.h2`
  ${marketing.heading};
  color: ${color.lightest};
  text-align: center;

  @media (min-width: ${breakpoints[1]}px) {
    ${marketing.hero2};
  }

  @media (min-width: ${breakpoints[2]}px) {
    ${marketing.hero1};
  }
`;

const LedeParagraph = styled.p`
  ${marketing.textLarge};
  color: ${color.lightest};
  margin-top: 1.25rem;
  margin-bottom: 0;
  text-align: center;
  max-width: 510px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints[2]}px) {
    margin-top: 0.5rem;
  }
`;

export function Automate({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <SectionHeader>
        <SectionHeading>Automate UI workflows</SectionHeading>
        <LedeParagraph>
          Add Storybook as a CI step to automate the UI development workflow. That helps you ship
          faster with less manual work.
        </LedeParagraph>
      </SectionHeader>
      <Content>
        <FeatureStep
          inverse
          title="Publish Storybook"
          description="Publish Storybook online to collaborate on UI implementation with developers, designers, and PMs. No need to touch a dev environment."
          link={
            <Link
              containsIcon
              withArrow
              href="/docs/react/sharing/publish-storybook/"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Publish Storybook for your team
            </Link>
          }
        />
        <Publish />
        <FeatureStep
          inverse
          title="UI Tests"
          description="Test every facet of your UI: interaction, visual, accessibility, and snapshot, in CI to detect UI bugs down to the component."
          link={
            <Link
              containsIcon
              withArrow
              href="/docs/react/writing-tests/test-runner"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Auto-detect UI bugs
            </Link>
          }
        />
        <UITests />
        <FeatureStep
          inverse
          title="UI Review"
          description="Request feedback from teammates to verify the UI implementation. Discuss UI changes together then assign reviewers for final sign off."
          link={
            <Link
              containsIcon
              withArrow
              href="/docs/react/sharing/publish-storybook#review-with-your-team"
              LinkWrapper={GatsbyLinkWrapper}
            >
              Review with your team
            </Link>
          }
        />
        <UIReview />
        <FeatureStep
          inverse
          icon={<MergeIcon icon="merge" />}
          title="Merge and ship"
          description="Each stage of the UI development lifecycle gets a pull request check. Pass all checks to get certainty that your work is ready for production."
        />
        <MergeAndShip />
      </Content>
    </Wrapper>
  );
}

Automate.propTypes = {
  docs: PropTypes.string.isRequired,
};
