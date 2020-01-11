/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import Section from './Section';

const ContentWrapper = styled.div`
  margin-top: 1rem;
`;

storiesOf('Frontpage|screens/TeamScreen/Section', module).add('default', () => (
  <Section heading="Team Heading" description="This is a description of what the section entails">
    <ContentWrapper>Content</ContentWrapper>
  </Section>
));
