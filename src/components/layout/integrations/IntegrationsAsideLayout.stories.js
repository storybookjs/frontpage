import React from 'react';
import { IntegrationsAside, IntegrationsAsideContainer } from './IntegrationsAsideLayout';
import { IntegrationsSubheading } from './IntegrationsSubheading';

export default {
  title: 'Integrations Catalog/Layout/IntegrationsAsideLayout',
  component: IntegrationsAside,
};

const Content = () => <div style={{ flex: '1 1 auto' }}>Content</div>;

export const Default = () => (
  <IntegrationsAsideContainer>
    <Content />
    <IntegrationsAside />
  </IntegrationsAsideContainer>
);

export const WithChildren = () => (
  <IntegrationsAsideContainer>
    <Content />
    <IntegrationsAside>
      <div style={{ marginBottom: 48 }}>children</div>
    </IntegrationsAside>
  </IntegrationsAsideContainer>
);

export const WithSectionTitle = () => (
  <IntegrationsAsideContainer>
    <Content />
    <IntegrationsAside>
      <IntegrationsSubheading>Title</IntegrationsSubheading>
      <div style={{ marginBottom: 48 }}>children</div>
    </IntegrationsAside>
  </IntegrationsAsideContainer>
);
