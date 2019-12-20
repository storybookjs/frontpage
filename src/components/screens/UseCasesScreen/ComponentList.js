import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hoistStatics, compose, withState } from 'recompose';

import { styles, animation } from '@storybook/design-system';

import ComponentItem from './ComponentItem';
import LogoToggle from './LogoToggle';

const { breakpoint } = styles;
const { shake } = animation;

const Toggle = styled(LogoToggle)`
  margin-top: 0.5rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoint}px) {
    margin-top: 1rem;
  }

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
  justify-content: center;

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
  return (
    <Wrapper {...props}>
      <Toggle
        path="/images/logos/user"
        brands={['formidable', 'auth0', 'artsy', 'jetbrains']}
        selectedIndex={selectedIndex}
        onSelectIndex={onSelectIndex}
        clicked={selectedIndex !== 0}
      />

      {selectedIndex === 0 && (
        <Fragment>
          <List>
            <Item imageUrl="/images/use-cases/formidable/1.png" />
            <Item imageUrl="/images/use-cases/formidable/2.png" />
            <Item imageUrl="/images/use-cases/formidable/3.png" />
            <Item imageUrl="/images/use-cases/formidable/4.png" />
            <Item imageUrl="/images/use-cases/formidable/5.png" />
            <Item imageUrl="/images/use-cases/formidable/6.png" />
          </List>
          <List>
            <Item imageUrl="/images/use-cases/formidable/7.png" />
            <Item imageUrl="/images/use-cases/formidable/8.png" />
            <Item imageUrl="/images/use-cases/formidable/9.png" />
            <Item imageUrl="/images/use-cases/formidable/10.png" />
            <Item imageUrl="/images/use-cases/formidable/11.png" />
            <Item imageUrl="/images/use-cases/formidable/12.png" />
          </List>
        </Fragment>
      )}
      {selectedIndex === 1 && (
        <Fragment>
          <List>
            <Item imageUrl="/images/use-cases/auth0/1.png" />
            <Item imageUrl="/images/use-cases/auth0/2.png" />
            <Item imageUrl="/images/use-cases/auth0/3.png" />
            <Item imageUrl="/images/use-cases/auth0/4.png" />
            <Item imageUrl="/images/use-cases/auth0/5.png" />
            <Item imageUrl="/images/use-cases/auth0/6.png" />
          </List>
          <List>
            <Item imageUrl="/images/use-cases/auth0/7.png" />
            <Item imageUrl="/images/use-cases/auth0/8.png" />
            <Item imageUrl="/images/use-cases/auth0/9.png" />
            <Item imageUrl="/images/use-cases/auth0/10.png" />
            <Item imageUrl="/images/use-cases/auth0/11.png" />
            <Item imageUrl="/images/use-cases/auth0/12.png" />
          </List>
        </Fragment>
      )}
      {selectedIndex === 2 && (
        <Fragment>
          <List>
            <Item imageUrl="/images/use-cases/artsy/1.png" />
            <Item imageUrl="/images/use-cases/artsy/2.png" />
            <Item imageUrl="/images/use-cases/artsy/3.png" />
            <Item imageUrl="/images/use-cases/artsy/4.png" />
            <Item imageUrl="/images/use-cases/artsy/5.png" />
            <Item imageUrl="/images/use-cases/artsy/6.png" />
          </List>
          <List>
            <Item imageUrl="/images/use-cases/artsy/7.png" />
            <Item imageUrl="/images/use-cases/artsy/8.png" />
            <Item imageUrl="/images/use-cases/artsy/9.png" />
            <Item imageUrl="/images/use-cases/artsy/10.png" />
            <Item imageUrl="/images/use-cases/artsy/11.png" />
            <Item imageUrl="/images/use-cases/artsy/12.png" />
          </List>
        </Fragment>
      )}
      {selectedIndex === 3 && (
        <Fragment>
          <List>
            <Item imageUrl="/images/use-cases/jetbrains/1.png" />
            <Item imageUrl="/images/use-cases/jetbrains/2.png" />
            <Item imageUrl="/images/use-cases/jetbrains/3.png" />
            <Item imageUrl="/images/use-cases/jetbrains/4.png" />
            <Item imageUrl="/images/use-cases/jetbrains/5.png" />
            <Item imageUrl="/images/use-cases/jetbrains/6.png" />
          </List>
          <List>
            <Item imageUrl="/images/use-cases/jetbrains/7.png" />
            <Item imageUrl="/images/use-cases/jetbrains/8.png" />
            <Item imageUrl="/images/use-cases/jetbrains/9.png" />
            <Item imageUrl="/images/use-cases/jetbrains/10.png" />
            <Item imageUrl="/images/use-cases/jetbrains/11.png" />
            <Item imageUrl="/images/use-cases/jetbrains/12.png" />
          </List>
        </Fragment>
      )}
    </Wrapper>
  );
}

ComponentList.propTypes = {
  onSelectIndex: PropTypes.func,
  selectedIndex: PropTypes.number,
};

ComponentList.defaultProps = {
  onSelectIndex: () => 0,
  selectedIndex: undefined,
};

export default hoistStatics(compose(withState('selectedIndex', 'onSelectIndex', 0)))(ComponentList);
