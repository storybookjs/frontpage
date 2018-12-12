import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { styles } from './../../basics';
const { color, breakpoint } = styles;

import ComponentItem from './ComponentItem';
import LogoToggle from './LogoToggle';

const Logos = styled(LogoToggle)`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
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
  padding: 0px 10px 0px;
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

export default function ComponentList({ onSelectIndex, selectedIndex, ...props }) {
  return (
    <Wrapper {...props}>
      <Logos
        path="images/logos/user"
        brands={['formidable', 'auth0', 'artsy']}
        selectedIndex={0}
        onSelectIndex={onSelectIndex}
      />
      {/* TODO refactor to be able to pass `brand` and generate a list of 12 components */}
      <List>
        <Item imageUrl="images/use-cases/formidable/1.png" />
        <Item imageUrl="images/use-cases/formidable/2.png" />
        <Item imageUrl="images/use-cases/formidable/3.png" />
        <Item imageUrl="images/use-cases/formidable/4.png" />
        <Item imageUrl="images/use-cases/formidable/5.png" />
        <Item imageUrl="images/use-cases/formidable/6.png" />
      </List>
      <List>
        <Item imageUrl="images/use-cases/formidable/7.png" />
        <Item imageUrl="images/use-cases/formidable/8.png" />
        <Item imageUrl="images/use-cases/formidable/9.png" />
        <Item imageUrl="images/use-cases/formidable/10.png" />
        <Item imageUrl="images/use-cases/formidable/11.png" />
        <Item imageUrl="images/use-cases/formidable/12.png" />
      </List>
    </Wrapper>
  );
}

ComponentList.propTypes = {
  onSelectIndex: LogoToggle.propTypes.onSelectIndex,
  selectedIndex: LogoToggle.propTypes.selectedIndex,
};
