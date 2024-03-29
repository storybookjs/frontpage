import React from 'react';
import { IntegrationImage } from './IntegrationImage';

export default {
  title: 'Integrations Catalog/Layout/IntegrationImage',
  component: IntegrationImage,
  parameters: {
    layout: 'centered',
    chromatic: { viewports: [320, 900] },
  },
};

const MUI = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.714 26.64a1.112 1.112 0 0 0 .558-.96l.02-6.43a1.111 1.111 0 0 1 .558-.96l3.485-2.002A1.11 1.11 0 0 1 40 17.25v11.69a1.112 1.112 0 0 1-.558.963L26.288 37.46a1.112 1.112 0 0 1-1.105.001L14.86 31.557a1.11 1.11 0 0 1-.56-.965v-5.894c0-.007.008-.011.014-.008.006.003.014 0 .014-.008v-.006c0-.005.002-.01.006-.011l8.503-4.885c.007-.004.004-.017-.005-.017-.002 0-.005 0-.006-.002a.009.009 0 0 1-.003-.006l.017-5.78a1.112 1.112 0 0 0-1.667-.966l-6.319 3.641a1.11 1.11 0 0 1-1.109 0L7.407 13a1.11 1.11 0 0 0-1.666.962v10.445a1.112 1.112 0 0 1-1.662.965L.56 23.362a1.111 1.111 0 0 1-.56-.967L.032 4.139a1.111 1.111 0 0 1 1.665-.961l12.05 6.921a1.111 1.111 0 0 0 1.106 0L26.9 3.178a1.11 1.11 0 0 1 1.664.964v18.26a1.11 1.11 0 0 1-.556.964l-6.31 3.633a1.11 1.11 0 0 0 .005 1.928l3.48 1.98a1.111 1.111 0 0 0 1.104-.001l7.427-4.266Zm.73-16.38a1.11 1.11 0 0 0 1.682.952l3.334-2A1.112 1.112 0 0 0 40 8.26V4.185a1.112 1.112 0 0 0-1.682-.952l-3.334 2a1.111 1.111 0 0 0-.54.953v4.075Z' fill='%23007FFF'/%3E%3C/svg%3E`;

const NextJS = `data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M20.559.012c-.095.008-.396.039-.667.06-6.25.563-12.103 3.935-15.81 9.117A21.775 21.775 0 0 0 .196 18.8C.021 20.01 0 20.366 0 22.005 0 23.643.02 24 .197 25.208c1.196 8.261 7.076 15.202 15.05 17.774 1.428.46 2.933.774 4.645.963.667.073 3.548.073 4.215 0 2.955-.327 5.458-1.058 7.927-2.318.378-.193.452-.245.4-.288-.034-.026-1.647-2.189-3.583-4.803l-3.518-4.753-4.409-6.523c-2.426-3.587-4.421-6.52-4.439-6.52-.017-.004-.034 2.895-.043 6.434-.012 6.197-.017 6.446-.094 6.592-.112.211-.198.297-.379.392-.137.069-.258.081-.907.081h-.744l-.198-.124a.805.805 0 0 1-.288-.314l-.09-.194.008-8.622.013-8.627.133-.168c.07-.09.215-.206.319-.262.176-.086.245-.095.989-.095.877 0 1.023.035 1.251.284.065.07 2.452 3.664 5.308 7.995 2.856 4.33 6.761 10.244 8.68 13.146l3.483 5.277.177-.116c1.561-1.015 3.213-2.46 4.52-3.965a21.898 21.898 0 0 0 5.179-11.246c.176-1.208.197-1.565.197-3.204 0-1.638-.021-1.995-.197-3.204-1.196-8.26-7.076-15.202-15.05-17.773-1.406-.456-2.903-.77-4.58-.96-.413-.042-3.256-.09-3.613-.055Zm9.006 13.305a.867.867 0 0 1 .434.508c.035.112.044 2.503.035 7.891l-.013 7.732-1.363-2.09-1.368-2.09v-5.62c0-3.634.017-5.677.043-5.776.069-.24.22-.43.426-.542.176-.09.24-.099.916-.099.636 0 .748.009.89.086Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h44v44H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E`;

const Template = (args) => <IntegrationImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: NextJS,
  accent: '#000',
};

export const WithConnector = Template.bind({});
WithConnector.args = {
  ...Default.args,
  withConnector: true,
};

export const NonSymmetricalIcon = Template.bind({});
NonSymmetricalIcon.args = {
  icon: MUI,
  accent: '#071A2E',
  withConnector: true,
};
