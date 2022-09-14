import React from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { breakpoints, pageMargins } = styles;

const Figure = styled.figure`
  ${pageMargins};
`;

const Content = styled.div`
  position: relative;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 22%;
  max-width: 715px;

  @media (min-width: ${breakpoints[1]}px) {
    margin-top: 4rem;
  }
`;

const CalendarComponent = styled.img`
  display: block;
  width: 55%;
`;

const reviewComments = [
  { id: 0, image: 'images/home/automate/comment-1.svg' },
  { id: 1, image: 'images/home/automate/comment-2.svg' },
  { id: 2, image: 'images/home/automate/comment-3.svg' },
];

const Comments = styled.div`
  flex: none;
  width: 52%;
  height: 132%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate3d(0%, 8.5%, 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2.5%;
`;

const Comment = styled.img`
  display: block;
  height: 32%;
  width: auto;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2)) drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.1));
`;

export function UIReview({ docs, ...props }) {
  return (
    <Figure>
      <Content {...props}>
        <CalendarComponent src="images/home/automate/datepicker-compact-week.svg" alt="" />
        <Comments>
          {reviewComments.map(({ id, image }) => (
            <Comment key={id} src={image} />
          ))}
        </Comments>
      </Content>
    </Figure>
  );
}
