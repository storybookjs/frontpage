import React from 'react';
import { Breadcrumb as BreadcrumbComponent } from './Breadcrumb';

export default {
  title: 'Basics/Breadcrumb',
  component: BreadcrumbComponent,
};

export const Breadcrumb = () => (
  <div style={{ paddingTop: '2rem' }}>
    <BreadcrumbComponent to="/">View full catalog</BreadcrumbComponent>
  </div>
);
