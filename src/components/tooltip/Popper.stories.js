/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Manager, Target, PopperWithArrow } from './Popper';

const ViewPort = styled.div`
  width: 350px;
  height: 350px;
  overflow: scroll;
`;

const BackgroundBox = styled.div`
  width: 500px;
  height: 500px;
  background: #eee;
  position: relative;
  padding: 150px;
`;

const RedBox = styled.div`
  width: 200px;
  height: 100px;
  background-color: red;
  color: white;
`;

const BlueBox = styled.div`
  width: 100px;
  height: 50px;
  background-color: blue;
  color: white;
`;

const Story = ({ placement }) => (
  <Manager>
    <Target>
      <RedBox />
    </Target>
    <PopperWithArrow placement={placement}>
      <BlueBox>Tooltip!!</BlueBox>
    </PopperWithArrow>
  </Manager>
);

Story.propTypes = { placement: PropTypes.string.isRequired };

storiesOf('tooltip/Popper', module)
  .addDecorator(storyFn => (
    <ViewPort>
      <BackgroundBox>{storyFn()}</BackgroundBox>
    </ViewPort>
  ))
  .add('top', () => <Story placement="top" />);
// .add('bottom', () => <Story placement="bottom" />)
// .add('left', () => <Story placement="left" />)
// .add('right', () => <Story placement="right" />);
