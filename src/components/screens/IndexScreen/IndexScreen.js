import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@storybook/theming';

import { Button, Link, styles } from '@storybook/design-system';
import useSiteMetadata from '../../lib/useSiteMetadata';

import { SocialGraph, Video } from '../../basics';
import GatsbyLink from '../../basics/GatsbyLink';
import Hero from './Hero';
import SocialProof from '../../layout/SocialProof';
import Integrations from './Integrations';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import ValueProp from '../../layout/ValueProp';
import Testimonial from '../../layout/Testimonial';
import BenefitItem from './BenefitItem';
import BenefitList from './BenefitList';
import CTA from '../../layout/CTA';

import AtomicDesignLogoSVG from '../../../images/logos/user/logo-atomicdesign.svg';
import GitlabLogoSVG from '../../../images/logos/user/logo-gitlab.svg';
import AirBnBLogoSVG from '../../../images/logos/user/logo-airbnb.svg';

const { background, color } = styles;

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

const Code = styled.code`
  background-color: ${color.lighter};
  border-radius: 3px;

  color: inherit;
  border: 1px solid ${color.border};
  font-size: 85%;
  line-height: 1;
  padding: 3px 5px;
  white-space: nowrap;
`;

export function PureIndexScreen({ ...props }) {
  const { ogImage, urls = {} } = useSiteMetadata();
  const { home, docs = {} } = urls;
  return (
    <>
      <SocialGraph
        title="Storybook: UI component explorer for frontend developers"
        desc="Storybook is an open source tool for building UI components and pages in isolation. It
          streamlines UI development, testing, and documentation."
        url={home}
        image={ogImage}
      />

      <Hero />

      <SocialProof
        path="images/logos/user"
        brands={['github', 'dropbox', 'airbnb', 'lyft', 'mozilla', 'jetbrains']}
        monochrome
      />

      <Separator />

      <ValueProp
        orientation="left"
        media={
          <Placeholder ratio={0.75}>
            <Video
              src="videos/storybook-workflow-build-optimized-lg.mp4"
              alt="Storybook build workflow video"
              shouldChangeSize
            />
          </Placeholder>
        }
        title="Develop durable UIs"
        desc="Storybook provides a sandbox to build UIs in isolation so you can develop hard-to-reach states and edge cases."
        lazyloadPlaceholder={<Placeholder ratio={0.75} />}
      />
      <BenefitList>
        <BenefitItem
          image={<img src="/images/home/build-canvas.png" alt="isolate" />}
          title="Build UIs in isolation"
          desc={
            <>
              Implement <Link href={docs}>components and pages</Link> without needing to fuss with
              data, APIs, or business logic.
            </>
          }
        />
        <BenefitItem
          image={<img src="/images/home/build-cases.png" alt="mock states" />}
          title="Mock hard to reach use cases"
          desc="Render components in key states that are tricky to reproduce in an app."
        />
        <BenefitItem
          image={<img src="/images/home/build-sidebar.png" alt="save use cases" />}
          title="Keep track of use cases as stories"
          desc={
            <>
              Save use cases as stories in{' '}
              <Link href="https://storybook.js.org/basics/writing-stories/">plain JavaScript</Link>{' '}
              to revisit during development, testing, and QA.
            </>
          }
        />
        <BenefitItem
          image={<img src="/images/home/build-addons.png" alt="extend with addons" />}
          title="Supercharge your workflow with addons"
          desc={
            <>
              Use <GatsbyLink to="/addons">addons</GatsbyLink> to customize your workflow, automate
              testing, and integrate with your favorite tools.
            </>
          }
        />
      </BenefitList>
      <Testimonial
        text={
          <span>
            “Storybook is a powerful frontend workshop environment tool that allows teams to design,
            build, and organize UI components (and even full screens!) without getting tripped up
            over business logic and plumbing.”
          </span>
        }
        avatarUrl="https://avatars3.githubusercontent.com/u/383701?s=460&v=4"
        name="Brad Frost"
        jobTitle="Author of Atomic Design"
        logo={AtomicDesignLogoSVG}
      />
      <Contrast>
        <Separator />
        <ValueProp
          orientation="right"
          media={
            <Placeholder ratio={0.75}>
              <Video
                src="videos/storybook-workflow-test-optimized-lg.mp4"
                alt="Storybook testing workflow video"
                shouldChangeSize
              />
            </Placeholder>
          }
          title="Test UIs with less effort and no flake"
          desc="Stories are a pragmatic, reproducible way to keep track of UI edge cases. Write stories once then reuse them to power automated tests."
          lazyloadPlaceholder={<Placeholder ratio={0.75} />}
        />
        <BenefitList>
          <BenefitItem
            image={<img src="/images/home/test-visual.png" alt="visual test" />}
            title="Spot test in a glance"
            desc={
              <>
                Whenever you write a story you get a{' '}
                <Link href={`${docs}react/writing-tests/introduction`}>handy test case</Link>.
                Quickly browse stories to make sure your UI looks right.
              </>
            }
          />
          <BenefitItem
            image={
              <img src="/images/home/test-visual-regression.png" alt="visual regression test" />
            }
            title="Visual test appearance"
            desc={
              <>
                Pinpoint UI changes down to the pixel by comparing{' '}
                <Link href={`${docs}react/writing-tests/visual-testing`}>image snapshots</Link> of
                stories.
              </>
            }
          />

          <BenefitItem
            image={<img src="/images/home/test-interactions.png" alt="Interaction test" />}
            title="Interaction test behavior"
            desc={
              <>
                Verify interactions by simulating
                <Link href={`${docs}react/writing-tests/interaction-testing`}>user behavior</Link>.
                Debug visually alongside your story. Integrates with Testing Library.
              </>
            }
          />

          <BenefitItem
            image={<img src="/images/home/test-accessibility.png" alt="accessibility test" />}
            title="Accessibility test"
            desc={
              <>
                Check stories for WCAG and ARIA issues in your browser with the{' '}
                <Link href={`${docs}react/writing-tests/accessibility-testing`}>A11y addon</Link>.
              </>
            }
          />

          <BenefitItem
            image={<img src="/images/home/test-snapshot.png" alt="accessibility test" />}
            title="Snapshot test markup"
            desc={
              <>
                Detect regressions in DOM markup and run smoke tests with{' '}
                <Link href={`${docs}react/writing-tests/interaction-testing`}>code snapshots</Link>.
              </>
            }
          />
          <BenefitItem
            image={<img src="/images/home/test-unit.png" alt="unit test" />}
            title="Unit test functionality"
            desc={
              <>
                <Link href={`${docs}react/writing-tests/importing-stories-in-tests`}>
                  Reuse stories
                </Link>{' '}
                in your unit tests to confirm nuanced functionality.
              </>
            }
          />
        </BenefitList>

        <Testimonial
          text={
            <span>
              “The tool we use for editing UI is Storybook. It is the perfect place to make sure
              your work aligns with designs to the pixel across breakpoints.”
            </span>
          }
          avatarUrl="https://avatars2.githubusercontent.com/u/1247751?s=100&v=4"
          name="Adam Neary"
          jobTitle="Tech lead"
          logo={AirBnBLogoSVG}
        />

        <Separator />
      </Contrast>

      <ValueProp
        orientation="left"
        media={
          <Placeholder ratio={0.75}>
            <Video
              src="videos/storybook-workflow-document-optimized-lg.mp4"
              alt="Storybook component reuse workflow video"
              shouldChangeSize
            />
          </Placeholder>
        }
        title="Document UI for your team to reuse"
        desc="Storybook brings together UI, examples, and documentation in one place. That helps teammates adopt existing UI patterns."
        lazyloadPlaceholder={<Placeholder ratio={0.75} />}
      />
      <BenefitList>
        <BenefitItem
          image={<img src="/images/home/document-search.png" alt="search stories" />}
          title="Find any component or page in your app"
          desc={
            <>
              Storybook is a searchable,{' '}
              <Link href={`${docs}react/get-started/browse-stories`}>single source of truth</Link>{' '}
              for your UI.
            </>
          }
        />
        <BenefitItem
          image={<img src="/images/home/document-docs-site.png" alt="create a styleguide" />}
          title="Generate UI docs automatically"
          desc={
            <>
              Write Markdown/MDX to generate a{' '}
              <Link href={`${docs}react/writing-docs/introduction`}>docs site</Link> for component
              libraries and design systems.
            </>
          }
        />
        <BenefitItem
          image={<img src="/images/home/document-reuse.png" alt="Reuse stories" />}
          title="Reuse components across screens and apps"
          desc="Every story is a use case that your team can find and reuse. "
        />
        <BenefitItem
          image={
            <img
              src="/images/home/document-version-history.png"
              alt="Component history and versions"
            />
          }
          title="Track component history and versions"
          desc={
            <>
              QA unexpected bugs by going back in time to compare components from previous
              Storybooks with the <GatsbyLink to="/addons/chromatic/">Chromatic addon</GatsbyLink>.
            </>
          }
        />
      </BenefitList>

      <Testimonial
        text={
          <span>
            “Storybook has made developing components more streamlined by allowing us to easily
            include technical documentation within our design system!”
          </span>
        }
        avatarUrl="https://avatars0.githubusercontent.com/u/3028593?s=460&v=4"
        name="Taurie Davis"
        jobTitle="Author of Building Design Systems"
        logo={GitlabLogoSVG}
      />

      <Contrast>
        <Separator />
        <ValueProp
          orientation="right"
          media={
            <Placeholder ratio={0.75}>
              <Video
                src="videos/storybook-publish-review-greybg-optimized-lg.mp4"
                alt="Publish to review workflow video"
                shouldChangeSize
              />
            </Placeholder>
          }
          title="Share to get sign off from teammates"
          desc="Stories show how UIs actually work not just how they're supposed to work. That makes
            gathering feedback and reproductions easy."
          lazyloadPlaceholder={<Placeholder ratio={0.75} />}
        />
        <BenefitList>
          <BenefitItem
            image={<img src="/images/home/share-publish.png" alt="Publish Storybook online" />}
            title="Publish to get feedback"
            desc={
              <>
                <Link href={`${docs}react/sharing/publish-storybook`}>Publish Storybook</Link>{' '}
                online to give your team a universal reference point for feedback.
              </>
            }
          />
          <BenefitItem
            image={<img src="/images/home/share-embed.png" alt="Embed stories" />}
            title="Embed stories in your favorite sites"
            desc={
              <>
                <Link href={`${docs}react/sharing/embed`}>Embed stories</Link> to showcase live
                interactive examples in your docs. Works with Notion, Medium and any site supporting
                the oEmbed standard.
              </>
            }
          />
          <BenefitItem
            image={<img src="/images/home/share-compose-storybooks.png" alt="Compose Storybooks" />}
            title="Compose multiple Storybooks together"
            desc={
              <>
                <Link href={`${docs}react/sharing/composition`}>Reference external Storybooks</Link>{' '}
                inside your local Storybook, no matter the view layer, tech stack, or dependencies.
              </>
            }
          />
          <BenefitItem
            image={<img src="/images/home/share-import-stories.png" alt="Import stories" />}
            title={
              <>
                <Code>import</Code> stories into other JavaScript tooling
              </>
            }
            desc={
              <>
                Stories are a{' '}
                <Link href={`${docs}react/writing-tests/importing-stories-in-tests`}>
                  portable standard
                </Link>{' '}
                based on ES6 modules. Write stories once and import them into any JavaScript testing
                library.
              </>
            }
          />
        </BenefitList>
        <CTA
          text={<span>Storybook is quick to install and it’s easy to get started.</span>}
          action={
            <Button appearance="secondary" isLink href={docs}>
              Go to the docs
            </Button>
          }
        />
        <Separator />
      </Contrast>

      <Integrations docs={docs} />
    </>
  );
}

PureIndexScreen.propTypes = {
  data: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default function IndexScreen(props) {
  return <PureIndexScreen {...props} />;
}
