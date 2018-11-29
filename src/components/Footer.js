import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

export default function Footer({ ...props }) {
  return <Background {...props}>Footer</Background>;
}
