import React from 'react';
import styled from 'styled-components';

import { Button, Icon, Link, styles } from './../../basics';
import PageLayout from './../../layout/PageLayout';
import PageTitle from './../../layout/PageTitle';
import AddonItem from './AddonItem';
import AddonList from './AddonList';
import AddonCustom from './AddonCustom';
import CTA from './../../layout/CTA';

const { background, color, spacing, typography, pageMargins, breakpoint } = styles;

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
          image={<img src="images/addons/knobs.svg" />}
          title="Knobs"
          desc="Interact with component inputs dynamically in the Storybook UI"
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/actions.svg" />}
          title="Actions"
          desc="Get UI feedback when an action is performed on an interactive element."
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/source.svg" />}
          title="Source"
          desc="View a story’s source code to see how it works and paste into your app."
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/docs.svg" />}
          title="Docs"
          desc="Document component usage and properties in Markdown"
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/viewports.svg" />}
          title="Viewports"
          desc="Build responsive components by adjusting Storybook’s viewport size and orientation"
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/storyshots.svg" />}
          title="Storyshots"
          desc="Take a code snapshot of every story automatically with Jest"
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/backgrounds.svg" />}
          title="Backgrounds"
          desc="Switch backgrounds to view components in different settings"
          addonUrl="https://google.com"
        />
        <AddonItem
          appearance="official"
          image={<img src="images/addons/accessibility.svg" />}
          title="Accessibility"
          desc="Test component compliance with web accessibility standards"
          addonUrl="https://google.com"
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
        <Button outline primary>
          <Icon icon="plus" /> Add your addon here
        </Button>
      </AddonList>
      <PageMargins />

      <CTA
        text={<span>Build UIs faster. Add Storybook to your project now.</span>}
        action={
          <Button primary isLink>
            Get started
          </Button>
        }
      />
    </PageLayout>
  );
}
