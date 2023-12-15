import * as React from 'react';
import { css, styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';
import GatsbyLink from '../../basics/GatsbyLink';

import DOCS_TABS from '../../../constants/docs-tabs';

const firstTabId = DOCS_TABS[0].id;

const { code, color, spacing, typography } = styles;

// TODO: Infer from DOCS_TABS
type TabId = 'guide' | 'api' | 'migration';

type SubPageTabsProps = {
  activeTab: TabId;
  slug: string;
  tabs: TabId[];
};

const Tabs = styled.div`
  border-bottom: 1px solid ${color.mediumlight};
  display: flex;
  font-size: ${typography.size.s2}px;
  gap: ${spacing.padding.large}px;
  margin-bottom: 1.5rem;
`;

type TabProps = React.ComponentProps<typeof GatsbyLink> & { isActive: boolean };

const Tab = styled(GatsbyLink, {
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<TabProps>`
  padding: 0 ${spacing.padding.small}px ${spacing.padding.small}px;
  position: relative;
  bottom: -1px;
  &&&:hover,
  &&&:focus {
    color: ${color.secondary};
    transform: none;
  }
  ${({ isActive }) =>
    isActive
      ? css`
          &&& {
            border-bottom: 2px solid ${color.secondary};
            color: ${color.secondary};
            font-weight: ${typography.weight.bold};
          }
        `
      : css`
          &&& {
            color: inherit;
          }
        `}
`;

function getHref(id: TabId, activeTab: TabId, slug: string) {
  let href = './';

  if (activeTab === firstTabId) {
    if (id !== firstTabId) {
      href = `./${id}`;
    }
  } else {
    if (id !== activeTab) {
      href = `../${id}`;
    }
    if (id === firstTabId) {
      href = '../';
    }
  }

  if (slug.split(`${activeTab}/`)?.length > 1) {
    /**
     * If the slug is a nested sub-page, we need to go up one more level
     * `./foo` -> `../foo`
     * `../foo` -> `../../foo`
     */
    return href.match(/^\.\//) ? href.replace(/^\.\//, '../') : href.replace(/^\.\.\//, '../../');
  }

  return href;
}

export const SubPageTabs = ({ activeTab, slug, tabs }: SubPageTabsProps) => {
  const relevantTabs = DOCS_TABS.filter(({ id }) => tabs.includes(id as TabId));

  return (
    <Tabs>
      {relevantTabs.map(({ id, label }) => {
        const isActive = id === activeTab;
        return (
          <Tab
            key={id}
            to={getHref(id as TabId, activeTab, slug)}
            isActive={isActive}
            aria-current={isActive}
          >
            {label}
          </Tab>
        );
      })}
    </Tabs>
  );
};
