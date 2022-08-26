import React from 'react';
import { styled } from '@storybook/theming';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { AddonsPanel } from './AddonsPanel';

const SVG = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`;

const opacity = {
  defaultStory: [1, 0, 0, 1],
  noSelectionStory: [0, 1, 0, 0],
  inputRangeStory: [0, 0, 1, 0],
};

export const StorybookDemo = ({ activeStory, ...props }) => {
  const defaultStoryOpacity = useTransform(activeStory, (value) => opacity.defaultStory[value]);
  const noSelectionStoryOpacity = useTransform(
    activeStory,
    (value) => opacity.noSelectionStory[value]
  );
  const inputRangeStoryOpacity = useTransform(
    activeStory,
    (value) => opacity.inputRangeStory[value]
  );

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="1281"
      height="920"
      fill="none"
      viewBox="0 0 1281 920"
      {...props}
    >
      <g filter="url(#filter0_dddd_3666_63519)">
        <g clipPath="url(#clip0_3666_63519)">
          <rect width="1201" height="830" x="40" y="20" fill="#fff" fillOpacity="0.8" rx="8" />
          <g>
            <g clipPath="url(#clip1_3666_63519)">
              <path
                fill="#333"
                d="M123.59 31.84c.17.17.17.44 0 .6l-3.13 3.13h10.11a.43.43 0 110 .86h-10.1l3.12 3.12a.43.43 0 01-.6.61l-3.86-3.86a.43.43 0 010-.6l3.85-3.86a.43.43 0 01.6 0z"
              />
            </g>
            <g clipPath="url(#clip2_3666_63519)">
              <path
                fill="#333"
                d="M148.41 31.84a.43.43 0 01.6 0l3.86 3.86c.17.16.17.44 0 .6l-3.85 3.86a.43.43 0 01-.6-.6l3.12-3.13h-10.11a.43.43 0 110-.86h10.1l-3.12-3.12a.43.43 0 010-.61z"
              />
            </g>
            <g>
              <path
                fill="#333"
                d="M169.08 30.43H169a5.57 5.57 0 105.5 6.5.43.43 0 10-.85-.14 4.7 4.7 0 11-4.65-5.5 4.71 4.71 0 014.2 2.57h-1.63a.43.43 0 100 .85h2.57c.24 0 .43-.19.43-.42V31.7a.43.43 0 00-.86 0v1.32a5.57 5.57 0 00-4.63-2.6z"
              />
            </g>
          </g>
          <circle cx="58" cy="36" r="5" fill="#FC521F" />
          <circle cx="76" cy="36" r="5" fill="#FFAE00" />
          <circle cx="94" cy="36" r="5" fill="#66BF3C" />
          <path fill="#E1E5E8" d="M41 51h1199v1H41z" />
          <g>
            <rect width="194" height="20" x="543.5" y="26" fill="#000" fillOpacity="0.1" rx="5" />
            <g clipPath="url(#clip3_3666_63519)">
              <g fill="#333">
                <path d="M599.21 36.72c0 .26-.14.5-.35.62v1.16a.36.36 0 01-.72 0v-1.16a.71.71 0 111.07-.62z" />
                <path
                  fillRule="evenodd"
                  d="M595.64 33.86a2.86 2.86 0 115.72 0v.71h1.07c.2 0 .36.16.36.36v5.72c0 .2-.16.35-.36.35h-7.86a.36.36 0 01-.36-.35v-5.72c0-.2.16-.36.36-.36h1.07v-.71zm5 .71v-.71a2.14 2.14 0 10-4.28 0v.71h4.28zm1.43.72h-7.14v5h7.14v-5z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#000"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="12"
              letterSpacing="0em"
            >
              <tspan x="609.5" y="39.95">
                chromatic.com
              </tspan>
            </text>
          </g>
          <g clipPath="url(#clip4_3666_63519)">
            <path fill="#F6F9FC" d="M0 0h1200v800H0z" transform="translate(41 52)" />
            <Sidebar
              rpDefaultOpacity={defaultStoryOpacity}
              rpNoSelectionOpacity={noSelectionStoryOpacity}
              rpInputRangeOpacity={inputRangeStoryOpacity}
              tfOverviewOpacity={0}
              tfNoSelectionOpacity={0}
              tfAfternoonOpacity={0}
              tfAllDayOpacity={0}
            />
            <g filter="url(#filter1_d_3666_63519)">
              <path fill="#fff" d="M291 57a5 5 0 015-5h945v800H296a5 5 0 01-5-5V57z" />
              <g>
                <mask
                  id="path-118-outside-1_3666_63519"
                  width="949"
                  height="41"
                  x="291"
                  y="52"
                  fill="#000"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#fff" d="M291 52h949v41H291z" />
                  <path d="M291 52h949v40H291V52z" />
                </mask>
                <path fill="#fff" d="M291 52h949v40H291V52z" />
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          fill="#7A858E"
                          d="M313.5 66a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h1.54a6.5 6.5 0 002.38 11.91.5.5 0 00.16-.99 5.5 5.5 0 01-1.58-10.32V69a.5.5 0 001 0v-3zm2 0a.5.5 0 01.58-.41 6.5 6.5 0 012.39 11.91H320a.5.5 0 010 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 011 0v1.9a5.5 5.5 0 00-1.58-10.32.5.5 0 01-.41-.58z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <g fill="#7A858E">
                          <path d="M346 68.5c.28 0 .5.22.5.5v1.5h1.5a.5.5 0 010 1h-1.5V73a.5.5 0 01-1 0v-1.5H344a.5.5 0 010-1h1.5V69c0-.28.22-.5.5-.5z" />
                          <path
                            fillRule="evenodd"
                            d="M349.54 75.2a5.5 5.5 0 11.66-.66c.06.03.11.06.15.1l3 3a.5.5 0 01-.7.71l-3-3a.5.5 0 01-.1-.14zm.96-4.2a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                    <g>
                      <g>
                        <g fill="#7A858E">
                          <path d="M376 70.5a.5.5 0 000 1h4a.5.5 0 000-1h-4z" />
                          <path
                            fillRule="evenodd"
                            d="M378 76.5c1.35 0 2.59-.49 3.54-1.3.03.06.06.11.1.15l3 3a.5.5 0 00.71-.7l-3-3a.51.51 0 00-.14-.1 5.5 5.5 0 10-4.2 1.96zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          fill="#7A858E"
                          d="M405.5 67.84V66.5a.5.5 0 00-1 0V69c0 .28.22.5.5.5h2.5a.5.5 0 000-1h-1.24a4.5 4.5 0 11-.5 4.02.5.5 0 10-.94.33 5.5 5.5 0 008.72 2.36l.1.14 3 3a.5.5 0 00.71-.7l-3-3a.51.51 0 00-.14-.1 5.5 5.5 0 10-8.7-6.7z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <g fill="#7A858E">
                          <path d="M437.5 66a.5.5 0 000 1H448v10.5a.5.5 0 001 0V67a1 1 0 00-1-1h-10.5z" />
                          <path d="M437 68.5c0-.27.22-.5.5-.5h8.5a1 1 0 011 1v8.5a.5.5 0 01-1 0V69h-8.5a.5.5 0 01-.5-.5z" />
                          <path
                            fillRule="evenodd"
                            d="M437.5 70a.5.5 0 00-.5.5v7c0 .28.22.5.5.5h7a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5h-7zm.5 1v6h6v-6h-6z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <path fill="#E1E5E8" d="M467 60h1v24h-1z" />
                  <g>
                    <g>
                      <g>
                        <g fill="#7A858E">
                          <path d="M486.5 66c.28 0 .5.23.5.5v.5h10v-.5a.5.5 0 011 0v2a.5.5 0 01-1 0V68h-10v.5a.5.5 0 01-1 0v-2c0-.27.22-.5.5-.5z" />
                          <path
                            fillRule="evenodd"
                            d="M497.5 71c.28 0 .5.23.5.5v5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-5c0-.27.22-.5.5-.5h11zM487 72v4h10v-4h-1v2a.5.5 0 01-1 0v-2h-.75v.5a.5.5 0 01-1 0V72h-.75v2a.5.5 0 01-1 0v-2h-.75v.5a.5.5 0 01-1 0V72H489v2a.5.5 0 01-1 0v-2h-1z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          fill="#7A858E"
                          fillRule="evenodd"
                          d="M518 66.5c0-.27.22-.5.5-.5h4.5c.28 0 .5.23.5.5V71a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4.5zm1 4V67h3.5v3.5H519zm5.5-4c0-.27.22-.5.5-.5h4.5c.28 0 .5.23.5.5V71a.5.5 0 01-.5.5H525a.5.5 0 01-.5-.5v-4.5zm1 4V67h3.5v3.5h-3.5zm-7 2a.5.5 0 00-.5.5v4.5c0 .28.22.5.5.5h4.5a.5.5 0 00.5-.5V73a.5.5 0 00-.5-.5h-4.5zm.5 1V77h3.5v-3.5H519zm5.5-.5c0-.27.22-.5.5-.5h4.5c.28 0 .5.23.5.5v4.5a.5.5 0 01-.5.5H525a.5.5 0 01-.5-.5V73zm1 4v-3.5h3.5V77h-3.5z"
                          clipRule="evenodd"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          fill="#7A858E"
                          d="M551 67v2h-1v-2.5c0-.27.22-.5.5-.5h2.5v1h-2zm-1 7v-4h1v4h-1zm0 1v2.5c0 .28.22.5.5.5h2.5v-1h-2v-2h-1zm9 3h2.5a.5.5 0 00.5-.5V75h-1v2h-2v1zm2-9h1v-2.5a.5.5 0 00-.5-.5H559v1h2v2zm-3 8v1h-4v-1h4zm0-11v1h-4v-1h4zm4 8h-1v-4h1v4zm-6-1a1 1 0 100-2 1 1 0 000 2z"
                        />
                      </g>
                    </g>
                  </g>
                  <path fill="#E1E5E8" d="M580 60h1v24h-1z" />
                  <g>
                    <g>
                      <g>
                        <g fill="#7A858E">
                          <path d="M601.53 69.84a.5.5 0 01.63-.31l2.05.68a2.5 2.5 0 001.58 0l2.05-.68a.5.5 0 11.32.94l-2.45.82a.3.3 0 00-.21.29v.24c0 .7.16 1.39.48 2.01l.97 1.95a.5.5 0 11-.9.44l-1.05-2.1-1.05 2.1a.5.5 0 11-.9-.44l.98-1.95a4.5 4.5 0 00.47-2.01v-.24a.3.3 0 00-.2-.29l-2.46-.82a.5.5 0 01-.31-.63z" />
                          <path d="M605 69.5a1 1 0 100-2 1 1 0 000 2z" />
                          <path
                            fillRule="evenodd"
                            d="M605 79a7 7 0 100-14 7 7 0 000 14zm0-1a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                    <g>
                      <g>
                        <g fill="#7A858E" fillRule="evenodd" clipRule="evenodd">
                          <path d="M636.25 69.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm-.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                          <path d="M643 66.5v11a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5zm-11 7.8V67h10v5.3l-2.15-2.15a.5.5 0 00-.7 0l-2.65 2.65-1.15-1.15a.5.5 0 00-.7 0L632 74.3zm7.5-3.09l2.5 2.5v3.3h-10v-1.3l3-3 3.15 3.15a.5.5 0 00.7-.71l-1.64-1.65 2.29-2.29z" />
                        </g>
                      </g>
                    </g>
                    <g>
                      <g clipPath="url(#clip6_3666_63519)">
                        <path
                          fill="#7A858E"
                          fillRule="evenodd"
                          d="M665 68h-2.5a.5.5 0 00-.5.5v10c0 .28.22.5.5.5h10a.5.5 0 00.5-.5V76h2.5a.5.5 0 00.5-.5v-10a.5.5 0 00-.5-.5h-10a.5.5 0 00-.5.5V68zm1 1v2.3l2.3-2.3H666zm-1 0v6.5a.49.49 0 00.15.36c.1.1.22.14.35.14h6.5v2h-9v-9h2zm1-1h6.5a.5.5 0 01.5.48V75h2v-9h-9v2zm6 7v-2.29l-2.3 2.3h2.3zm0-3.7v-1.6l-5.3 5.3h1.6l3.7-3.71zm-.7-2.3h-1.6l-3.7 3.71v1.59l5.3-5.3z"
                          clipRule="evenodd"
                        />
                      </g>
                    </g>
                    <g>
                      <g clipPath="url(#clip7_3666_63519)">
                        <g fill="#7A858E">
                          <path d="M702.5 72a.5.5 0 000-1h-5a.5.5 0 000 1h5zm.5 1.5a.5.5 0 01-.5.5h-5a.5.5 0 010-1h5c.28 0 .5.23.5.5z" />
                          <path
                            fillRule="evenodd"
                            d="M706 76.5V75h1.5a.5.5 0 00.5-.5v-8a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5V68h-1.5a.5.5 0 00-.5.5v8c0 .28.22.5.5.5h1.5v1.5a.49.49 0 00.15.36c.1.1.22.14.35.14a.5.5 0 00.35-.14l1.86-1.86h6.79a.5.5 0 00.5-.5zm-9-8.5v-1h10v7h-1v-5.5a.5.5 0 00-.5-.5H697zm-2 8v-7h10v7h-10z"
                            clipRule="evenodd"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g>
                  <g>
                    <g>
                      <g fill="#7A858E">
                        <path d="M1211 66a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4.5a.5.5 0 00-.5-.5.5.5 0 00-.5.5V77h-10V67h4.5a.5.5 0 00.5-.5.5.5 0 00-.5-.5h-4.5z" />
                        <path d="M1216.35 72.36l4.65-4.65v1.8c0 .27.22.5.5.5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5c0 .27.22.5.5.5h1.79l-4.64 4.64a.5.5 0 000 .7c.19.2.51.2.7 0z" />
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  fill="#E1E5E8"
                  d="M1240 91H291v2h949v-2z"
                  mask="url(#path-118-outside-1_3666_63519)"
                />
              </g>
              <AddonsPanel />
              <path
                stroke="#E5E5E5"
                d="M296 52.5h944.5v799H296a4.5 4.5 0 01-4.5-4.5V57a4.5 4.5 0 014.5-4.5z"
              />
            </g>
          </g>
        </g>
        <rect
          width="1200"
          height="829"
          x="40.5"
          y="20.5"
          stroke="#000"
          strokeOpacity="0.1"
          rx="7.5"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3666_63519"
          x1="765"
          x2="765"
          y1="583"
          y2="679.04"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E7FBFB" />
          <stop offset="1" stopColor="#F4F8FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3666_63519"
          x1="-1.32"
          x2="-1.29"
          y1="0.54"
          y2="5.15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3666_63519"
          x1="-1.32"
          x2="-1.17"
          y1="1.22"
          y2="11.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3666_63519"
          x1="-1.32"
          x2="-1.22"
          y1="0.98"
          y2="9.26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_3666_63519"
          x1="-1.32"
          x2="-0.99"
          y1="1.84"
          y2="17.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_3666_63519"
          x1="-1.32"
          x2="-1.17"
          y1="1.22"
          y2="11.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_3666_63519"
          x1="-1.32"
          x2="-1.2"
          y1="1.1"
          y2="10.42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_3666_63519"
          x1="-1.32"
          x2="-0.85"
          y1="2.2"
          y2="20.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_3666_63519"
          x1="-1.32"
          x2="-0.62"
          y1="2.69"
          y2="25.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_3666_63519"
          x1="-1.32"
          x2="0.75"
          y1="4.65"
          y2="43.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_3666_63519"
          x1="-1.32"
          x2="2.26"
          y1="6.12"
          y2="57.66"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_3666_63519"
          x1="-1.32"
          x2="3.82"
          y1="7.34"
          y2="69.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_3666_63519"
          x1="-1.32"
          x2="0.34"
          y1="4.16"
          y2="39.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_3666_63519"
          x1="-1.32"
          x2="-0.85"
          y1="2.2"
          y2="20.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_3666_63519"
          x1="-1.32"
          x2="-0.62"
          y1="2.69"
          y2="25.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_3666_63519"
          x1="-1.28"
          x2="-1.06"
          y1="1.46"
          y2="13.84"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_3666_63519"
          x1="-1.36"
          x2="-1.05"
          y1="1.81"
          y2="17.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
        <clipPath id="clip0_3666_63519">
          <rect width="1201" height="830" x="40" y="20" fill="#fff" rx="8" />
        </clipPath>
        <clipPath id="clip1_3666_63519">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(119 30)" />
        </clipPath>
        <clipPath id="clip2_3666_63519">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(141 30)" />
        </clipPath>
        <clipPath id="clip3_3666_63519">
          <path fill="#fff" d="M0 0h10v10H0z" transform="translate(593.5 31)" />
        </clipPath>
        <clipPath id="clip4_3666_63519">
          <path fill="#fff" d="M0 0h1200v800H0z" transform="translate(41 52)" />
        </clipPath>
        <clipPath id="clip5_3666_63519">
          <path fill="#fff" d="M0 0h8v8H0z" transform="translate(263 265)" />
        </clipPath>
        <clipPath id="clip6_3666_63519">
          <path fill="#fff" d="M0 0h14v14H0z" transform="translate(662 65)" />
        </clipPath>
        <clipPath id="clip7_3666_63519">
          <path fill="#fff" d="M0 0h14v14H0z" transform="translate(694 65)" />
        </clipPath>
        <clipPath id="clip8_3666_63519">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 585)" />
        </clipPath>
        <clipPath id="clip9_3666_63519">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 626)" />
        </clipPath>
        <clipPath id="clip10_3666_63519">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 667)" />
        </clipPath>
        <filter
          id="filter0_dddd_3666_63519"
          width="1281"
          height="920"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="effect1_dropShadow_3666_63519" result="effect2_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="20" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect2_dropShadow_3666_63519" result="effect3_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="40" />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect3_dropShadow_3666_63519" result="effect4_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect4_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="filter1_d_3666_63519"
          width="956"
          height="806"
          x="288"
          y="50"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="filter2_dd_3666_63519"
          width="226.34"
          height="185.35"
          x="651.83"
          y="576.88"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3.06" />
          <feGaussianBlur stdDeviation="4.59" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect1_dropShadow_3666_63519" result="effect2_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="filter3_d_3666_63519"
          width="14.07"
          height="14.07"
          x="821.58"
          y="673.23"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="filter4_d_3666_63519"
          width="14.07"
          height="14.07"
          x="672.32"
          y="673.23"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
      </defs>
      <defs>
        <linearGradient
          id="p"
          x1="765"
          x2="765"
          y1="583"
          y2="679.04"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E7FBFB" />
          <stop offset="1" stopColor="#F4F8FA" />
        </linearGradient>
        <linearGradient
          id="q"
          x1="-1.32"
          x2="-1.29"
          y1="0.54"
          y2="5.15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="r"
          x1="-1.32"
          x2="-1.17"
          y1="1.22"
          y2="11.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="s"
          x1="-1.32"
          x2="-1.22"
          y1="0.98"
          y2="9.26"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="t"
          x1="-1.32"
          x2="-0.99"
          y1="1.84"
          y2="17.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="u"
          x1="-1.32"
          x2="-1.17"
          y1="1.22"
          y2="11.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="v"
          x1="-1.32"
          x2="-1.2"
          y1="1.1"
          y2="10.42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="w"
          x1="-1.32"
          x2="-0.85"
          y1="2.2"
          y2="20.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="x"
          x1="-1.32"
          x2="-0.62"
          y1="2.69"
          y2="25.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="y"
          x1="-1.32"
          x2="0.75"
          y1="4.65"
          y2="43.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="z"
          x1="-1.32"
          x2="2.26"
          y1="6.12"
          y2="57.66"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="A"
          x1="-1.32"
          x2="3.82"
          y1="7.34"
          y2="69.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="B"
          x1="-1.32"
          x2="0.34"
          y1="4.16"
          y2="39.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="C"
          x1="-1.32"
          x2="-0.85"
          y1="2.2"
          y2="20.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="D"
          x1="-1.32"
          x2="-0.62"
          y1="2.69"
          y2="25.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA8961" />
          <stop offset="1" stopColor="#FFBD58" />
        </linearGradient>
        <linearGradient
          id="E"
          x1="-1.28"
          x2="-1.06"
          y1="1.46"
          y2="13.84"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
        <linearGradient
          id="F"
          x1="-1.36"
          x2="-1.05"
          y1="1.81"
          y2="17.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
        <clipPath id="b">
          <rect width="1201" height="830" x="40" y="20" fill="#fff" rx="8" />
        </clipPath>
        <clipPath id="c">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(119 30)" />
        </clipPath>
        <clipPath id="d">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(141 30)" />
        </clipPath>
        <clipPath id="e">
          <path fill="#fff" d="M0 0h10v10H0z" transform="translate(593.5 31)" />
        </clipPath>
        <clipPath id="f">
          <path fill="#fff" d="M0 0h1200v800H0z" transform="translate(41 52)" />
        </clipPath>
        <clipPath id="g">
          <path fill="#fff" d="M0 0h8v8H0z" transform="translate(263 265)" />
        </clipPath>
        <clipPath id="i">
          <path fill="#fff" d="M0 0h14v14H0z" transform="translate(662 65)" />
        </clipPath>
        <clipPath id="j">
          <path fill="#fff" d="M0 0h14v14H0z" transform="translate(694 65)" />
        </clipPath>
        <clipPath id="K">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 585)" />
        </clipPath>
        <clipPath id="L">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 626)" />
        </clipPath>
        <clipPath id="M">
          <path fill="#fff" d="M0 0h12v12H0z" transform="translate(307 667)" />
        </clipPath>
        <filter
          id="a"
          width="1281"
          height="920"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="effect1_dropShadow_3666_63519" result="effect2_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="20" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect2_dropShadow_3666_63519" result="effect3_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="40" />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect3_dropShadow_3666_63519" result="effect4_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect4_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="h"
          width="956"
          height="806"
          x="288"
          y="50"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="o"
          width="226.34"
          height="185.35"
          x="651.83"
          y="576.88"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3.06" />
          <feGaussianBlur stdDeviation="4.59" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect1_dropShadow_3666_63519" result="effect2_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="G"
          width="14.07"
          height="14.07"
          x="821.58"
          y="673.23"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
        <filter
          id="H"
          width="14.07"
          height="14.07"
          x="672.32"
          y="673.23"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.61" />
          <feGaussianBlur stdDeviation="0.92" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_3666_63519" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_3666_63519" result="shape" />
        </filter>
      </defs>
    </SVG>
  );
};
