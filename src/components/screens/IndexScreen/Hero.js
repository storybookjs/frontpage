import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Icon, WithModal } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import { Link as GatsbyLink } from 'gatsby';
import { motion } from 'framer-motion';
import SocialProof from '../../layout/SocialProof';
import useSiteMetadata from '../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import { HeroDemo } from './StorybookDemo/HeroDemo';

const { color, breakpoints, pageMargins } = styles;

const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Texture = styled.div`
  position: absolute;
  width: 100%;
  top: -200px;
  bottom: -60px;
  z-index: 3;
  background: url('/images/home/texture.png'), 100px 100px repeat;
  background-size: 100px 100px;
  opacity: 0.6;
`;

const ContentContainer = styled.div`
  ${pageMargins};
  position: relative;
  z-index: 10;
  padding-top: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 4rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 5rem;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.01em;
  text-align: left;
  color: white;

  @media (min-width: ${breakpoints[1]}px) {
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: -0.01em;
  }

  @media (min-width: ${breakpoints[2]}px) {
    font-size: 56px;
    font-weight: 700;
    line-height: 70px;
    letter-spacing: -0.01em;
  }
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  color: #ffffff;
  max-width: 500px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (min-width: 860px) {
    margin-bottom: 64px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 860px) {
    flex-direction: row;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ButtonSolid = styled(GatsbyLink)`
  height: 48px;
  background: #fff;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 800;
  color: #000;
  text-decoration: none;
  padding-top: 1px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translate3d(0, -2px, 0);
  }
`;

const ButtonVideo = styled.button`
  height: 48px;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  padding-top: 1px;
  gap: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translate3d(0, -2px, 0);
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (min-width: 860px) {
    gap: 40px;
  }
`;

const HideDesktop = styled.div`
  display: block;

  @media (min-width: 860px) {
    display: none;
  }
`;

const StatHero = styled.a`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s ease;
  }

  &:hover {
    span {
      color: #ffffff;
    }
  }
`;

const ModalVideo = styled.iframe`
  width: 100%;
  height: 100%;
`;

const ModalVideoWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
  border-radius: 10px;
  overflow: hidden;
  background: ${color.lightest};
  /**
   * This z-index moves the wrapper to a new stacking context, which Safari
   * needs in order to render the rounded corners appropriately.
   */
  z-index: 1;
`;

const AspectRatio = styled(PlaceholderAspectRatio)`
  ${ModalVideoWrapper}, ${ModalVideo} {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

const CirclePurple = styled.div`
  position: absolute;
  width: 928px;
  height: 928px;
  flex-shrink: 0;
  border-radius: 928px;
  opacity: 0.6;
  background: #ff4785;
  filter: blur(72px);
  z-index: 2;
  top: -500px;
  left: -100px;
`;

const CircleOrange = styled.div`
  position: absolute;
  width: 740px;
  height: 740px;
  flex-shrink: 0;
  border-radius: 740px;
  opacity: 0.6;
  background: #fc521f;
  filter: blur(72px);
  z-index: 1;
  top: -420px;
  left: 480px;
`;

const CircleBlue = styled.div`
  position: absolute;
  width: 1192px;
  height: 1192px;
  flex-shrink: 0;
  border-radius: 1192px;
  opacity: 0.4;
  background: #4791ff;
  filter: blur(72px);
  z-index: 1;
  top: 210px;
  left: 560px;
`;

const Right = styled.a`
  display: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-decoration: none;
  padding-bottom: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  @media (min-width: 860px) {
    display: flex;
    align-items: end;
  }
`;

const EightContainer = styled.div`
  position: relative;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: -4px;
`;

const StarStyled = styled(motion.svg)`
  position: absolute;
  left: 0;
  top: 0;
`;

const Modal = () => (
  <AspectRatio ratio={0.5625}>
    <ModalVideoWrapper>
      <ModalVideo
        title="Storybook intro video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/p-LFh5Y89eM?autoplay=1&rel=0&amp;showinfo=0"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="chromatic-ignore"
      />
    </ModalVideoWrapper>
  </AspectRatio>
);

const Star = ({ x = 0, y = 0, w = 14, delay = 0 }) => {
  return (
    <StarStyled
      initial={{ x, y, opacity: 0, scale: 0.5 }}
      animate={{ rotate: 360, opacity: 1, scale: 1 }}
      transition={{ duration: 2, repeat: Infinity, delay }}
      style={{ originX: `${w / 2}px`, originY: `${w / 2}px` }}
      width={w}
      height={w}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L8.89064 5.10936L14 7L8.89064 8.89064L7 14L5.10936 8.89064L0 7L5.10936 5.10936L7 0Z"
        fill="url(#paint0_linear_195_11225)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_195_11225"
          x1="7"
          y1="0"
          x2="7"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </StarStyled>
  );
};

export function Hero({ contributorCount, npmDownloads, startOpen }) {
  const { latestVersion, urls = {} } = useSiteMetadata();
  const { docs = {}, gitHub = {}, npm } = urls;

  let npmDownloadsFixed = parseInt((npmDownloads / 1000).toFixed(0), 10);
  let npmDownloadsDisplay = `${npmDownloadsFixed}k`;
  if (npmDownloadsFixed >= 1000) {
    npmDownloadsFixed = (npmDownloadsFixed / 1000).toFixed(2);
    npmDownloadsDisplay = `${npmDownloadsFixed}m`;
  }

  return (
    <Wrapper>
      <Texture />
      <CirclePurple />
      <CircleOrange />
      <CircleBlue />
      <ContentContainer>
        <Title>Build UIs without the grunt work</Title>
        <Description>
          Storybook is a frontend workshop for building UI components and pages in isolation.
          Thousands of teams use it for UI development, testing, and documentation. It&apos;s open
          source and free.
        </Description>
        <Actions>
          <Left>
            <Buttons>
              <ButtonSolid to={docs}>Get Started</ButtonSolid>
              <WithModal
                startOpen={startOpen}
                modal={Modal}
                overlayStyles={{ backdropFilter: 'blur(10px)' }}
              >
                {({ onOpen }) => (
                  <ButtonVideo appearance="inverseOutline" onClick={onOpen}>
                    <Icon icon="play" aria-hidden /> Watch video
                  </ButtonVideo>
                )}
              </WithModal>
            </Buttons>
            <Stats>
              <HideDesktop>
                <StatHero href={gitHub.contributors} target="_blank">
                  v{latestVersion}
                  <span>Latest version</span>
                </StatHero>
              </HideDesktop>
              <StatHero href={npm} target="_blank">
                {npmDownloadsDisplay}
                <span>Installs per month</span>
              </StatHero>
              <StatHero href={gitHub.contributors} target="_blank">
                {contributorCount.toLocaleString()}+<span>Contributors</span>
              </StatHero>
            </Stats>
          </Left>
          <Right href={gitHub.releases} target="_blank" rel="noreferrer">
            Version
            <EightContainer>
              <img src="/images/home/eight.svg" alt="Storybook 8" />
              <Star x={-36} y={-10} delay={1} />
              <Star x={-16} y={-20} w={7} delay={0.2} />
              <Star x={24} y={-34} delay={2} />
              <Star x={52} y={28} w={7} delay={0.4} />
            </EightContainer>
          </Right>
        </Actions>
        <HeroDemo />
        <SocialProof />
      </ContentContainer>
    </Wrapper>
  );
}

Hero.propTypes = {
  startOpen: PropTypes.bool,
  npmDownloads: PropTypes.number.isRequired,
};

Hero.defaultProps = {
  startOpen: false,
};
