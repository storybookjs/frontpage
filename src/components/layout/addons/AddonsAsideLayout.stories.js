import React from 'react';
import { AddonsAside, AddonsAsideContainer } from './AddonsAsideLayout';
import { AddonsSubheading } from './AddonsSubheading';

export default {
  title: 'Frontpage|layout/addons/AddonsAsideLayout',
  component: AddonsAside,
};

const Content = () => <div style={{ flex: '1 1 auto' }}>Content</div>;

export const Default = () => (
  <AddonsAsideContainer>
    <Content />
    <AddonsAside />
  </AddonsAsideContainer>
);

export const WithChildren = () => (
  <AddonsAsideContainer>
    <Content />
    <AddonsAside>
      <div style={{ marginBottom: 48 }}>children</div>
    </AddonsAside>
  </AddonsAsideContainer>
);

export const WithSectionTitle = () => (
  <AddonsAsideContainer>
    <Content />
    <AddonsAside>
      <AddonsSubheading>Title</AddonsSubheading>
      <div style={{ marginBottom: 48 }}>children</div>
    </AddonsAside>
  </AddonsAsideContainer>
);
