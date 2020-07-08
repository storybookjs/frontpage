import React from 'react';
import { storiesOf } from '@storybook/react';

import Testimonial from './Testimonial';

import ChromaticLogoSVG from '../../images/logos/user/logo-chromatic.svg';

storiesOf('Frontpage|layout/Testimonial', module)
  .addDecorator(storyFn => <div style={{ padding: '60px 0' }}>{storyFn()}</div>)
  .add('default', () => (
    <Testimonial
      text={
        <span>
          “Storybook is an absolutely fantastic app that helps to keep us organized and our
          customers happy.”
        </span>
      }
      avatarUrl="https://avatars1.githubusercontent.com/u/263385?s=88&v=4"
      name="Dominic Nguyen"
      jobTitle="Product designer"
      logo={ChromaticLogoSVG}
    />
  ));
