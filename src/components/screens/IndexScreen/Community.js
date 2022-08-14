import React, { useState, useEffect } from 'react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, AnimatePresence } from 'framer-motion';

const { breakpoints, pageMargins } = styles;

const images = [
  'images/home/community-gert.jpg',
  'images/home/community-michele.jpg',
  'images/home/community-yann.jpg',
];

const videosA = [
  'videos/community/brad.mp4',
  'videos/community/esther.mp4',
  'videos/community/jackherrington.mp4',
];
const videosB = [
  'videos/community/katerina.mp4',
  'videos/community/jackpritchard.mp4',
  'videos/community/jarrod.mp4',
];

const Wrapper = styled.div`
  ${pageMargins}
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 30px;

  padding-top: 3rem;
  padding-bottom: 7rem;

  @media (min-width: ${breakpoints[1]}px) {
    padding-bottom: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-bottom: 7rem;
  }
`;

const ImageCardWrapper = styled.div`
  position: relative;
  grid-column: 1 / -1;

  @media (min-width: ${breakpoints[1]}px) {
    grid-column: 1 / 3;
  }
`;
const VideoCardAWrapper = styled.div`
  position: relative;
  grid-column: 1 / 3;

  @media (min-width: ${breakpoints[1]}px) {
    grid-column: 3 / 4;
  }
`;
const VideoCardBWrapper = styled.div`
  position: relative;
  grid-column: 3 / 5;

  @media (min-width: ${breakpoints[1]}px) {
    grid-column: 4 / 5;
  }
`;
const VideoCard = styled(motion.video)`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ImageCard = styled(motion.div)`
  border-radius: 10px;
  background-image: url('images/home/community-yann.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

export const AnimatedImageCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (activeIndex === images.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [activeIndex]);

  return (
    <AnimatePresence initial={false}>
      <ImageCard
        key={activeIndex}
        style={{ backgroundImage: `url('${images[activeIndex]}')` }}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.4 },
        }}
      />
    </AnimatePresence>
  );
};

export const AnimatedVideoCard = ({ videos, offset = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (activeIndex === videos.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 5000 + offset);

    return () => {
      clearInterval(id);
    };
  }, [activeIndex, videos, offset]);

  return (
    <AnimatePresence initial={false}>
      <VideoCard
        key={activeIndex}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.8 },
        }}
        src={videos[activeIndex]}
        autoPlay
        loop
        playsInline
      />
    </AnimatePresence>
  );
};

export function Community({ docs, projects, storybooks, ...props }) {
  return (
    <Wrapper {...props}>
      <ImageCardWrapper>
        <AnimatedImageCard />
      </ImageCardWrapper>
      <VideoCardAWrapper>
        <AnimatedVideoCard videos={videosA} />
      </VideoCardAWrapper>
      <VideoCardBWrapper>
        <AnimatedVideoCard videos={videosB} offset={1000} />
      </VideoCardBWrapper>
    </Wrapper>
  );
}
