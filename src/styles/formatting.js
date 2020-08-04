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

  h2 {
    margin-bottom: 24px;
    color: ${color.dark};
    font-size: ${typography.size.m1}px;
    letter-spacing: -0.31px;
    line-height: 26px;
  }

  h3 {
    color: ${color.darkest};
    font-size: ${typography.size.m1}px;
    letter-spacing: -0.4px;
    line-height: 28px;
    font-weight: ${typography.weight.black};
    margin-bottom: 9px;
  }

  h4 {
    color: ${color.mediumdark};
    font-size: ${typography.size.s1}px;
    font-weight: ${typography.weight.extrabold};
    letter-spacing: 5.14px;
    line-height: 20px;
    text-transform: uppercase;
    margin-bottom: 8px;
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
    margin-bottom: 1em;
    margin-top: 1em;
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
    color: ${color.secondary};
    transition: all 250ms ease-out;
    display: inline-block;
    text-decoration: none;
    transform: translate3d(0, 0, 0);

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
    top: 3px;
    left: 0;
    display: flex;
    transition: transform 250ms ease-out;
    transform: translate3d(-100%, 0, 0);
    padding-right: 10px;

    &:hover {
      transform: translate3d(-100%, -1px, 0);

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
    font-size: ${typography.size.s3}px;
    color: ${color.darker};
    background: #f8fafc;
    border-radius: ${styles.spacing.borderRadius.small}px;
    padding: 20px;

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
    display: block;
    overflow: scroll;
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

  ${'' /* Tweak Prism styling */};
  *:not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${color.lighter};
    margin: 2em 0;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-size: ${typography.size.s2}px;
    line-height: ${typography.size.m1}px;
  }

  code {
    font-size: ${typography.size.s3 - 2}px;
  }

  .aside code {
    font-size: ${typography.size.s3 - 2}px;
  }

  blockquote {
    font-size: ${typography.size.m1}px;
    color: ${color.mediumdark};
    line-height: 1.75;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
  }
`;
