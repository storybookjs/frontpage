import React from 'react';
import styled from 'styled-components';

import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import SocialProof from '../../layout/SocialProof';
import ValueProp from '../../layout/ValueProp';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import Feature from '../../layout/Feature';
import FeaturesLayout from '../../layout/FeaturesLayout';
import Testimonial from '../../layout/Testimonial';

import ComponentCanvas from './ComponentCanvas';
import ComponentList from './ComponentList';
import LogoToggle from './LogoToggle';

import { styles } from '../../basics';

const { background } = styles;

const Contrast = styled.div`
  background-color: ${background.app};
`;

const Separator = styled.hr`
  margin: 0;
`;

const PageTitleSocialProof = styled(SocialProof)`
  padding-top: 0;
`;

const DesignSystem = styled.img``;
const DesignSystemLogos = styled(LogoToggle)`
  justify-content: center;
`;

const DesignSystemWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default function UseCasesScreen({ ...props }) {
  return (
    <PageLayout {...props}>
      <PageTitle
        heading="Use cases"
        title="Production stories"
        desc="From global company to lean startup, thousands of teams rely on Storybook to build production UIs faster."
        color="gold"
      />
      <PageTitleSocialProof
        path="images/logos/user"
        brands={['airbnb', 'govuk', 'atlassian', 'lyft', 'auth0', 'salesforce']}
      />
      <Separator />
      <ValueProp
        orientation="left"
        media={<ComponentCanvas selectedIndex={0} onSelectIndex={() => 0} />}
        title="Create components"
        desc="UI engineers at Airbnb, Algolia, and Atlassian create the web’s most dependable UI components with Storybook."
        lazyloadPlaceholder={<PlaceholderAspectRatio ratio={0.75} />}
      />
      <FeaturesLayout columns={3}>
        <Feature
          image={<img src="/images/colored-icons/components.svg" alt="component" />}
          title="Develop for every use case"
          desc="Storybook makes it dead simple to mock hard-to-reach states and edge cases."
        />
        <Feature
          image={<img src="/images/colored-icons/plus.svg" alt="adopt" />}
          title="Adopt incrementally"
          desc="Adopt Storybook in your workflow at your own pace. Start with just one component."
        />
        <Feature
          image={<img src="/images/colored-icons/plugin.svg" alt="addon" />}
          title="Boost productivity with addons"
          desc="Get shortcuts for common tasks like mocking data, responsive design, and QAing callbacks."
        />
      </FeaturesLayout>
      <Testimonial
        text={
          <span>
            “Lorem ispum dolor sit amet. Lorem ispum dolor sit amet. Lorem ispum dolor sit amet.”
          </span>
        }
        avatarUrl="https://avatars1.githubusercontent.com/u/263385?s=88&v=4"
        name="Dominic Nguyen"
        jobTitle="Product designer"
        logo="images/logos/user/logo-chromatic.svg"
      />

      <Contrast>
        <Separator />
        <ValueProp
          orientation="center"
          media={<ComponentList />}
          title="Assemble component libraries"
          desc="Frontend infrastructure developers at Artsy, Formidable, and Auth0 create comprehensive component libraries using Storybook."
          lazyload={false}
        />
        <FeaturesLayout columns={3}>
          <Feature
            image={<img src="/images/colored-icons/catalog.svg" alt="catalog" />}
            title="Catalog components"
            desc="Discover and browse reusable components in one place. Build UIs faster with less work."
          />
          <Feature
            image={<img src="/images/colored-icons/code.svg" alt="setup" />}
            title="Setup in seconds"
            desc="Integration with popular popular frameworks and frontend stacks makes setup easy."
          />
          <Feature
            image={<img src="/images/colored-icons/runtest.svg" alt="test" />}
            title="Automate maintenance"
            desc="Addons for testing keep your component library consistent, even on large teams."
          />
        </FeaturesLayout>
        <Testimonial
          text={
            <span>
              “Lorem ispum dolor sit amet. Lorem ispum dolor sit amet. Lorem ispum dolor sit amet.”
            </span>
          }
          avatarUrl="https://avatars1.githubusercontent.com/u/263385?s=88&v=4"
          name="Dominic Nguyen"
          jobTitle="Product designer"
          logo="images/logos/user/logo-chromatic.svg"
        />
        <Separator />
      </Contrast>

      <ValueProp
        orientation="right"
        media={
          <DesignSystemWrapper>
            <DesignSystem src="/images/use-cases/design-system.jpg" />
            <DesignSystemLogos
              path="images/logos/user"
              brands={['github', 'salesforce', 'govuk']}
              readOnly
            />
          </DesignSystemWrapper>
        }
        title="Design systems"
        desc="Engineering teams at GitHub, Salesforce, and UK Home Office rely on Storybook to build and distribute UI components that impact millions of people."
        lazyloadPlaceholder={<PlaceholderAspectRatio ratio={0.74} />}
      />
      <FeaturesLayout columns={3}>
        <Feature
          image={<img src="/images/colored-icons/overlap.svg" alt="consistency" />}
          title="Scale UI consistency"
          desc="Ensure universal consistency by simplifying how developers find and consume components."
        />
        <Feature
          image={<img src="/images/colored-icons/code-brackets.svg" alt="Markdown" />}
          title="Document in Markdown"
          desc="Spread your component library far and wide with powerful docs tools and automatic styleguide generation (coming soon)."
        />
        <Feature
          image={<img src="/images/colored-icons/stack.svg" alt="deploy" />}
          title="Share in the cloud"
          desc="Deploy your UI library as a static site to share it with your team."
        />
      </FeaturesLayout>
      <Testimonial
        text={
          <span>
            “Lorem ispum dolor sit amet. Lorem ispum dolor sit amet. Lorem ispum dolor sit amet.”
          </span>
        }
        avatarUrl="https://avatars1.githubusercontent.com/u/263385?s=88&v=4"
        name="Dominic Nguyen"
        jobTitle="Product designer"
        logo="images/logos/user/logo-chromatic.svg"
      />
      <Separator />
      <SocialProof
        path="images/logos/user"
        brands={[
          'microsoft',
          'coursera',
          'ibm',
          'lonelyplanet',
          'lyft',
          'workco',
          'govuk',
          'auth0',
          'atlassian',
          'priceline',
          'artsy',
          'apollo',
        ]}
        grid
      />
    </PageLayout>
  );
}
