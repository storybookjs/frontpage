import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import { Button, Icon, SocialGraph, Subheading, styles, site } from '../../basics';
import PageLayout from '../../layout/PageLayout';
import PageTitle from '../../layout/PageTitle';
import AddonItem from './AddonItem';
import AddonList from './AddonList';
import AddonCustom from './AddonCustom';
import CTA from '../../layout/CTA';

const { color, typography, spacing, pageMargins, breakpoint } = styles;
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

const Subheader = styled(Subheading)`
  display: block;
  padding: 0 !important;

  flex: 0 0 100%;
  color: ${color.mediumdark};

  margin-top: 0.75rem;
  margin-bottom: 1rem;
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1.5rem;
  }

  &:not(:first-child) {
    margin-top: 2.25rem;

    @media (min-width: ${breakpoint * 1}px) {
      margin-top: 2.75rem;
    }
  }
`;

const List = styled(AddonList)`
  max-width: 800px;
  margin: 0 auto;
`;

const PageMargins = styled.div`
  ${pageMargins};
`;

const PageMarginsSmall = styled.div`
  padding: 0 ${spacing.padding.medium}px;
  max-width: 800px;
  margin: 0 auto;
`;

const MakeYourOwn = styled(AddonCustom)`
  margin-bottom: 5rem;
`;

export function PureAddonScreen({ data: { allMediumPost }, ...props }) {
  return (
    <PageLayout allMediumPost={allMediumPost} {...props}>
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
          title="Docs"
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
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/console.svg" alt="accessibility" />}
          title="Console"
          desc="Show console output like logs, errors, and warnings in the Storybook"
          addonUrl={url.officialAddons.console}
        />
        <AddonItem
          appearance="official"
          image={<img src="/images/addons/links.svg" alt="accessibility" />}
          title="Links"
          desc="Link stories together to build demos and prototypes with your UI components"
          addonUrl={url.officialAddons.links}
        />
      </AddonList>

      <MakeYourOwn />

      <PageMarginsSmall>
        <Heading>Community addons</Heading>
      </PageMarginsSmall>

      <List>
        {/*
          How to: Add your addon to this list
          • Use <AddonItem/>
          • Make sure the addon is categorized in the appropriate section
          • Submit a PR
        */}
        <Subheader>Organize</Subheader>
        <AddonItem
          title="Info"
          desc="Build a nice-looking style guide with docs and automatic sample source code with a PropType explorer."
          addonUrl="https://github.com/storybooks/storybook/tree/master/addons/info"
        />
        <AddonItem
          title="Readme"
          desc="Add docs in Markdown format for each story. It’s useful because most projects and components already have README.md files."
          addonUrl="https://github.com/tuchk4/storybook-readme"
        />
        <AddonItem
          title="Story-router"
          desc="A decorator that allows you to use your routing-aware components in your stories."
          addonUrl="https://github.com/gvaldambrini/storybook-router"
        />
        <AddonItem
          title="Chapters"
          desc="With this addon, you can showcase multiple components (or varying component states) within one story. Break your stories down into smaller categories (chapters) and subcategories (sections) for more organizational goodness."
          addonUrl="https://github.com/Checkfront/react-storybook-addon-chapters"
        />
        <AddonItem
          title="Host"
          desc="A decorator with powerful display options for hosting, sizing and framing your components."
          addonUrl="https://github.com/philcockfield/storybook-host"
        />
        <AddonItem
          title="Versions"
          desc="Navigate different versions of static Storybook builds to see how a component has changed over time."
          addonUrl="https://github.com/buildit/storybook-addon-versions"
        />

        <Subheader>Test</Subheader>
        <AddonItem
          title="Specs"
          desc="This addon will allow you to write tests based on your stories and display results directly inside Storybook."
          addonUrl="https://github.com/mthuret/storybook-addon-specifications"
        />
        <AddonItem
          title="Props combinations"
          desc="Given possible values for each prop, renders your component with all combinations of prop values. Useful for finding edge cases or just seeing all component states at once."
          addonUrl="https://github.com/evgenykochetkov/react-storybook-addon-props-combinations"
        />
        <AddonItem
          title="Screenshot"
          desc="Save the screenshot image of your stories (via Puppeteer)."
          addonUrl="https://github.com/tsuyoshiwada/storybook-chrome-screenshot"
        />
        <AddonItem
          title="Intl"
          desc="Toggle the locale and directly see the result in the preview."
          addonUrl="https://github.com/truffls/storybook-addon-intl"
        />
        <AddonItem
          title="i18n tools"
          desc="Test your Storybook with a different text-direction. It is very useful if you are working on components that have to work both in LTR as well as in RTL languages."
          addonUrl="https://github.com/joscha/storybook-addon-i18n-tools"
        />

        <Subheader>Code</Subheader>
        <AddonItem
          title="JSX preview"
          desc="Get a preview of the JSX code for each story. Configure the display and copy the code with a single click."
          addonUrl="https://github.com/storybooks/addon-jsx"
        />
        <AddonItem
          title="React live edit"
          desc="Provides live react story editing and preview."
          addonUrl="https://github.com/vertexbz/storybook-addon-react-live-edit"
        />
        <AddonItem
          title="Copy code block"
          desc="Display code and copy it to the clipboard. It also has options to customize colors and syntax highlighting for any language. There is similar functionality via @storybook/addon-info but addon-info doesn’t currently work when using @storybook/html.
"
          addonUrl="https://github.com/Pickra/copy-code-block"
        />
        <AddonItem
          title="AngularJS (1.x)"
          desc="Create stories with AngularJS(1.x) components."
          addonUrl="https://github.com/titonobre/storybook-addon-angularjs"
        />

        <Subheader>Data & State</Subheader>
        <AddonItem
          title="Apollo"
          desc="Wrap your stories with the Apollo client for mocking GraphQL queries/mutations."
          addonUrl="https://github.com/abhiaiyer91/apollo-storybook-decorator"
        />
        <AddonItem
          title="State"
          desc="Manage state inside a story. Update components when this state changes. Wrap the story in a function call to setup state management. The story can modify state properties with the provided store. The addon provides a panel to view and reset state."
          addonUrl="https://github.com/dump247/storybook-state/"
        />

        <Subheader>Style</Subheader>
        <AddonItem
          title="Material-UI"
          desc="Wraps your story into MuiThemeProvider. It allows you to add your custom themes, switch between them, make changes in the visual editor and download as JSON file."
          addonUrl="https://github.com/react-theming/storybook-addon-material-ui"
        />
        <AddonItem
          title="Styles"
          desc="Add ability to customize styles in the story preview area"
          addonUrl="https://github.com/Sambego/storybook-styles"
        />
        <AddonItem
          title="styled-components theme"
          desc="Select between styled components themes."
          addonUrl="https://github.com/echoulen/storybook-addon-styled-component-theme"
        />
        <AddonItem
          title="JSS theme"
          desc="Select between JSS themes."
          addonUrl="https://github.com/vertexbz/storybook-addon-jss-theme"
        />

        <Subheader>Design</Subheader>
        <AddonItem
          title="Story2sketch"
          desc="Convert stories into Sketch symbols."
          addonUrl="https://github.com/chrisvxd/story2sketch"
        />
        <AddonItem
          title="Figma"
          desc="Embed Figma designs in a storybook panel."
          addonUrl="https://github.com/hharnisc/storybook-addon-figma"
        />
        <div>
          <Button
            outline
            secondary
            isLink
            href={`${
              url.gitHub.frontpage
            }/blob/master/src/components/screens/AddonScreen/AddonScreen.js#L158`}
          >
            <Icon icon="plus" /> Add your addon here
          </Button>
        </div>
      </List>

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

export default function AddonScreen(props) {
  return (
    <StaticQuery
      query={graphql`
        query AddonsScreenQuery {
          allMediumPost(sort: { fields: [createdAt], order: DESC }, limit: 3) {
            edges {
              node {
                id
                title
                virtuals {
                  subtitle
                }
                medium_id
                uniqueSlug
              }
            }
          }
        }
      `}
      render={data => <PureAddonScreen data={data} {...props} />}
    />
  );
}
