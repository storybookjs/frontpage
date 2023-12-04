import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Button, Icon, WithModal } from '@storybook/design-system';
import { styles, SectionLede } from '@storybook/components-marketing';
import SocialProof from '../../layout/SocialProof';
import { NpmDownloadCount } from '../../layout/NpmDownloadCount';
import { Stat } from '../../basics/Stat';
import useSiteMetadata from '../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';
import { HeroDemo } from './StorybookDemo/HeroDemo';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';

const { color, breakpoints, pageMargins } = styles;

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
  const { docs = {}, gitHub = {} } = urls;

  return (
    <Wrapper {...props}>
      <PageLedeContainer>
        <SectionLede
          inverse
          heading="Build UIs without the grunt work"
          headingWrapper="h1"
          copy="Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It’s open source and free."
          actions={
            <>
              <Button appearance="secondary" isLink href={docs} ButtonWrapper={GatsbyLinkWrapper}>
                Get started
              </Button>
              <WithModal
                startOpen={startOpen}
                modal={Modal}
                overlayStyles={{ backdropFilter: 'blur(10px)' }}
              >
                {({ onOpen }) => (
                  <Button appearance="inverseOutline" onClick={onOpen}>
                    <Icon icon="play" aria-hidden /> Watch video
                  </Button>
                )}
              </WithModal>
            </>
          }
          meta={
            <Stats>
              <Stat
                count={`v${latestVersion}`}
                text="Latest version"
                countLink={gitHub.releases}
                noPlural
              />
              <NpmDownloadCount downloads={npmDownloads} />
              <Stat
                count={`${contributorCount.toLocaleString()}+`}
                text="Contributors"
                countLink={gitHub.contributors}
                noPlural
              />
            </Stats>
          }
        />
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
