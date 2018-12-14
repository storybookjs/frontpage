import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { hoistStatics, compose, withState } from 'recompose';

import { styles, animation } from '../../basics';

import ComponentItem from './ComponentItem';
import LogoToggle from './LogoToggle';

const { breakpoint } = styles;
const { shake } = animation;

const Toggle = styled(LogoToggle)`
  margin-top: 0.5rem;
  margin-bottom: 2rem;

  > *:not(:first-child) {
    animation: ${shake} 10s ease-in-out infinite 5s;
  }

  ${props =>
    props.clicked &&
    css`
      > * {
        animation: none !important;
      }
    `};
`;

const Item = styled(ComponentItem)`
  display: inline-block;
  flex: 0 1 50%;
  width: 50%;
  @media (min-width: ${breakpoint * 0.7}px) {
    flex: 0 1 33%;
    width: 33%;
  }
  @media (min-width: ${breakpoint}px) {
    flex: 0 1 20%;
    width: 20%;
  }
  @media (min-width: ${breakpoint * 1.5}px) {
    flex: 0 1 16.66%;
    width: 16.66%;
  }
  padding: 0 10px;
  min-width: 150px;
`;

const List = styled.div`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  position: relative;

  @media (min-width: ${breakpoint * 1}px) {
    width: calc(100% + 20px);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ComponentList({ selectedIndex, onSelectIndex, ...props }) {
  const componentItems = 12;

  return (
    <Wrapper {...props}>
      <Toggle
        path="images/logos/user"
        brands={['formidable', 'auth0', 'artsy']}
        selectedIndex={selectedIndex}
        onSelectIndex={onSelectIndex}
        clicked={selectedIndex !== 0}
      />
      {/* eslint-disable react/no-array-index-key */}

      {selectedIndex === 0 && (
        <Fragment>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/formidable/${index + 1}.png`} />
            ))}
          </List>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/formidable/${index + 7}.png`} />
            ))}
          </List>
        </Fragment>
      )}
      {selectedIndex === 1 && (
        <Fragment>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/auth0/${index + 1}.png`} />
            ))}
          </List>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/auth0/${index + 7}.png`} />
            ))}
          </List>
        </Fragment>
      )}
      {selectedIndex === 2 && (
        <Fragment>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/artsy/${index + 1}.png`} />
            ))}
          </List>
          <List>
            {[...Array(componentItems / 2)].map((e, index) => (
              <Item key={index} imageUrl={`images/use-cases/artsy/${index + 7}.png`} />
            ))}
          </List>
        </Fragment>
      )}
    </Wrapper>
  );
}

ComponentList.propTypes = {};

export default hoistStatics(compose(withState('selectedIndex', 'onSelectIndex', 0)))(ComponentList);
