import React from 'react';
import { Link } from 'gatsby';

import styled from 'styled-components';

const Background = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header = ({ siteTitle }) => (
  <Background>
    <Title>
      <TitleLink to="/">{siteTitle}</TitleLink>
      <img src="images/gatsby-icon.png" />
    </Title>
  </Background>
);

export default Header;
