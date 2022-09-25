import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { Avatar } from '@storybook/design-system';

const { typography, color, marketing } = styles;

const TestimonialWrapper = styled.div`
  /* max-width: 300px; */
`;
const Quote = styled.blockquote`
  ${marketing.textLarge};
  color: ${color.darkest};
  margin: 0 0 1.25rem 0;
`;
const Cite = styled.cite`
  display: flex;
  align-items: center;
  font-style: normal;
`;
const AuthorImage = styled(Avatar)`
  margin-right: 1rem;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  color: ${color.darkest};
`;
const Title = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: 18px;
  color: ${color.dark};
`;

interface SmallTestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

export const SmallTestimonial = ({ quote, name, title, avatarUrl }: SmallTestimonialProps) => (
  <TestimonialWrapper>
    <Quote>“{quote}”</Quote>
    <Cite>
      <AuthorImage size="large" username={name} src={avatarUrl} />
      <div>
        <Name>{name}</Name>
        <Title>{title}</Title>
      </div>
    </Cite>
  </TestimonialWrapper>
);
