import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import PageTitle from './PageTitle';

storiesOf('Layout/PageTitle', module).add('all', () => (
  <PageTitle
    suptitle="Addons"
    title="Supercharge Storybook"
    desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
  />
));
