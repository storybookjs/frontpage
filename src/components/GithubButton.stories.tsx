import React from 'react';
import { GithubButton } from './GithubButton';

export default {
  title: 'Components/GithubButton',
  component: GithubButton,
};

export const Basic = (args) => <GithubButton starCount={73724} />;
