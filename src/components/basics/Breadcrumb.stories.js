import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Frontpage|basics/Breadcrumb',
  component: Breadcrumb,
};

export const Default = () => (
  <div style={{ paddingTop: '2rem' }}>
    <Breadcrumb to="/">View full catalog</Breadcrumb>
  </div>
);
