/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Icon from './Icon';

storiesOf('basics/Button', module)
  .add('all buttons', () => (
    <div>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
      <Button tertiary>Tertiary</Button>
      <Button outline>Outline</Button>
      <Button primary disabled>
        Disabled
      </Button>
      <br />
      <Button primary loading>
        Primary
      </Button>
      <Button secondary loading>
        Secondary
      </Button>
      <Button tertiary loading>
        Tertiary
      </Button>
      <Button outline loading>
        Outline
      </Button>
      <Button outline loading loadingText="Custom...">
        Outline
      </Button>
      <br />
      <Button primary small>
        Primary
      </Button>
      <Button secondary small>
        Secondary
      </Button>
      <Button tertiary small>
        Tertiary
      </Button>
      <Button outline small>
        Outline
      </Button>
      <Button primary disabled small>
        Disabled
      </Button>
      <Button outline small containsIcon>
        <Icon icon="link" />
      </Button>
      <Button outline small>
        <Icon icon="link" />
        Link
      </Button>
      
    </div>
  ))
  .add('primary', () => <Button primary>Primary</Button>)
  .add('secondary', () => <Button secondary>Secondary</Button>)
  .add('tertiary', () => <Button tertiary>Tertiary</Button>)
  .add('outline', () => <Button outline>Outline</Button>)
  .add('disabled', () => (
    <Button primary disabled>
      Disabled
    </Button>
  ))
  .add('small', () => (
    <Button primary small>
      Small
    </Button>
  ))
  .add('icon', () => (
    <div>
      <Button outline small>
        <Icon icon="github" />
        GitHub
      </Button>
      <Button secondary small>
        <Icon icon="cog" />
        Settings
      </Button>
      <Button outline>
        <Icon icon="github" />
        GitHub
      </Button>
    </div>
  ))
  .add('icon only', () => (
    <div>
      <Button outline small containsIcon>
        <Icon icon="link" />
      </Button>
      <Button outline containsIcon>
        <Icon icon="link" />
      </Button>
      <Button primary containsIcon>
        <Icon icon="lightning" />
      </Button>
    </div>
  ));
