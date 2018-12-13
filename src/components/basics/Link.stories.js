/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Link from './Link';
import Icon from './Icon';

const onLinkClick = action('onLinkClick');
storiesOf('basics/Link', module).add('all', () => (
  <div>
    <Link href="http://google.com">Default</Link>
    <br />
    <Link secondary href="http://google.com">
      Secondary
    </Link>
    <br />
    <Link tertiary href="http://google.com">
      tertiary
    </Link>
    <br />
    <Link nochrome href="http://google.com">
      nochrome
    </Link>
    <br />
    <Link href="http://google.com">
      <Icon icon="discord" />
      With icon in front
    </Link>
    <br />
    <Link containsIcon href="http://google.com">
      <Icon icon="sidebar" />
    </Link>
    <br />
    <Link containsIcon withArrow href="http://google.com">
      With arrow behind
    </Link>
    <br />
    <span style={{ background: '#333' }}>
      <Link inverse href="http://google.com">
        Inverted colors
      </Link>
    </span>
    <br />
    <Link primary isButton onClick={onLinkClick}>
      is actually a button
    </Link>
    <br />
    <Link primary isGatsby to="/gatsby">
      is a GatsbyLink
    </Link>
  </div>
));
