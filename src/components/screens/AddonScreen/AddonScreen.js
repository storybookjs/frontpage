import React from 'react';
import styled from 'styled-components';

import { Button, Icon, SocialGraph, styles, site } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import AddonItem from './AddonItem';
import AddonList from './AddonList';
import AddonCustom from './AddonCustom';
import CTA from '../../layout/CTA';

const { typography, pageMargins, breakpoint } = styles;
const { metadata, url } = site;

const Heading = styled.h2`
  font-weight: ${typography.weight.black};
  line-height: 1;

  font-size: ${typography.size.m1}px;
  padding-bottom: 1rem;
  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m2}px;
    padding-bottom: 2rem;
  }
`;

const PageMargins = styled.div`
  ${pageMargins};
`;

const MakeYourOwn = styled(AddonCustom)`
  margin-bottom: 5rem;
`;

export default function AddonScreen({ ...props }) {
  return (
    <PageLayout {...props}>
      <SocialGraph
        title={`Addons | ${metadata.title}`}
        desc="Addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        url={`${url.home}/addons`}
        image={metadata.ogImage}
      />
      <PageTitle
        heading="Addons"
        title="Supercharge Storybook"
        desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
        color="green"
      />
      <PageMargins>
        <Heading>Official addons</Heading>
      </PageMargins>
      <AddonList appearance="official">
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/knobs.svg" alt="knobs" />}
          title="Knobs"
          desc="Interact with component inputs dynamically in the Storybook UI"
          addonUrl={url.officialAddons.knobs}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/actions.svg" alt="actions" />}
          title="Actions"
          desc="Get UI feedback when an action is performed on an interactive element."
          addonUrl={url.officialAddons.actions}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/source.svg" alt="source" />}
          title="Source"
          desc="View a story’s source code to see how it works and paste into your app."
          addonUrl={url.officialAddons.source}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/docs.svg" alt="docs" />}
          title="Info"
          desc="Document component usage and properties in Markdown"
          addonUrl={url.officialAddons.info}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/viewport.svg" alt="viewport" />}
          title="Viewport"
          desc="Build responsive components by adjusting Storybook’s viewport size and orientation"
          addonUrl={url.officialAddons.viewport}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/storyshots.svg" alt="storyshots" />}
          title="Storyshots"
          desc="Take a code snapshot of every story automatically with Jest"
          addonUrl={url.officialAddons.storyshots}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/backgrounds.svg" alt="backgrounds" />}
          title="Backgrounds"
          desc="Switch backgrounds to view components in different settings"
          addonUrl={url.officialAddons.backgrounds}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/accessibility.svg" alt="accessibility" />}
          title="Accessibility"
          desc="Test component compliance with web accessibility standards"
          addonUrl={url.officialAddons.accessibility}
        />
      </AddonList>

      <MakeYourOwn />

      <PageMargins>
        <Heading>Community addons</Heading>
      </PageMargins>
      <AddonList>
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within 1 story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://google.com"
        />
        <Button outline secondary isLink href={url.gitHub.frontpage}>
          <Icon icon="plus" /> Add your addon here
        </Button>
      </AddonList>
      <PageMargins />

      <CTA
        text={<span>Build UIs faster. Add Storybook to your project now.</span>}
        action={
          <Button secondary isLink href={url.docs.home}>
            Get started
          </Button>
        }
      />
    </PageLayout>
  );
}
