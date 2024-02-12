import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Icon, WithModal } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import { Link as GatsbyLink } from 'gatsby';
import SocialProof from '../../layout/SocialProof';
import useSiteMetadata from '../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import { HeroDemo } from './StorybookDemo/HeroDemo';

const { color, breakpoints, pageMargins } = styles;

const Wrapper = styled.div``;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;

  ${pageMargins};

  padding-bottom: 3rem;
  padding-top: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 4rem;
    padding-bottom: 13rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 6rem;
    padding-bottom: 15rem;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 70px;
  letter-spacing: -0.01em;
  text-align: left;
  color: white;
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
  justify-content: space-between;
  margin-bottom: 64px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
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
    color: #b7aeef;
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

export function Hero({ contributorCount, npmDownloads, startOpen, ...props }) {
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
            <StatHero href={npm} target="_blank">
              {npmDownloadsDisplay}
              <span>Installs per month</span>
            </StatHero>
            <StatHero href={gitHub.contributors} target="_blank">
              {contributorCount.toLocaleString()}+<span>Contributors</span>
            </StatHero>
          </Left>
          <a href={gitHub.releases} target="_blank" rel="noreferrer">
            v8
          </a>
        </Actions>
        <HeroDemo />
        <SocialProof
          path="/images/logos/user"
          brands={['vscode', 'monday', 'eu', 'github', 'airbnb', 'mozilla', 'bbc']}
          monochrome
        />
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
