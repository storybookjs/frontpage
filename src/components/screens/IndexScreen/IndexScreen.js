import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { Badge, Button, Link, SocialGraph, styles, site, Video } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import Hero from './Hero';
import SocialProof from '../../layout/SocialProof';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import ValueProp from '../../layout/ValueProp';
import BenefitItem from './BenefitItem';
import BenefitList from './BenefitList';
import CTA from '../../layout/CTA';

const { background } = styles;
const { metadata, url } = site;

const Contrast = styled.div`
  background-color: ${background.app};
`;

const Separator = styled.hr`
  margin: 0;
`;

const Placeholder = styled(PlaceholderAspectRatio)`
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export function PureIndexScreen({ data: { gitHubRepoData, allMediumPost }, ...props }) {
  return (
    <PageLayout allMediumPost={allMediumPost} {...props}>
      <SocialGraph
        title="Storybook: UI component workshop for frontend developers"
        desc="Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient."
        url={url.home}
        image={metadata.ogImage}
      />

      <Hero gitHubRepoData={gitHubRepoData} />

      <SocialProof
        heading="Trusted by"
        path="images/logos/user"
        brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla']}
        monochrome
      />

      <Separator />

      <ValueProp
        orientation="left"
        media={
          /* eslint-disable jsx-a11y/media-has-caption */
          <Placeholder ratio={0.75}>
            <Video
              src="videos/storybook-workflow-build-optimized-lg.mp4"
              alt="Storybook build workflow video"
              shouldChangeSize
            />
          </Placeholder>
        }
        title="Deliver robust UIs"
        desc="Storybook provides a sandbox to build UI components in isolation so you can develop hard-to-reach states and edge cases."
        lazyloadPlaceholder={<Placeholder ratio={0.75} />}
      />
      <BenefitList>
        <BenefitItem
          image={<img src="/images/home/build-canvas.png" alt="isolate" />}
          title="Build components in isolation"
          desc="Create components without needing to stand up screens, fuss with data, or build business logic."
        />
        <BenefitItem
          image={<img src="/images/home/build-cases.png" alt="mock states" />}
          title="Mock hard to reach use cases"
          desc="Render components in key states that are tricky to reproduce in an app."
        />
        <BenefitItem
          image={<img src="/images/home/build-sidebar.png" alt="save use cases" />}
          title="Document use cases as stories"
          desc={
            <Fragment>
              Save use cases as stories in{' '}
              <Link href="https://storybook.js.org/basics/writing-stories/" target="_blank">
                plain JavaScript
              </Link>{' '}
              to revisit during development, testing, and QA.
            </Fragment>
          }
        />
        <BenefitItem
          image={<img src="/images/home/build-addons.png" alt="extend with addons" />}
          title="Supercharge your workflow with addons"
          desc="Use addons to build UI faster, document a component library, and streamline your workflow."
        />
      </BenefitList>

      <Contrast>
        <Separator />
        <ValueProp
          orientation="right"
          media={
            /* eslint-disable jsx-a11y/media-has-caption */
            <Placeholder ratio={0.75}>
              <Video
                src="videos/storybook-workflow-test-optimized-lg.mp4"
                alt="Storybook testing workflow video"
                shouldChangeSize
              />
            </Placeholder>
          }
          title="Ship components with confidence"
          desc="Storybook makes it easy to keep track of edge cases and as a result you get tests for free."
          lazyloadPlaceholder={<Placeholder ratio={0.75} />}
        />
        <BenefitList>
          <BenefitItem
            image={<img src="/images/home/test-visual.png" alt="visual test" />}
            title="Ensure consistent user experiences"
            desc="Whenever you write a story you get a handy visual spec. Quickly browse stories to make sure your UI looks right."
          />
          <BenefitItem
            image={<img src="/images/home/test-snapshot.png" alt="snapshot test" />}
            title="Auto-detect code regressions"
            desc="Get code snapshot tests out of the box with Storyshots, an official addon."
          />
          <BenefitItem
            image={<img src="/images/home/test-unit.png" alt="unit test" />}
            title="Unit test components"
            desc="Reuse stories in your unit tests to confirm nuanced functionality."
          />
          <BenefitItem
            image={
              <img src="/images/home/test-visual-regression.png" alt="visual regression test" />
            }
            title="Catch UI changes down to the pixel every commit"
            desc="Pinpoint UI changes with visual testing tools."
          />
        </BenefitList>

        <Separator />
      </Contrast>

      <ValueProp
        orientation="left"
        media={
          /* eslint-disable jsx-a11y/media-has-caption */
          <Placeholder ratio={0.75}>
            <Video
              src="videos/storybook-workflow-share-optimized-lg.mp4"
              alt="Storybook component reuse workflow video"
              shouldChangeSize
            />
          </Placeholder>
        }
        title="Share and reuse everything"
        desc={
          <div>
            Stop reinventing the wheel. Get a birds-eye view of your UI library to find components
            to reuse in your project.
          </div>
        }
        lazyloadPlaceholder={<Placeholder ratio={0.75} />}
      />
      <BenefitList>
        <BenefitItem
          image={<img src="/images/home/share-search.png" alt="search stories" />}
          title="Find any component in your app"
          desc="Storybook is a searchable, single source of truth for your UI components."
        />
        <BenefitItem
          image={<img src="/images/home/share-collaborate.png" alt="collaborate" />}
          title="Get timely feedback during development"
          desc="Collaborate on UI implementation with your team by deploying Storybook to the cloud."
        />
        <BenefitItem
          image={<img src="/images/home/share-reuse.png" alt="share stories" />}
          title="Share components across screens and apps"
          desc="Every story is a use case that your team can find and reuse. "
        />
        <BenefitItem
          image={<img src="/images/home/share-document.png" alt="create a styleguide" />}
          title="Generate a styleguide automatically"
          desc="Write Markdown to generate a customizable styleguide site. Share it with your team."
        >
          <Badge status="positive">Coming soon</Badge>
        </BenefitItem>
      </BenefitList>
      <CTA
        text={<span>Storybook is quick to install and it’s easy to get started.</span>}
        action={
          <Button secondary isLink href={url.docs.home}>
            Get started
          </Button>
        }
      />
    </PageLayout>
  );
}

export default function IndexScreen(props) {
  return (
    <StaticQuery
      query={graphql`
        query IndexScreenQuery {
          gitHubRepoData {
            contributorCount
            url
            author
            name
          }
          allMediumPost(sort: { fields: [createdAt], order: DESC }, limit: 3) {
            edges {
              node {
                id
                title
                virtuals {
                  subtitle
                }
                uniqueSlug
              }
            }
          }
        }
      `}
      render={data => <PureIndexScreen data={data} {...props} />}
    />
  );
}
