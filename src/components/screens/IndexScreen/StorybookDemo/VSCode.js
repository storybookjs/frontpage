/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import { styled } from '@storybook/theming';
import { motion, useTransform } from 'framer-motion';

const SVG = styled(motion.svg)`
  display: block;
  width: 101%;
  height: auto;
  position: absolute;
  top: -5%;
  left: 50%;
`;

export const VSCode = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="1280"
      height="993"
      fill="none"
      viewBox="0 0 1280 993"
      initial="initial"
      whileInView="animate"
      style={{ translateX: x, opacity }}
      viewport={{ amount: 'some' }}
      transition={{ duration: 0.5 }}
      layout
    >
      <g>
        <g>
          <g filter="url(#filter0_dddd_2185_71922)">
            <rect width="1200" height="910" x="40" y="20" fill="#1D1F24" rx="8" />
            <rect
              width="1199"
              height="909"
              x="40.5"
              y="20.5"
              stroke="#fff"
              strokeOpacity="0.1"
              rx="7.5"
            />
          </g>
          <circle cx="58" cy="36" r="5" fill="#FC521F" />
          <circle cx="76" cy="36" r="5" fill="#FFAE00" />
          <circle cx="94" cy="36" r="5" fill="#66BF3C" />
          <path fill="#fff" fillOpacity="0.1" d="M41 51H1239V52H41z" />
        </g>
        <g clipPath="url(#clip0_2185_71922)">
          <path fill="#232A35" d="M41 52h1198v870c0 3.866-3.13 7-7 7H48a7 7 0 01-7-7V52z" />
          <path fill="#000" fillOpacity="0.2" d="M41 52H97V929H41z" />
          <path fill="#000" fillOpacity="0.2" d="M508 52H1239V92H508z" />
          <path fill="#fff" fillOpacity="0.1" d="M327 52H328V931H327z" />
          <path fill="#fff" fillOpacity="0.1" d="M507 52H508V92H507z" />
          <path fill="#fff" fillOpacity="0.1" d="M688 52H689V92H688z" />
          <path fill="#fff" fillOpacity="0.1" d="M869 52H870V92H869z" />
          <path fill="#fff" fillOpacity="0.1" d="M1050 52H1051V92H1050z" />
          <path fill="#fff" fillOpacity="0.1" d="M96 52H97V929H96z" />
          <path fill="#fff" fillOpacity="0.1" d="M97 92H327V93H97z" />
          <path fill="#fff" fillOpacity="0.1" d="M507 92H1239V93H507z" />
          <g>
            <g>
              <g fill="#666">
                <path d="M303 72a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM312 72a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM306 73.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </g>
            </g>
          </g>
          <g>
            <g>
              <g fill="#666">
                <path d="M1212 72a1.499 1.499 0 11-3 0 1.499 1.499 0 113 0zM1221 72a1.499 1.499 0 11-3 0 1.499 1.499 0 113 0zM1215 73.5a1.499 1.499 0 100-3 1.499 1.499 0 100 3z" />
              </g>
            </g>
          </g>
          <g>
            <g>
              <path
                fill="#666"
                fillRule="evenodd"
                d="M1179.11 68.872c.52-.233.89-.76.89-1.372a1.499 1.499 0 10-3 0c0 .653.42 1.209 1 1.415v6.17a1.499 1.499 0 102 1.415c0-.653-.42-1.209-1-1.415V71.41c.26.41.57.77.93 1.083 1.1.98 2.57 1.433 4.15 1.5.21.586.76 1.008 1.42 1.008a1.499 1.499 0 100-3 1.5 1.5 0 00-1.41.99c-1.41-.064-2.62-.467-3.5-1.247-.72-.64-1.26-1.569-1.48-2.871zM1178.5 76c-.28 0-.5.224-.5.5s.22.5.5.5.5-.224.5-.5-.22-.5-.5-.5zm.5-8.5c0 .276-.22.5-.5.5s-.5-.224-.5-.5.22-.5.5-.5.5.224.5.5zm7 6c0 .276-.22.5-.5.5s-.5-.224-.5-.5.22-.5.5-.5.5.224.5.5z"
                clipRule="evenodd"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                fill="#666"
                fillRule="evenodd"
                d="M1145.03 72.5A4.004 4.004 0 001149 76c2.04 0 3.72-1.527 3.97-3.5h2.53c.28 0 .5-.224.5-.5s-.22-.5-.5-.5h-2.53A4.004 4.004 0 001149 68a4.004 4.004 0 00-3.97 3.5h-2.53c-.28 0-.5.224-.5.5s.22.5.5.5h2.53zM1149 75c1.66 0 3-1.343 3-3s-1.34-3-3-3-3 1.343-3 3 1.34 3 3 3z"
                clipRule="evenodd"
              />
            </g>
          </g>
          <text
            fill="#DDD"
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="11"
            fontWeight="800"
            letterSpacing=".38em"
          >
            <tspan x="106" y="76.119">
              EXPLORER
            </tspan>
          </text>
          <text
            fill="#DDD"
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="13"
            letterSpacing="0em"
          >
            <tspan x="343" y="76.277">
              RangeSlider.js
            </tspan>
          </text>
          <text
            fill="#DDD"
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="13"
            letterSpacing="0em"
          >
            <tspan x="523" y="76.277">
              RangeSlider.stories.js
            </tspan>
          </text>
          <text
            fill="#DDD"
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="13"
            letterSpacing="0em"
          >
            <tspan x="704" y="76.277">
              RangeSlider.mdx
            </tspan>
          </text>
          <text
            fill="#DDD"
            xmlSpace="preserve"
            style={{ whiteSpace: 'pre' }}
            fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="13"
            letterSpacing="0em"
          >
            <tspan x="885" y="76.277">
              RangeSlider.test.mdx
            </tspan>
          </text>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M109 107l3.5-3.5h-7l3.5 3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#FFAE00"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="120" y="109.277">
                      charts
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 129l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="133.277">
                      LineGraph
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 153l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="157.277">
                      PieChart
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 177l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="181.277">
                      SparkLine
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 201l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#FFAE00"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="205.277">
                      RangeSlider
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="166" y="229.277">
                      RangeSlider.js
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <path
                  fill="#1EA7FD"
                  fillOpacity="0.1"
                  d="M0 0H230V24H0z"
                  transform="translate(97 237)"
                />
                <g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="166" y="253.277">
                      RangeSlider.stories.js
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="166" y="277.277">
                      RangeSlider.mdx
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="166" y="301.277">
                      RangeSlider.test.js
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M109 323l3.5-3.5h-7l3.5 3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="120" y="325.277">
                      interstitial
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 345l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="349.277">
                      Spinners
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M125 371l3.5-3.5h-7l3.5 3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="373.277">
                      Progress indicators
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M144.188 393l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="153" y="397.277">
                      ProgressBar
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M144.188 417l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="153" y="421.277">
                      ProgressCircle
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 441l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="445.277">
                      Modal
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M109 467l3.5-3.5h-7l3.5 3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="120" y="469.277">
                      components
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 489l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="493.277">
                      Image
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 513l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="517.277">
                      tooltips
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 537l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="541.277">
                      badges
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 561l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="565.277">
                      buttons
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M109 587l3.5-3.5h-7l3.5 3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="120" y="589.277">
                      webapp
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 609l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="613.277">
                      Accordion
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 633l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="637.277">
                      Alert
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 657l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="661.277">
                      AccountMenu
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 681l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="685.277">
                      ActivityItem
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 705l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="709.277">
                      ActivityList
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 729l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="733.277">
                      Avatar
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 753l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="757.277">
                      BuildItem
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 777l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="781.277">
                      BuildList
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 801l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="805.277">
                      Calendar
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 825l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="829.277">
                      Footer
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 849l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="853.277">
                      Header
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 873l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="877.277">
                      NewAppForm
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 897l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="901.277">
                      Pagination
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#CCC"
                        fillRule="evenodd"
                        d="M127.188 921l-3.5-3.5v7l3.5-3.5z"
                        clipRule="evenodd"
                      />
                    </g>
                  </g>
                  <text
                    fill="#fff"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                    fontSize="13"
                    letterSpacing="0em"
                  >
                    <tspan x="136" y="925.277">
                      Sidebar
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g>
            <g clipPath="url(#clip1_2185_71922)">
              <path
                fill="#999"
                fillRule="evenodd"
                d="M77.136 72.119a.857.857 0 00-.422-.111H66.43a.857.857 0 00-.858.857v4.285h-7.714a.857.857 0 00-.857.857V95.15c0 .473.384.857.857.857h13.714a.857.857 0 00.858-.857v-4.285h7.714a.857.857 0 00.857-.857V76.294a.855.855 0 00-.257-.613l-3.417-3.416a.841.841 0 00-.19-.146zM72.43 89.15h6.857v-12h-2.572a.857.857 0 01-.857-.858v-2.57h-8.571v3.427h.857a.858.858 0 01.612.257l3.416 3.416a.855.855 0 01.258.613v7.715zM58.713 78.864v15.429h12v-12h-2.571a.857.857 0 01-.857-.858v-2.57h-8.572z"
                clipRule="evenodd"
              />
            </g>
            <g clipPath="url(#clip2_2185_71922)">
              <path
                fill="#999"
                fillRule="evenodd"
                d="M73.362 145.496a9.392 9.392 0 01-6.076 2.219c-5.207 0-9.429-4.222-9.429-9.429s4.222-9.429 9.429-9.429 9.429 4.222 9.429 9.429a9.391 9.391 0 01-2.219 6.076c.092.041.178.1.253.175l5.143 5.143a.857.857 0 11-1.212 1.212l-5.143-5.143a.846.846 0 01-.175-.253zm1.638-7.21a7.714 7.714 0 11-15.428 0 7.714 7.714 0 0115.428 0z"
                clipRule="evenodd"
              />
            </g>
            <g>
              <path
                fill="#999"
                fillRule="evenodd"
                d="M67.285 188.285c0 1.12-.715 2.072-1.714 2.425v6.949c.95-.973 2.344-1.659 4.286-1.659 1.524 0 2.491-.433 3.106-.955.373-.317.641-.687.827-1.062a2.572 2.572 0 111.758.244 5.063 5.063 0 01-1.475 2.125c-.968.822-2.345 1.362-4.216 1.362-1.778 0-2.806.721-3.419 1.572-.462.641-.707 1.388-.809 2.024a2.573 2.573 0 11-1.772-.021V190.71a2.572 2.572 0 113.428-2.425zm-3.428 15.429a.857.857 0 111.713 0 .857.857 0 01-1.713 0zm1.714-15.429a.857.857 0 11-1.713 0 .857.857 0 011.713 0zm10.286 3.429a.857.857 0 11-1.715 0 .857.857 0 011.715 0z"
                clipRule="evenodd"
              />
            </g>
            <g>
              <path
                fill="#999"
                fillRule="evenodd"
                d="M63 241.721a4.285 4.285 0 00-4.285 4.285v12A4.286 4.286 0 0063 262.292h12a4.286 4.286 0 004.285-4.286v-12a4.285 4.285 0 00-4.285-4.285H63zm14.572 9.428h-7.714v-7.714H75a2.571 2.571 0 012.571 2.571v5.143zm0 1.715v5.142a2.571 2.571 0 01-2.571 2.572h-5.143v-7.714h7.714zm-9.429 7.714v-7.714H60.43v5.142a2.571 2.571 0 002.572 2.572h5.142zm-7.714-9.429h7.714v-7.714h-5.142a2.571 2.571 0 00-2.572 2.571v5.143z"
                clipRule="evenodd"
              />
            </g>
            <g>
              <path
                fill="#999"
                d="M78.965 308.729l-15.514 9.604a.857.857 0 01-1.308-.729v-19.208a.857.857 0 011.308-.729l15.514 9.604a.858.858 0 010 1.458z"
              />
            </g>
          </g>
          <g clipPath="url(#clip3_2185_71922)">
            <g fill="#999">
              <path d="M66.576 894.576a3.429 3.429 0 015.616 3.677.857.857 0 001.597.626 5.145 5.145 0 00-8.425-5.516 5.144 5.144 0 005.515 8.426.857.857 0 00-.626-1.597 3.428 3.428 0 01-3.678-5.616z" />
              <path
                fillRule="evenodd"
                d="M58.609 896.189c.22.219.325.509.319.796.006.288-.1.578-.32.797L57 899.391c.318 1.605.95 3.097 1.828 4.409h2.265c.31 0 .59.13.79.338.207.199.337.478.337.789v2.258A12.174 12.174 0 0066.603 909l1.612-1.612c.213-.213.492-.319.772-.319l.025.001.024-.001c.28 0 .559.106.772.319l1.608 1.609a12.17 12.17 0 004.367-1.812v-2.284c0-.31.13-.59.338-.789a1.09 1.09 0 01.788-.337h2.282A12.167 12.167 0 0081 899.404l-1.622-1.622a1.087 1.087 0 01-.319-.797c-.006-.287.1-.577.32-.796l1.617-1.618a12.171 12.171 0 00-1.79-4.324h-2.297c-.31 0-.59-.13-.788-.338a1.087 1.087 0 01-.338-.789v-2.306a12.178 12.178 0 00-4.36-1.811l-1.615 1.615a1.085 1.085 0 01-.772.319h-.049c-.28 0-.56-.105-.772-.319L66.597 885a12.162 12.162 0 00-4.377 1.814v2.281c0 .31-.13.59-.338.788a1.085 1.085 0 01-.789.339h-2.28a12.166 12.166 0 00-1.808 4.362l1.604 1.605zm1.212 2.805a2.802 2.802 0 00.821-2.01 2.8 2.8 0 00-.82-2.007l-.924-.924c.216-.742.512-1.451.878-2.117h1.317c.787 0 1.497-.327 2.002-.841a2.8 2.8 0 00.839-2v-1.319c.67-.369 1.383-.666 2.131-.883l.937.937c.55.55 1.273.822 1.985.822h.049a2.8 2.8 0 001.984-.822l.933-.933c.742.217 1.45.513 2.115.879v1.344c0 .787.327 1.497.841 2.002a2.802 2.802 0 002 .839h1.33c.359.655.649 1.351.862 2.08l-.935.935a2.804 2.804 0 00-.821 2.008 2.8 2.8 0 00.82 2.01l.942.942a10.435 10.435 0 01-.88 2.124H76.91a2.8 2.8 0 00-2.001.84 2.801 2.801 0 00-.84 2.001v1.322c-.667.367-1.378.664-2.122.88l-.926-.926a2.805 2.805 0 00-1.985-.822h-.049a2.8 2.8 0 00-1.985.822l-.93.931a10.441 10.441 0 01-2.138-.886v-1.295c0-.786-.326-1.496-.84-2.001a2.802 2.802 0 00-2.001-.84h-1.304a10.462 10.462 0 01-.897-2.162l.93-.93z"
                clipRule="evenodd"
              />
            </g>
          </g>
          <g clipPath="url(#clip4_2185_71922)">
            <path
              fill="#F3F3F3"
              d="M481.74 66.83a.643.643 0 10-.909.91l4.26 4.26-4.26 4.26a.643.643 0 00.909.909l4.26-4.26 4.259 4.26a.644.644 0 00.91-.91l-4.26-4.26 4.26-4.259a.643.643 0 10-.91-.91L486 71.09l-4.26-4.26z"
            />
          </g>
          <g clipPath="url(#clip5_2185_71922)">
            <path fill="#232A35" d="M0 0H911V836H0z" transform="translate(328 93)" />
            <text
              fill="#546E7A"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="IBM Plex Mono"
              fontSize="12"
              fontWeight="500"
              letterSpacing="0em"
            >
              <tspan x="345.805" y="117.5">
                1{' '}
              </tspan>
              <tspan x="345.805" y="137.5">
                2{' '}
              </tspan>
              <tspan x="345.805" y="157.5">
                3{' '}
              </tspan>
              <tspan x="345.805" y="177.5">
                4{' '}
              </tspan>
              <tspan x="345.805" y="197.5">
                5{' '}
              </tspan>
              <tspan x="345.805" y="217.5">
                6{' '}
              </tspan>
              <tspan x="345.805" y="237.5">
                7{' '}
              </tspan>
              <tspan x="345.805" y="257.5">
                8{' '}
              </tspan>
              <tspan x="345.805" y="277.5">
                9{' '}
              </tspan>
              <tspan x="338.609" y="297.5">
                10{' '}
              </tspan>
              <tspan x="338.609" y="317.5">
                11{' '}
              </tspan>
              <tspan x="338.609" y="337.5">
                12{' '}
              </tspan>
              <tspan x="338.609" y="357.5">
                13{' '}
              </tspan>
              <tspan x="338.609" y="377.5">
                14{' '}
              </tspan>
              <tspan x="338.609" y="397.5">
                15{' '}
              </tspan>
              <tspan x="338.609" y="417.5">
                16{' '}
              </tspan>
              <tspan x="338.609" y="437.5">
                17{' '}
              </tspan>
              <tspan x="338.609" y="457.5">
                18{' '}
              </tspan>
              <tspan x="338.609" y="477.5">
                19{' '}
              </tspan>
              <tspan x="338.609" y="497.5">
                20{' '}
              </tspan>
              <tspan x="338.609" y="517.5">
                21{' '}
              </tspan>
              <tspan x="338.609" y="537.5">
                22{' '}
              </tspan>
              <tspan x="338.609" y="557.5">
                23{' '}
              </tspan>
              <tspan x="338.609" y="577.5">
                24{' '}
              </tspan>
              <tspan x="338.609" y="597.5">
                25{' '}
              </tspan>
              <tspan x="338.609" y="617.5">
                26{' '}
              </tspan>
              <tspan x="338.609" y="637.5">
                27{' '}
              </tspan>
              <tspan x="338.609" y="657.5">
                28{' '}
              </tspan>
              <tspan x="338.609" y="677.5">
                29{' '}
              </tspan>
              <tspan x="338.609" y="697.5">
                30{' '}
              </tspan>
              <tspan x="338.609" y="717.5">
                31{' '}
              </tspan>
              <tspan x="338.609" y="737.5">
                32{' '}
              </tspan>
              <tspan x="338.609" y="757.5">
                33{' '}
              </tspan>
              <tspan x="338.609" y="777.5">
                34{' '}
              </tspan>
              <tspan x="338.609" y="797.5">
                35{' '}
              </tspan>
              <tspan x="338.609" y="817.5">
                36{' '}
              </tspan>
              <tspan x="338.609" y="837.5">
                37{' '}
              </tspan>
              <tspan x="338.609" y="857.5">
                38{' '}
              </tspan>
              <tspan x="338.609" y="877.5">
                39{' '}
              </tspan>
              <tspan x="338.609" y="897.5">
                40{' '}
              </tspan>
              <tspan x="338.609" y="917.5">
                41{' '}
              </tspan>
              <tspan x="338.609" y="937.5">
                42{' '}
              </tspan>
              <tspan x="338.609" y="957.5">
                43{' '}
              </tspan>
            </text>
            <g id="code">
              <text
                fill="#546E7A"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="373" y="237.661">
                  &#10;
                </tspan>
              </text>
              <text
                fill="#89DDFF"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="488.312" y="197.661">
                  =
                </tspan>
                <tspan x="560.383" y="217.661">
                  =
                </tspan>
                <tspan x="466.691" y="257.661">
                  =
                </tspan>
                <tspan x="553.176" y="257.661">
                  &#60;
                </tspan>
                <tspan x="596.418" y="257.661">
                  &#62;
                </tspan>
                <tspan x="502.727" y="337.661">
                  =&#62;
                </tspan>
                <tspan x="618.039" y="337.661">
                  ===
                </tspan>
                <tspan x="726.145" y="337.661">
                  ?
                </tspan>
                <tspan x="531.555" y="417.661">
                  =&#62;
                </tspan>
                <tspan x="646.867" y="417.661">
                  !==
                </tspan>
                <tspan x="747.766" y="417.661">
                  ?
                </tspan>
                <tspan x="445.07" y="497.661">
                  =&#62;
                </tspan>
                <tspan x="545.969" y="497.661">
                  ===
                </tspan>
                <tspan x="639.66" y="497.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="597.661">
                  =&#62;
                </tspan>
                <tspan x="545.969" y="597.661">
                  ===
                </tspan>
                <tspan x="632.453" y="597.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="697.661">
                  =&#62;
                </tspan>
                <tspan x="545.969" y="697.661">
                  ===
                </tspan>
                <tspan x="625.246" y="697.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="797.661">
                  =&#62;
                </tspan>
                <tspan x="560.383" y="797.661">
                  ===
                </tspan>
                <tspan x="661.281" y="797.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="897.661">
                  =&#62;
                </tspan>
                <tspan x="560.383" y="897.661">
                  ===
                </tspan>
                <tspan x="668.488" y="897.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="977.661">
                  =&#62;
                </tspan>
                <tspan x="560.383" y="977.661">
                  ===
                </tspan>
                <tspan x="668.488" y="977.661">
                  &#38;&#38;
                </tspan>
                <tspan x="445.07" y="1077.66">
                  =&#62;
                </tspan>
                <tspan x="560.383" y="1077.66">
                  ===
                </tspan>
                <tspan x="668.488" y="1077.66">
                  &#38;&#38;
                </tspan>
              </text>
              <text
                fill="#F07178"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="373" y="177.661">
                  &#10;
                </tspan>
                <tspan x="502.727" y="197.661">
                  styles
                </tspan>
                <tspan x="574.797" y="217.661">
                  animation
                </tspan>
                <tspan x="481.105" y="257.661">
                  styled
                </tspan>
                <tspan x="560.383" y="257.661">
                  Props
                </tspan>
                <tspan x="603.625" y="257.661">
                  {'`'}&#10;
                </tspan>
                <tspan x="387.414" y="277.661">
                  {'background-color: ${color'}
                </tspan>
                <tspan x="654.074" y="277.661">
                  {'};'}&#10;
                </tspan>
                <tspan x="387.414" y="297.661">
                  border-radius: 3em;&#10;
                </tspan>
                <tspan x="387.414" y="317.661">
                  {'// TODO: verify if this change is correct&#10;'}
                </tspan>
                <tspan x="387.414" y="337.661">
                  {'cursor: ${'}
                </tspan>
                <tspan x="906.32" y="337.661">
                  {'};'}&#10;
                </tspan>
                <tspan x="387.414" y="357.661">
                  display: inline-block;&#10;
                </tspan>
                <tspan x="387.414" y="377.661">
                  overflow: hidden;&#10;
                </tspan>
                <tspan x="387.414" y="397.661">
                  position: relative;&#10;
                </tspan>
                <tspan x="387.414" y="417.661">
                  {'transition: ${'}
                </tspan>
                <tspan x="978.391" y="417.661">
                  {'};'}&#10;
                </tspan>
                <tspan x="387.414" y="437.661">
                  transform: translate3d(0,0,0);&#10;
                </tspan>
                <tspan x="387.414" y="457.661">
                  vertical-align: top;&#10;
                </tspan>
                <tspan x="373" y="477.661">
                  &#10;
                </tspan>
                <tspan x="387.414" y="497.661">
                  {'${'}
                </tspan>
                <tspan x="661.281" y="497.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="517.661">
                  height: 32px;&#10;
                </tspan>
                <tspan x="401.828" y="537.661">
                  width: 32px;&#10;
                </tspan>
                <tspan x="387.414" y="557.661">
                  {'`}'}&#10;
                </tspan>
                <tspan x="373" y="577.661">
                  &#10;
                </tspan>
                <tspan x="387.414" y="597.661">
                  {'${'}
                </tspan>
                <tspan x="654.074" y="597.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="617.661">
                  height: 20px;&#10;
                </tspan>
                <tspan x="401.828" y="637.661">
                  width: 20px;&#10;
                </tspan>
                <tspan x="387.414" y="657.661">
                  {'`}'}&#10;
                </tspan>
                <tspan x="387.414" y="697.661">
                  {'${'}
                </tspan>
                <tspan x="646.867" y="697.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="717.661">
                  width: 6px;&#10;
                </tspan>
                <tspan x="401.828" y="737.661">
                  height: 6px;&#10;
                </tspan>
                <tspan x="387.414" y="757.661">
                  {'`}'}&#10;
                </tspan>
                <tspan x="387.414" y="797.661">
                  {'${'}
                </tspan>
                <tspan x="682.902" y="797.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="817.661">
                  {`animation: \${glow}`}
                </tspan>
                <tspan x="538.762" y="817.661">
                  1.5s ease-in-out infinite;&#10;
                </tspan>
                <tspan x="387.414" y="837.661">
                  {'`}'}&#10;
                </tspan>
                <tspan x="387.414" y="877.661">
                  {'/* background */&#10;'}
                </tspan>
                <tspan x="387.414" y="897.661">
                  {'${'}
                </tspan>
                <tspan x="690.109" y="897.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="917.661">
                  background-color: #ccc;&#10;
                </tspan>
                <tspan x="387.414" y="937.661">
                  {'`}'}&#10;
                </tspan>
                <tspan x="387.414" y="977.661">
                  {'${'}
                </tspan>
                <tspan x="690.109" y="977.661">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="997.661">
                  {'background-color: ${color'}
                </tspan>
                <tspan x="646.867" y="997.661">
                  {'};'}&#10;
                </tspan>
                <tspan x="401.828" y="1017.66">
                  background-image: linear-gradient(20deg, #74E48B 0%, #61D135 100%);&#10;
                </tspan>
                <tspan x="387.414" y="1037.66">
                  {'`}'}&#10;
                </tspan>
                <tspan x="387.414" y="1077.66">
                  {'${'}
                </tspan>
                <tspan x="690.109" y="1077.66">
                  {'css`'}&#10;
                </tspan>
                <tspan x="401.828" y="1097.66">
                  {'background-color: ${color'}
                </tspan>
                <tspan x="646.867" y="1097.66">
                  {'};'}&#10;
                </tspan>
                <tspan x="401.828" y="1117.66">
                  {`background-image: linear-gradient(22deg, #EB7E44 0%, #FF4400
                100%), linear-gradient(-245deg, rgba(255,219,0,0.30) 5%,
                rgba(0,0,0,0.00) 100%);&#10;`}
                </tspan>
                <tspan x="387.414" y="1137.66">
                  {'`}'}
                </tspan>
              </text>
              <text
                fill="#C3E88D"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="618.039" y="117.661">
                  &#39;@storybook/design-system&#39;
                </tspan>
                <tspan x="574.797" y="137.661">
                  &#39;@storybook/theming&#39;
                </tspan>
                <tspan x="502.727" y="157.661">
                  &#39;react&#39;
                </tspan>
                <tspan x="646.867" y="337.661">
                  &#39;progress&#39;
                </tspan>
                <tspan x="740.559" y="337.661">
                  &#39;progress&#39;
                </tspan>
                <tspan x="834.25" y="337.661">
                  &#39;inherit&#39;
                </tspan>
                <tspan x="675.695" y="417.661">
                  &#39;loading&#39;
                </tspan>
                <tspan x="762.18" y="417.661">
                  &#39;all 200ms ease-out;&#39;
                </tspan>
                <tspan x="935.148" y="417.661">
                  &#39;none&#39;
                </tspan>
                <tspan x="574.797" y="497.661">
                  &#39;medium&#39;
                </tspan>
                <tspan x="574.797" y="597.661">
                  &#39;small&#39;
                </tspan>
                <tspan x="574.797" y="697.661">
                  &#39;tiny&#39;
                </tspan>
                <tspan x="589.211" y="797.661">
                  &#39;loading&#39;
                </tspan>
                <tspan x="589.211" y="897.661">
                  &#39;disabled&#39;
                </tspan>
                <tspan x="589.211" y="977.661">
                  &#39;positive&#39;
                </tspan>
                <tspan x="589.211" y="1077.66">
                  &#39;negative&#39;
                </tspan>
              </text>
              <text
                fill="#82AAFF"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="437.863" y="117.661">
                  animation
                </tspan>
                <tspan x="517.141" y="117.661">
                  styles
                </tspan>
                <tspan x="437.863" y="137.661">
                  css
                </tspan>
                <tspan x="473.898" y="137.661">
                  styled
                </tspan>
                <tspan x="423.449" y="157.661">
                  React
                </tspan>
                <tspan x="423" y="197.661">
                  color
                </tspan>
                <tspan x="423" y="217.661">
                  rotate360
                </tspan>
                <tspan x="502.934" y="217.661">
                  glow
                </tspan>
                <tspan x="416.242" y="257.661">
                  Status
                </tspan>
                <tspan x="459.484" y="337.661">
                  props
                </tspan>
                <tspan x="488.312" y="417.661">
                  props
                </tspan>
                <tspan x="401.828" y="497.661">
                  props
                </tspan>
                <tspan x="401.828" y="597.661">
                  props
                </tspan>
                <tspan x="401.828" y="697.661">
                  props
                </tspan>
                <tspan x="401.828" y="797.661">
                  props
                </tspan>
                <tspan x="401.828" y="897.661">
                  props
                </tspan>
                <tspan x="401.828" y="977.661">
                  props
                </tspan>
                <tspan x="401.828" y="1077.66">
                  props
                </tspan>
              </text>
              <text
                fill="#EEFFFF"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="416.242" y="117.661">
                  {'{'}
                </tspan>
                <tspan x="502.727" y="117.661">
                  ,
                </tspan>
                <tspan x="560.383" y="117.661">
                  {'}'}
                </tspan>
                <tspan x="610.832" y="117.661"></tspan>
                <tspan x="805.422" y="117.661">
                  ;&#10;
                </tspan>
                <tspan x="416.242" y="137.661">
                  {'{'}
                </tspan>
                <tspan x="459.484" y="137.661">
                  ,
                </tspan>
                <tspan x="517.141" y="137.661">
                  {'}'}
                </tspan>
                <tspan x="567.59" y="137.661"></tspan>
                <tspan x="718.938" y="137.661">
                  ;&#10;
                </tspan>
                <tspan x="416.242" y="157.661"></tspan>
                <tspan x="459.484" y="157.661"></tspan>
                <tspan x="495.52" y="157.661"></tspan>
                <tspan x="553.176" y="157.661">
                  ;&#10;
                </tspan>
                <tspan x="409.035" y="197.661">
                  {'{'}
                </tspan>
                <tspan x="466.691" y="197.661">
                  {'}'}
                </tspan>
                <tspan x="495.52" y="197.661"></tspan>
                <tspan x="545.969" y="197.661">
                  ;&#10;
                </tspan>
                <tspan x="409.035" y="217.661">
                  {'{'}
                </tspan>
                <tspan x="488.52" y="217.661">
                  ,
                </tspan>
                <tspan x="538.762" y="217.661">
                  {'}'}
                </tspan>
                <tspan x="567.59" y="217.661"></tspan>
                <tspan x="639.66" y="217.661">
                  ;&#10;
                </tspan>
                <tspan x="409.035" y="257.661"></tspan>
                <tspan x="459.484" y="257.661"></tspan>
                <tspan x="473.898" y="257.661"></tspan>
                <tspan x="524.348" y="257.661">
                  .
                </tspan>
                <tspan x="373" y="277.661"></tspan>
                <tspan x="567.59" y="277.661">
                  .
                </tspan>
                <tspan x="373" y="297.661"></tspan>
                <tspan x="373" y="317.661"></tspan>
                <tspan x="373" y="337.661"></tspan>
                <tspan x="495.52" y="337.661"></tspan>
                <tspan x="517.141" y="337.661">
                  props.
                </tspan>
                <tspan x="610.832" y="337.661"></tspan>
                <tspan x="639.66" y="337.661"></tspan>
                <tspan x="718.938" y="337.661"></tspan>
                <tspan x="733.352" y="337.661"></tspan>
                <tspan x="812.629" y="337.661">
                  :
                </tspan>
                <tspan x="899.113" y="337.661"></tspan>
                <tspan x="373" y="357.661"></tspan>
                <tspan x="373" y="377.661"></tspan>
                <tspan x="373" y="397.661"></tspan>
                <tspan x="373" y="417.661"></tspan>
                <tspan x="524.348" y="417.661"></tspan>
                <tspan x="545.969" y="417.661">
                  props.
                </tspan>
                <tspan x="639.66" y="417.661"></tspan>
                <tspan x="668.488" y="417.661"></tspan>
                <tspan x="740.559" y="417.661"></tspan>
                <tspan x="754.973" y="417.661"></tspan>
                <tspan x="913.527" y="417.661">
                  :
                </tspan>
                <tspan x="373" y="437.661"></tspan>
                <tspan x="373" y="457.661"></tspan>
                <tspan x="373" y="497.661"></tspan>
                <tspan x="437.863" y="497.661"></tspan>
                <tspan x="459.484" y="497.661">
                  props.
                </tspan>
                <tspan x="538.762" y="497.661"></tspan>
                <tspan x="567.59" y="497.661"></tspan>
                <tspan x="632.453" y="497.661"></tspan>
                <tspan x="654.074" y="497.661"></tspan>
                <tspan x="373" y="517.661"></tspan>
                <tspan x="373" y="537.661"></tspan>
                <tspan x="373" y="557.661"></tspan>
                <tspan x="373" y="597.661"></tspan>
                <tspan x="437.863" y="597.661"></tspan>
                <tspan x="459.484" y="597.661">
                  props.
                </tspan>
                <tspan x="538.762" y="597.661"></tspan>
                <tspan x="567.59" y="597.661"></tspan>
                <tspan x="625.246" y="597.661"></tspan>
                <tspan x="646.867" y="597.661"></tspan>
                <tspan x="373" y="617.661"></tspan>
                <tspan x="373" y="637.661"></tspan>
                <tspan x="373" y="657.661"></tspan>
                <tspan x="373" y="677.661">
                  &#x200b;&#10;
                </tspan>
                <tspan x="373" y="697.661"></tspan>
                <tspan x="437.863" y="697.661"></tspan>
                <tspan x="459.484" y="697.661">
                  props.
                </tspan>
                <tspan x="538.762" y="697.661"></tspan>
                <tspan x="567.59" y="697.661"></tspan>
                <tspan x="618.039" y="697.661"></tspan>
                <tspan x="639.66" y="697.661"></tspan>
                <tspan x="373" y="717.661"></tspan>
                <tspan x="373" y="737.661"></tspan>
                <tspan x="373" y="757.661"></tspan>
                <tspan x="373" y="777.661">
                  &#x200b;&#10;
                </tspan>
                <tspan x="373" y="797.661"></tspan>
                <tspan x="437.863" y="797.661"></tspan>
                <tspan x="459.484" y="797.661">
                  props.
                </tspan>
                <tspan x="553.176" y="797.661"></tspan>
                <tspan x="582.004" y="797.661"></tspan>
                <tspan x="654.074" y="797.661"></tspan>
                <tspan x="675.695" y="797.661"></tspan>
                <tspan x="373" y="817.661"></tspan>
                <tspan x="531.555" y="817.661"></tspan>
                <tspan x="373" y="837.661"></tspan>
                <tspan x="373" y="857.661">
                  &#x200b;&#10;
                </tspan>
                <tspan x="373" y="877.661"></tspan>
                <tspan x="373" y="897.661"></tspan>
                <tspan x="437.863" y="897.661"></tspan>
                <tspan x="459.484" y="897.661">
                  props.
                </tspan>
                <tspan x="553.176" y="897.661"></tspan>
                <tspan x="582.004" y="897.661"></tspan>
                <tspan x="661.281" y="897.661"></tspan>
                <tspan x="682.902" y="897.661"></tspan>
                <tspan x="373" y="917.661"></tspan>
                <tspan x="373" y="937.661"></tspan>
                <tspan x="373" y="957.661">
                  &#x200b;&#10;
                </tspan>
                <tspan x="373" y="977.661"></tspan>
                <tspan x="437.863" y="977.661"></tspan>
                <tspan x="459.484" y="977.661">
                  props.
                </tspan>
                <tspan x="553.176" y="977.661"></tspan>
                <tspan x="582.004" y="977.661"></tspan>
                <tspan x="661.281" y="977.661"></tspan>
                <tspan x="682.902" y="977.661"></tspan>
                <tspan x="373" y="997.661"></tspan>
                <tspan x="582.004" y="997.661">
                  .
                </tspan>
                <tspan x="373" y="1017.66"></tspan>
                <tspan x="373" y="1037.66"></tspan>
                <tspan x="373" y="1057.66">
                  &#x200b;&#10;
                </tspan>
                <tspan x="373" y="1077.66"></tspan>
                <tspan x="437.863" y="1077.66"></tspan>
                <tspan x="459.484" y="1077.66">
                  props.
                </tspan>
                <tspan x="553.176" y="1077.66"></tspan>
                <tspan x="582.004" y="1077.66"></tspan>
                <tspan x="661.281" y="1077.66"></tspan>
                <tspan x="682.902" y="1077.66"></tspan>
                <tspan x="373" y="1097.66"></tspan>
                <tspan x="582.004" y="1097.66">
                  .
                </tspan>
                <tspan x="373" y="1117.66"></tspan>
                <tspan x="373" y="1137.66"></tspan>
              </text>
              <text
                fill="#C792EA"
                style={{ whiteSpace: 'pre' }}
                fontFamily="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                fontSize="12"
                fontWeight="500"
                letterSpacing="0em"
              >
                <tspan x="373" y="117.661">
                  import
                </tspan>
                <tspan x="582.004" y="117.661">
                  from
                </tspan>
                <tspan x="373" y="137.661">
                  import
                </tspan>
                <tspan x="538.762" y="137.661">
                  from
                </tspan>
                <tspan x="373" y="157.661">
                  import
                </tspan>
                <tspan x="466.691" y="157.661">
                  from
                </tspan>
                <tspan x="373" y="197.661">
                  const
                </tspan>
                <tspan x="373" y="217.661">
                  const
                </tspan>
                <tspan x="373" y="257.661">
                  const
                </tspan>
                <tspan x="531.555" y="257.661">
                  div
                </tspan>
                <tspan x="574.797" y="277.661">
                  mediumlight
                </tspan>
                <tspan x="567.59" y="337.661">
                  status
                </tspan>
                <tspan x="596.418" y="417.661">
                  status
                </tspan>
                <tspan x="509.934" y="497.661">
                  size
                </tspan>
                <tspan x="509.934" y="597.661">
                  size
                </tspan>
                <tspan x="509.934" y="697.661">
                  size
                </tspan>
                <tspan x="509.934" y="797.661">
                  status
                </tspan>
                <tspan x="509.934" y="897.661">
                  status
                </tspan>
                <tspan x="509.934" y="977.661">
                  status
                </tspan>
                <tspan x="589.211" y="997.661">
                  positive
                </tspan>
                <tspan x="509.934" y="1077.66">
                  status
                </tspan>
                <tspan x="589.211" y="1097.66">
                  negative
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dddd_2185_71922"
          width="1280"
          height="1000"
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2185_71922" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="effect1_dropShadow_2185_71922" result="effect2_dropShadow_2185_71922" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="20" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect2_dropShadow_2185_71922" result="effect3_dropShadow_2185_71922" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="40" />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="effect3_dropShadow_2185_71922" result="effect4_dropShadow_2185_71922" />
          <feBlend in="SourceGraphic" in2="effect4_dropShadow_2185_71922" result="shape" />
        </filter>
        <clipPath id="clip0_2185_71922">
          <path fill="#fff" d="M41 52h1198v870c0 3.866-3.13 7-7 7H48a7 7 0 01-7-7V52z" />
        </clipPath>
        <clipPath id="clip1_2185_71922">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(57 72)" />
        </clipPath>
        <clipPath id="clip2_2185_71922">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(57 128)" />
        </clipPath>
        <clipPath id="clip3_2185_71922">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(57 885)" />
        </clipPath>
        <clipPath id="clip4_2185_71922">
          <path fill="#fff" d="M0 0H12V12H0z" transform="translate(480 66)" />
        </clipPath>
        {/* Code clip */}
        <clipPath id="clip5_2185_71922">
          <motion.path
            fill="#fff"
            d="M0 0H911V836H0z"
            transform="translate(328 93)"
            variants={{
              initial: { x: 328, y: '-100%' },
              animate: { x: 328, y: 93 },
            }}
          />
        </clipPath>
      </defs>
    </SVG>
  );
};
