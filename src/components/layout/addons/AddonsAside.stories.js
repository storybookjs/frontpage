import React from 'react';
import { AddonsAside } from './AddonsAside';
import { AddonsSubheading } from './AddonsSubheading';

export default {
  title: 'Frontpage|layout/addons/AddonsAside',
  component: AddonsAside,
};

export const Default = () => <AddonsAside />;

export const WithChildren = () => (
  <AddonsAside>
    <div style={{ marginBottom: 48 }}>children</div>
  </AddonsAside>
);

export const WithSectionTitle = () => (
  <AddonsAside>
    <AddonsSubheading>Title</AddonsSubheading>
    <div style={{ marginBottom: 48 }}>children</div>
  </AddonsAside>
);
