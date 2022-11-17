import React from 'react';
import { styled } from '@storybook/theming';
import { AspectRatio, styles } from '@storybook/components-marketing';
import { Icon } from '@storybook/design-system';

const { breakpoints } = styles;

const ConnectorSVG = styled.svg`
  margin-left: -1px;
  margin-right: 3px;
  z-index: 1;
`;
const Connector = () => (
  <ConnectorSVG
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="8"
    fill="none"
    viewBox="0 0 17 8"
  >
    <g clipPath="url(#clip0_7043_99629)">
      <path
        fill="#FF4785"
        d="M16.354 4.354a.5.5 0 000-.708L13.172.464a.5.5 0 10-.708.708L15.293 4l-2.829 2.828a.5.5 0 10.708.708l3.182-3.182zM0 4.5h16v-1H0v1z"
      />
    </g>
    <defs>
      <clipPath id="clip0_7043_99629">
        <path fill="#fff" d="M0 0H17V8H0z" />
      </clipPath>
    </defs>
  </ConnectorSVG>
);

const Circle = styled.div`
  width: 9px;
  height: 9px;
  border: 2px solid #fff;
  background: #ff4785;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);

  @media (min-width: ${breakpoints[1]}px) {
    width: 10px;
    height: 10px;
  }
`;

const Container = styled.figure`
  height: 64px;
  display: flex;
  align-items: center;
  margin: 0;
`;

const IntegrationIcon = styled.div<{ image: string }>`
  width: 44px;
  height: 44px;
  /* prettier-ignore */
  background-image: url("${(props) => props.image}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Integration = styled(AspectRatio)<{ accent: string; icon: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.accent};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.12);

  img,
  svg,
  ${IntegrationIcon} {
    width: 27.5px;
    height: 27.5px;
    color: white;
  }

  @media (min-width: ${breakpoints[1]}px) {
    width: 64px;
    height: 64px;

    img,
    svg,
    ${IntegrationIcon} {
      width: 44px;
      height: 44px;
    }
  }
`;

const Title = styled.figcaption`
  position: fixed !important;
  clip: rect(1px, 1px, 1px, 1px);
`;

interface IntegrationImageProps {
  name: string;
  accent: string;
  icon: string;
  withConnector?: boolean;
}

export const IntegrationImage = ({ name, accent, icon, withConnector }: IntegrationImageProps) => {
  return (
    <Container>
      {withConnector && (
        <>
          <Integration ratio="1/1" accent="#FF4785" icon={icon}>
            <Icon icon="storybook" />
            <Circle />
          </Integration>
          <Connector />
        </>
      )}
      <Integration ratio="1/1" accent={accent} icon={icon}>
        <IntegrationIcon image={icon} />
      </Integration>
      <Title>{name}</Title>
    </Container>
  );
};
