import React from 'react';
import { AddonsAside, AddonsAsideTitle } from './AddonsAside';

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
    <AddonsAsideTitle>Title</AddonsAsideTitle>
    <div style={{ marginBottom: 48 }}>children</div>
  </AddonsAside>
);
