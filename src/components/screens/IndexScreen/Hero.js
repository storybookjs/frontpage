import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Button, Icon, WithModal, Cardinal } from '@storybook/design-system';
import { styles, SectionLede } from '@storybook/components-marketing';
import SocialProof from '../../layout/SocialProof';
import mockUI from './storybook-mock-ui.svg';
import { NpmDownloadCount } from '../../layout/NpmDownloadCount';
import { Stat } from '../../basics/Stat';
import useSiteMetadata from '../../lib/useSiteMetadata';
import PlaceholderAspectRatio from '../../layout/PlaceholderAspectRatio';

const { color, breakpoints, pageMargins } = styles;

const ModalVideo = styled.iframe`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalVideoWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
  border-radius: 10px;
  overflow: hidden;
  background: ${color.lightest};
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
  background-image: url('images/home/gradient-backdrop.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PageLedeContainer = styled.div`
  padding-bottom: 3rem;
  padding-top: 3rem;

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5.625rem;
    padding-bottom: 17.625rem;
  }
`;

const StorybookDemo = styled.div`
  ${pageMargins};
  padding-top: 3rem;

  img {
    display: block;
    filter: drop-shadow(0px 0.882px 2.646px rgba(0, 0, 0, 0.1))
      drop-shadow(0px 8.819px 17.637px rgba(0, 0, 0, 0.1))
      drop-shadow(0px 17.637px 35.274px rgba(0, 0, 0, 0.05))
      drop-shadow(0px 35.274px 26.456px rgba(0, 0, 0, 0.05));
  }

  @media (min-width: ${breakpoints[1]}px) {
    img {
      margin-top: -12.625rem;
    }
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

export function Hero({ npmDownloads, startOpen, ...props }) {
  const { latestVersion, urls = {}, contributorCount } = useSiteMetadata();
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
              <Button appearance="secondary" isLink href={docs}>
                Get started
              </Button>
              <WithModal startOpen={startOpen} modal={Modal}>
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
                count={`${contributorCount}+`}
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
          <img src={mockUI} alt="" style={{ width: '100%' }} />
        </StorybookDemo>

        <SocialProof
          path="images/logos/user"
          brands={['vscode', 'govuk', 'eu', 'github', 'airbnb', 'mozilla', 'bbc']}
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
