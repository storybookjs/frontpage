import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
`;

const Video = ({ src, shouldChangeSize, alt }) => {
  const videoSize = shouldChangeSize && window.innerWidth < 600 ? 'sm' : 'lg';
  const videoSrc = videoSize === 'sm' ? src.replace('lg', 'sm') : src;

  return (
    <StyledVideo autoPlay muted loop playsInline alt={alt}>
      <source src={videoSrc} type="video/mp4" />
    </StyledVideo>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  shouldChangeSize: PropTypes.bool,
  alt: PropTypes.string.isRequired,
};

Video.defaultProps = {
  shouldChangeSize: false
};

export default Video;
