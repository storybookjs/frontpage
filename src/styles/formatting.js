import { css } from 'styled-components';
import { styles } from '@storybook/design-system';
import { darken } from 'polished';

const { color, typography } = styles;

export const mdFormatting = css`
  line-height: 28px;
  font-size: ${typography.size.s3}px;

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
  }

  hr {
    margin: 3em 0;
  }

  hr + * {
    margin-top: 0 !important;
  }

  h1 {
    font-size: ${typography.size.l1}px;
    font-weight: ${typography.weight.black};

    line-height: 36px;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: ${typography.size.m2}px;
    font-weight: ${typography.weight.extrabold};
    line-height: ${typography.size.m3}px;
    margin-bottom: 0.5em;
  }

  h2:not(:first-child) {
    margin-top: 2.5rem;
  }

  h3 {
    font-size: ${typography.size.m1}px;
    font-weight: ${typography.weight.black};
    line-height: 28px;
    margin: 2.5rem 0 0.5rem;
  }

  h4 {
    font-size: ${typography.size.s3}px;
    font-weight: ${typography.weight.extrabold};
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
      margin-bottom: 0.5em;
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
      color: ${darken(0.2, color.secondary)};
    }

    &:hover {
      transform: translate3d(0, -1px, 0);
    }

    &:active {
      transform: translate3d(0, 0, 0);
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
    padding-right: 10px;

    &:hover {
      transform: translate3d(-100%, calc(-50% - 1px), 0);

      path {
        fill: ${color.dark};
      }
    }

    path {
      fill: ${color.mediumdark};
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
    position: relative;
    margin: 0 auto;

    &.alignright {
      float: right;
      margin-right: 0;
    }

    &.alignleft {
      float: left;
      margin-left: 0;
    }

    &.aligncenter {
      display: block;
      margin-bottom: 1em;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1em;
    }
  }

  .aside {
    font-size: 87.5%;
    line-height: 1.43;
    color: ${color.dark};
    background: #f8fafc;
    border-radius: ${styles.spacing.borderRadius.small}px;
    padding: 1em;

    p:last-child {
      margin-bottom: 0;
    }
  }

  /* Tables based on GH markdown format */
  table {
    font-size: ${typography.size.s2}px;
    padding: 0;
    border-collapse: collapse;
    width: 100%;
    margin: 2em 0;
    overflow: auto;
  }
  table tr {
    border-top: 1px solid ${color.mediumlight};
    background-color: white;
    margin: 0;
    padding: 0;
  }
  table tr:nth-child(2n) {
    background-color: ${color.lighter};
  }
  table tr th {
    font-weight: bold;
    border: 1px solid ${color.medium};
    border-radius: 3px 3px 0 0;
    text-align: left;
    margin: 0;
    padding: 0.5em 0.75em;
  }
  table tr td {
    border: 1px solid #ddd;
    text-align: left;
    margin: 0;
    padding: 0.5em 1em;
  }

  table tr th :first-child,
  table tr td:first-child {
    margin-top: 0;
  }

  table tr th :last-child,
  table tr td:last-child {
    margin-bottom: 0;
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

  code {
    font-size: 87.5%;
    color: inherit;
  }

  pre {
    padding: 1em;
    font-size: inherit;
    padding: 1em;
    margin: 1.5em 0;
    background: ${color.lighter};

    code {
      padding: 0;
      line-height: 1.43; /* 14px/20px */
    }

    & + .aside {
      margin-top: -1.5rem;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  blockquote {
    font-size: ${typography.size.m1}px;
    color: ${color.mediumdark};
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
  }

  details > summary {
    display: inline-block;
    cursor: pointer;
    color: ${darken(0.2, color.secondary)};
  }

  details[open] > summary {
    margin-bottom: 1em;
  }

  details > summary::-webkit-details-marker {
    height: 10px;
    width: 10px;
  }
`;
