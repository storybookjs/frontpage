import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Button, Icon, WithModal } from '@storybook/design-system';
import { styles, SectionLede } from '@storybook/components-marketing';
import { Link as GatsbyLink } from 'gatsby';
import SocialProof from '../../layout/SocialProof';
import { NpmDownloadCount } from '../../layout/NpmDownloadCount';
import { Stat } from '../../basics/Stat';
import useSiteMetadata from '../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import { HeroDemo } from './StorybookDemo/HeroDemo';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';

const { color, breakpoints, pageMargins } = styles;

const ContentContainer = styled.div`
  ${pageMargins};
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

const Wrapper = styled.div``;

const Content = styled.section`
  background-image: url('/images/home/gradient-backdrop.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PageLedeContainer = styled.div`
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

const StorybookDemo = styled.figure`
  ${pageMargins};

  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0; //reset user agent figure
  margin-bottom: 0; //reset user agent figure
  padding-top: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    width: auto;
  }
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

const Stats = styled.div`
  display: flex;
  gap: 40px;
`;

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
    <Wrapper {...props}>
      <PageLedeContainer>
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
        </ContentContainer>
      </PageLedeContainer>
      <Content>
        <StorybookDemo>
          <HeroDemo />
        </StorybookDemo>

        <SocialProof
          path="/images/logos/user"
          brands={['vscode', 'monday', 'eu', 'github', 'airbnb', 'mozilla', 'bbc']}
          monochrome
        />
      </Content>
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
