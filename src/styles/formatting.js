import { styles } from '@storybook/design-system';
import { css } from '@storybook/theming';
import { color, fontWeight } from '@chromaui/tetra';
import { darken, rgba } from 'polished';

import { CODE_SNIPPET_CLASSNAME } from '../constants/code-snippets';
import { HEADER_HEIGHT } from '../constants/style';

const { color: dsColor, typography } = styles;

export const mdFormatting = css`
  line-height: 28px;
  font-size: ${typography.size.s3}px;

  *:target,
  [data-active-target] {
    scroll-margin-top: calc(${HEADER_HEIGHT} + 8px);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1em;

    & + * {
      margin-top: 0 !important;
    }

    .remark-header-link svg {
      opacity: 0;
      transition: opacity 250ms ease-out, visibility 0ms linear 250ms;
    }

    &:hover .remark-header-link svg {
      opacity: 1;
      transition: opacity 250ms ease-out;
    }

    &:target,
    &[data-active-target] {
      background: linear-gradient(
        90deg,
        ${rgba(dsColor.secondary, 0.1)} 0%,
        ${rgba(dsColor.secondary, 0.0)} 70%
      );
    }
  }

  hr {
    margin: 3em 0;
  }

  hr + * {
    margin-top: 0 !important;
  }

  h1 {
    font-size: ${typography.size.l1}px;
    font-weight: ${typography.weight.bold};

    line-height: 36px;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: ${typography.size.m2}px;
    font-weight: ${typography.weight.bold};
    line-height: ${typography.size.m3}px;
    margin-bottom: 0.5em;
  }

  h2:not(:first-child) {
    margin-top: 2.5rem;
  }

  h3 {
    font-size: ${typography.size.m1}px;
    font-weight: ${typography.weight.bold};
    line-height: 28px;
    margin: 2.5rem 0 0.5rem;
  }

  h4 {
    font-size: ${typography.size.s3}px;
    font-weight: ${typography.weight.bold};
    margin: 2rem 0 0.5rem;
  }

  h5 {
    font-size: ${typography.size.s2}px;
    font-weight: ${typography.weight.bold};
    margin: 2rem 0 0.5rem;
  }

  p {
    margin: 1.5em 0;
    position: relative;

    &:first-of-type:not(:only-of-type) {
      margin-top: 0;
    }
    &:only-of-type {
      margin: 0;
    }
  }

  ol,
  ul {
    list-style-position: outside;
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    padding-left: 30px;

    li {
      margin-bottom: 0.25em;
    }

    ul,
    ol {
      margin: 0.5em 0;
    }
  }

  ol {
    list-style-type: decimal;
  }
  ul {
    list-style-type: disc;
  }

  a:not(.remark-header-link) {
    transition: all 250ms ease-out;
    display: inline-block;
    text-decoration: none;
    transform: translate3d(0, 0, 0);

    &,
    &:hover,
    &:focus,
    &:hover:focus {
      color: ${darken(0.2, dsColor.secondary)};
    }

    &:hover {
      transform: translate3d(0, -1px, 0);
    }

    &:active {
      transform: translate3d(0, 0, 0);
    }

    code {
      color: inherit;
    }
  }

  .remark-header-link {
    display: inline-flex;
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    transition: transform 250ms ease-out;
    transform: translate3d(-100%, -50%, 0);
    padding-right: 5px;

    &:hover {
      transform: translate3d(-100%, calc(-50% - 1px), 0);

      path {
        fill: ${dsColor.dark};
      }
    }

    path {
      fill: ${dsColor.mediumdark};
      transition: fill 250ms ease-out;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  figure {
    clear: both;
    margin: 1em 0;

    figcaption {
      font-size: ${typography.size.s1}px;
    }
  }

  img {
    display: block;
    padding: 0;
    max-width: 100%;
  }

  .aside {
    font-size: 87.5%;
    line-height: 1.43;
    color: ${dsColor.dark};
    background: #f8fafc;
    border-radius: ${styles.spacing.borderRadius.small}px;
    padding: 1em;
    margin: 1.5em 0;

    p:last-child {
      margin-bottom: 0;
    }
  }

  /* Tables based on GH markdown format */
  table {
    font-size: ${typography.size.s2}px;
    border-collapse: collapse;
    width: 100%;
    margin: 2em 0;
    overflow: auto;
  }
  table tbody {
    vertical-align: top;
  }
  table tr {
    border-bottom: 1px solid ${color.slate300};
  }
  table tr th {
    font-weight: ${fontWeight.semibold};
    text-align: left;
    padding: 0.5em 0.75em 0.5em 0;
  }
  table tr td {
    padding: 0.5em 0.75em 0.5em 0;
  }

  iframe {
    border: none;
    width: 100% !important;
    max-width: none !important;
  }

  video {
    max-width: 100%;
    display: block;
    margin: 2em 0;
  }

  /* Pre and Code styles */

  .${CODE_SNIPPET_CLASSNAME} {
    margin: 1.5em 0;
  }

  code {
    font-size: 87.5%;
    color: ${dsColor.darkest};
  }

  pre {
    /* Reset styles from global */
    margin: 0;
    /* End resets */

    padding: 1em;
    font-size: inherit;
    color: ${dsColor.darkest};

    code {
      font-size: 13px;
      padding: 0;
      line-height: 1.43; /* 14px/20px */
      white-space: pre;
    }
  }

  blockquote {
    font-size: ${typography.size.m1}px;
    color: ${dsColor.mediumdark};
    line-height: 1.75;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }

  details {
    margin: 1.5em 0;

    h1,
    h2,
    h3,
    h4 {
      display: inline;
    }

    &:not([open]) + details {
      margin-top: -1em;
    }

    &:target {
      background: linear-gradient(
        90deg,
        ${rgba(dsColor.secondary, 0.1)} 0%,
        ${rgba(dsColor.secondary, 0.0)} 70%
      );
    }
  }

  details > summary {
    display: list-item;
    cursor: pointer;
    color: ${darken(0.2, dsColor.secondary)};
  }

  details[open] {
    position: relative;

    &:before {
      border-left: 1px solid ${dsColor.border};
      content: '';
      height: 100%;
      left: 4px;
      position: absolute;
      top: calc(28px + 1em);
      height: calc(100% - 2.4rem);
    }
    > summary {
      margin-bottom: 1em;
    }
    > summary ~ * {
      margin-left: 30px;
    }
  }

  details > summary::-webkit-details-marker {
    height: 10px;
    width: 10px;
  }
`;
