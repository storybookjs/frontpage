import React, { useState, useEffect, useRef } from 'react';
import { color, styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const { breakpoints, pageMargins } = styles;

const images = [
  '/images/community/community-michele.webp',
  '/images/community/community-gert.webp',
  '/images/community/community-yann.webp',
];

const videosA = [
  { src: '/videos/community/brad.mp4', link: 'https://www.youtube.com/watch?v=jR0Gefa4lpg' },
  { src: '/videos/community/esther.mp4', link: 'https://www.youtube.com/watch?v=U7lW6qAsvrg' },
  {
    src: '/videos/community/jackherrington.mp4',
    link: 'https://www.youtube.com/watch?v=NgkYH97Z3nk',
  },
];
const videosB = [
  {
    src: '/videos/community/jackpritchard.mp4',
    link: 'https://www.youtube.com/watch?v=8GxTENqNjYI',
  },
  { src: '/videos/community/katerina.mp4', link: 'https://www.youtube.com/watch?v=VgxrR2Ypbuc' },
  { src: '/videos/community/jarrod.mp4', link: 'https://www.youtube.com/watch?v=L4F5dSu0FcQ' },
];

const Wrapper = styled.div`
  ${pageMargins}
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 30px;

  padding-top: 0rem;
  padding-bottom: 3rem;

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
  border-radius: 10px;
  background: ${(props) => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.border)};

  @media (min-width: ${breakpoints[1]}px) {
    grid-column: 1 / 3;
  }
`;
const VideoCardALink = styled.a`
  position: relative;
  grid-column: 1 / 3;
  border-radius: 10px;
  background: ${(props) => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.border)};

  @media (min-width: ${breakpoints[1]}px) {
    grid-column: 3 / 4;
  }
`;
const VideoCardBLink = styled.a`
  position: relative;
  grid-column: 3 / 5;
  border-radius: 10px;
  background: ${(props) => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.border)};

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

let count = 0;
const options = ['img', 'videoA', 'videoB'];

function nextOption() {
  const index = count % options.length;
  count += 1;
  return options[index];
}

function useAnimationState(totalCount, animate) {
  const [activeIndex, setActiveIndex] = useState({ img: 0, videoA: 0, videoB: 0 });
  const [animateNext, setAnimateNext] = useState('videoB');

  useEffect(() => {
    if (!animate) return () => {};

    const id = setInterval(() => {
      const nextIndex =
        activeIndex[animateNext] === totalCount - 1 ? 0 : activeIndex[animateNext] + 1;
      setActiveIndex({ ...activeIndex, [animateNext]: nextIndex });
      setAnimateNext(nextOption());
    }, 6000);

    return () => {
      clearInterval(id);
    };
  }, [activeIndex, animateNext, totalCount, animate]);

  return activeIndex;
}

export function Community({ inverse, ...props }) {
  const sectionRef = useRef(null);
  const animate = useInView(sectionRef);
  const activeIndex = useAnimationState(3, animate);
  const videoBRef = useRef(null);
  const [pauseVideoB, setPauseVideoB] = useState(false);

  // Pause Video B (on first load)
  // so that only one video is playing at a time
  useEffect(() => {
    const pauseVideo = () => {
      videoBRef.current.pause();
      videoBRef.current.removeEventListener('loadeddata', pauseVideo);
    };

    if (videoBRef.current && !pauseVideoB) {
      videoBRef.current.addEventListener('loadeddata', pauseVideo);
      setPauseVideoB(true);
    }
  }, [videoBRef, pauseVideoB]);

  return (
    <Wrapper ref={sectionRef} {...props}>
      <ImageCardWrapper inverse={inverse}>
        <AnimatePresence initial={false}>
          <ImageCard
            key={activeIndex.img}
            style={{ backgroundImage: `url('${images[activeIndex.img]}')` }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.4 },
            }}
          />
        </AnimatePresence>
      </ImageCardWrapper>
      <VideoCardALink
        inverse={inverse}
        href={videosA[activeIndex.videoA].link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        <AnimatePresence initial={false}>
          <VideoCard
            key={activeIndex.videoA}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8 },
            }}
            src={videosA[activeIndex.videoA].src}
            autoPlay
            playsInline
            muted
          />
        </AnimatePresence>
      </VideoCardALink>
      <VideoCardBLink
        inverse={inverse}
        href={videosB[activeIndex.videoB].link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        <AnimatePresence initial={false}>
          <VideoCard
            ref={videoBRef}
            key={activeIndex.videoB}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8 },
            }}
            src={videosB[activeIndex.videoB].src}
            autoPlay
            playsInline
            muted
          />
        </AnimatePresence>
      </VideoCardBLink>
    </Wrapper>
  );
}
