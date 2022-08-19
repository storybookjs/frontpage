import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@storybook/theming';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
    margin-top: 5rem;
  }
`;

const CalendarComponent = styled(motion.img)`
  display: block;
  width: 55%;
`;

const comments = [
  'images/home/automate/comment-1.svg',
  'images/home/automate/comment-2.svg',
  'images/home/automate/comment-3.svg',
];

const Comments = styled(motion.div)`
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

const Comment = styled(motion.img)`
  display: block;
  height: 32%;
  width: auto;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2)) drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.1));
`;

export function UIReview({ docs, ...props }) {
  const [reviewComments, setReviewComments] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  useEffect(() => {
    const addComment = (id) => {
      setReviewComments((c) => [...c, { id, image: comments[id] }]);
    };

    if (isInView) {
      addComment(0);
      setTimeout(() => addComment(1), 2500);
      setTimeout(() => addComment(2), 4000);
    }
  }, [isInView]);

  return (
    <Figure>
      <Content {...props}>
        <CalendarComponent
          ref={ref}
          src="images/home/automate/datepicker-compact-week.svg"
          alt=""
        />
        <Comments>
          <AnimatePresence initial={false}>
            {reviewComments.map(({ id, image }) => (
              <Comment
                key={id}
                layout
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                src={image}
              />
            ))}
          </AnimatePresence>
        </Comments>
      </Content>
    </Figure>
  );
}
