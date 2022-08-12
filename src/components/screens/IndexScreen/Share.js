import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, SectionLede, Testimonial } from '@storybook/components-marketing';
import GatsbyLinkWrapper from '../../basics/GatsbyLinkWrapper';
import AirBnBLogoSVG from '../../../images/logos/user/logo-airbnb.svg';

const { breakpoints, pageMargins } = styles;

const Wrapper = styled.section`
  padding-top: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: ${breakpoints[1]}px) {
    padding-top: 5rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 7rem;
  }
`;

export function Share({ docs, ...props }) {
  return (
    <Wrapper {...props}>
      <SectionLede
        inverse
        heading="Share how the UI actually works"
        copy="Stories show how UIs actually work not just a static design of how they're supposed to work. That keeps everyone aligned on what’s currently in production."
      />
      <Testimonial
        inverse
        text={
          <span>
            “The tool we use for editing UI is Storybook. It is the perfect place to make sure your
            work aligns with designs to the pixel across breakpoints.”
          </span>
        }
        avatarUrl="https://avatars2.githubusercontent.com/u/1247751?s=100&v=4"
        name="Adam Neary"
        jobTitle="Tech lead"
        logo={AirBnBLogoSVG}
      />
    </Wrapper>
  );
}

Share.propTypes = {
  docs: PropTypes.string.isRequired,
};
