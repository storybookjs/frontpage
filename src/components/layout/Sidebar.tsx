import React, { FC } from 'react';
import { Text, color, typography } from '@chromaui/tetra';
import { styled } from '@storybook/theming';

const DocsIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
    <path
      fill="#78CAFE"
      d="M8.25 2.596c-1.528-.892-3.513-1.388-5.918-1.47A2.258 2.258 0 0 0 0 3.377v9.77a2.234 2.234 0 0 0 2.166 2.247c2.288.075 4.191.581 5.66 1.508.133.083.275.15.424.202V2.596Z"
    />
    <path
      fill="#1EA7FD"
      d="M17.314 1.761a2.258 2.258 0 0 0-1.646-.635c-2.405.08-4.388.577-5.918 1.47v14.508c.149-.052.291-.12.426-.201 1.467-.928 3.37-1.435 5.658-1.51A2.234 2.234 0 0 0 18 13.148v-9.77a2.23 2.23 0 0 0-.686-1.616Z"
    />
  </svg>
);

const TutorialsIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
    <path
      fill="#FFCE66"
      stroke="#FFCE66"
      strokeWidth="1.6"
      d="m5.222 16.444 3.228-3.706-3.374-2.933-3.226 3.704a1.6 1.6 0 0 0 .157 2.258l.959.834a1.6 1.6 0 0 0 2.256-.157ZM12.794 16.44l-3.228-3.706 3.365-2.925 3.226 3.704A1.6 1.6 0 0 1 16 15.77l-.95.826a1.6 1.6 0 0 1-2.256-.157Z"
    />
    <circle cx="9" cy="7.001" r="7" fill="#FFAE00" />
    <path
      fill="#fff"
      d="M8.73 2.568a.3.3 0 0 1 .54 0l1.1 2.304a.3.3 0 0 0 .232.168l2.53.334a.3.3 0 0 1 .167.515l-1.85 1.757a.3.3 0 0 0-.09.272l.466 2.51a.3.3 0 0 1-.439.318L9.143 9.529a.3.3 0 0 0-.286 0l-2.243 1.217a.3.3 0 0 1-.438-.318l.464-2.51a.3.3 0 0 0-.088-.272L4.7 5.889a.3.3 0 0 1 .167-.515l2.53-.334a.3.3 0 0 0 .232-.168l1.1-2.304Z"
    />
  </svg>
);

const APIIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
    <rect width="18" height="16" y="1.001" fill="#A8E38C" rx="8" />
    <g fill="#489524">
      <path d="M7.348 12.345a.52.52 0 0 0 0-.73l-2.606-2.63 2.606-2.628a.521.521 0 0 0-.37-.856.511.511 0 0 0-.355.125l-2.97 2.991a.519.519 0 0 0 0 .737l2.97 2.991a.514.514 0 0 0 .365.156.512.512 0 0 0 .36-.156ZM11.011 12.5a.512.512 0 0 1-.474-.321.523.523 0 0 1 .114-.565l2.607-2.629-2.607-2.628a.521.521 0 0 1 .37-.856c.13-.005.257.04.355.125l2.971 2.991a.52.52 0 0 1 0 .737l-2.971 2.991a.515.515 0 0 1-.365.156Z" />
    </g>
  </svg>
);

const SidebarContainer = styled.div`
  /* background-color: rgba(255, 0, 0, 0.1); */
`;

const TopNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
`;

const Line = styled.li`
  display: flex;

  a {
    display: flex;
    gap: 14px;
    text-decoration: none;
    ${typography.body14}
    color: ${color.black};
    transition: color 0.1s ease-in-out;
  }

  &:hover a {
    color: ${color.blue500};
  }
`;

export const Sidebar: FC = () => {
  return (
    <SidebarContainer>
      <nav>
        <TopNav>
          <Line>
            <a href="/">
              <DocsIcon />
              Documentation
            </a>
          </Line>
          <Line>
            <a href="/">
              <TutorialsIcon />
              Tutorials
            </a>
          </Line>
          <Line>
            <a href="/">
              <APIIcon />
              API
            </a>
          </Line>
        </TopNav>
      </nav>
    </SidebarContainer>
  );
};
