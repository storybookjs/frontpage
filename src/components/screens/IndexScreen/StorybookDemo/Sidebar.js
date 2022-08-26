import React from 'react';
import { motion } from 'framer-motion';

export const Sidebar = ({
  rpDefaultOpacity,
  rpNoSelectionOpacity,
  rpInputRangeOpacity,
  tfOverviewOpacity,
  tfNoSelectionOpacity,
  tfAfternoonOpacity,
  tfAllDayOpacity,
}) => (
  <g id="sidebar">
    <path fill="#F6F9FC" d="M0 0h251v1049H0z" transform="translate(41 52)" />
    <g>
      <path
        fill="#333"
        fillRule="evenodd"
        d="M87.64 89.83c-.85 0-1.67-.11-2.46-.34a5.83 5.83 0 01-1.97-.95l.8-1.78a6.26 6.26 0 003.66 1.14c.7 0 1.25-.12 1.63-.35.37-.23.56-.55.56-.95 0-.36-.17-.65-.52-.85-.34-.2-.96-.4-1.84-.6-1-.2-1.79-.44-2.38-.73a3.1 3.1 0 01-1.3-1.06c-.27-.42-.4-.94-.4-1.56 0-.68.19-1.3.56-1.82.38-.54.91-.96 1.6-1.26.68-.3 1.47-.46 2.36-.46.8 0 1.57.12 2.32.36.74.23 1.33.54 1.76.94l-.8 1.78a5.44 5.44 0 00-3.26-1.14c-.65 0-1.16.12-1.54.38-.37.25-.56.59-.56 1.03 0 .25.08.46.22.63.14.16.38.31.72.44.34.13.81.26 1.43.4 1.45.32 2.5.73 3.13 1.23.63.5.95 1.2.95 2.08 0 1.07-.4 1.9-1.23 2.52-.82.61-1.97.92-3.44.92zm10.46-1.8c.25 0 .5 0 .77-.04l-.13 1.76c-.3.04-.61.07-.92.07-1.2 0-2.07-.27-2.62-.79-.55-.52-.82-1.32-.82-2.38v-3.01h-1.5v-1.8h1.5v-2.31h2.41v2.3h1.97v1.8h-1.97v3c0 .94.44 1.4 1.31 1.4zm5.62 1.79c-.83 0-1.56-.17-2.2-.5a3.53 3.53 0 01-1.45-1.43 4.39 4.39 0 01-.51-2.17c0-.83.17-1.56.51-2.17.34-.61.83-1.08 1.46-1.41.63-.34 1.36-.5 2.19-.5.83 0 1.56.16 2.2.5.62.33 1.1.8 1.45 1.41.34.61.51 1.34.51 2.17a4.4 4.4 0 01-.51 2.17 3.53 3.53 0 01-1.46 1.42c-.63.34-1.36.5-2.19.5zm0-1.84c1.17 0 1.76-.76 1.76-2.26 0-.76-.15-1.32-.46-1.7-.3-.37-.73-.56-1.3-.56-1.17 0-1.76.76-1.76 2.26 0 1.5.59 2.26 1.76 2.26zm10.85-4.36l-1.36.15c-.67.06-1.15.25-1.43.57-.27.31-.41.73-.41 1.25v4.1h-2.42v-7.86h2.32v1.33c.4-.9 1.21-1.4 2.45-1.49l.7-.05.15 2zm7.02-1.77h2.37l-4.74 10.72h-2.45l1.5-3.31-3.23-7.41h2.52l1.98 4.99 2.05-5zm7.97-.21c.68 0 1.28.16 1.8.5.53.33.93.8 1.23 1.41.3.61.44 1.33.44 2.14a5 5 0 01-.44 2.15c-.3.62-.7 1.1-1.23 1.46a3.2 3.2 0 01-1.8.52c-.55 0-1.04-.12-1.48-.35a2.45 2.45 0 01-1-.95v1.17h-2.39V78.4h2.42v4.48c.23-.4.57-.7 1-.92.43-.22.91-.33 1.45-.33zm-.7 6.34c.56 0 1-.2 1.3-.6.31-.4.47-.97.47-1.7 0-.7-.16-1.25-.47-1.63a1.6 1.6 0 00-1.3-.57c-.57 0-1.01.2-1.32.58-.3.4-.46.94-.46 1.66s.15 1.28.46 1.67c.31.4.75.59 1.31.59zm9.42 1.84c-.84 0-1.57-.17-2.2-.5a3.54 3.54 0 01-1.45-1.43 4.4 4.4 0 01-.51-2.17c0-.83.17-1.56.5-2.17.35-.61.84-1.08 1.46-1.41.63-.34 1.36-.5 2.2-.5.83 0 1.56.16 2.19.5.63.33 1.11.8 1.45 1.41.35.61.52 1.34.52 2.17 0 .83-.17 1.55-.52 2.17a3.53 3.53 0 01-1.45 1.42c-.63.34-1.36.5-2.2.5zm0-1.84c1.17 0 1.76-.76 1.76-2.26 0-.76-.16-1.32-.46-1.7-.3-.37-.74-.56-1.3-.56-1.18 0-1.76.76-1.76 2.26 0 1.5.58 2.26 1.76 2.26zm9 1.84c-.83 0-1.56-.17-2.19-.5a3.53 3.53 0 01-1.45-1.43 4.4 4.4 0 01-.52-2.17c0-.83.17-1.56.52-2.17.34-.61.82-1.08 1.45-1.41.63-.34 1.36-.5 2.2-.5.83 0 1.56.16 2.19.5.63.33 1.11.8 1.45 1.41.34.61.51 1.34.51 2.17a4.4 4.4 0 01-.5 2.17 3.53 3.53 0 01-1.46 1.42c-.63.34-1.36.5-2.2.5zm0-1.84c1.18 0 1.76-.76 1.76-2.26 0-.76-.15-1.32-.45-1.7-.3-.37-.74-.56-1.3-.56-1.18 0-1.77.76-1.77 2.26 0 1.5.6 2.26 1.76 2.26zm13.72 1.7h-2.96l-3-3.5v3.5h-2.42V78.42h2.41v6.78l2.9-3.34h2.88l-3.3 3.74 3.49 4.1z"
        clipRule="evenodd"
      />
      <g>
        <path
          fill="#FF4785"
          d="M61.62 92.43L61 75.93a1 1 0 01.94-1.05L75.98 74a1 1 0 011.07 1v18A1 1 0 0176 94l-13.42-.6a1 1 0 01-.96-.97z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M74.88 74.07l-1.93.12-.1 2.27a.15.15 0 00.24.12l.88-.66.75.58a.15.15 0 00.24-.12l-.08-2.3zm-1.5 7.6c-.36.27-3 .45-3 .06.06-1.5-.6-1.56-.98-1.56-.35 0-.94.11-.94.91 0 .82.86 1.28 1.88 1.82 1.45.76 3.2 1.7 3.2 4.03 0 2.24-1.82 3.47-4.14 3.47-2.4 0-4.48-.97-4.25-4.33.1-.39 3.14-.3 3.14 0-.04 1.4.28 1.8 1.08 1.8.6 0 .89-.34.89-.9 0-.87-.9-1.38-1.95-1.96-1.4-.8-3.07-1.72-3.07-3.86 0-2.13 1.47-3.55 4.09-3.55s4.05 1.4 4.05 4.06z"
          clipRule="evenodd"
        />
      </g>
    </g>
    <g>
      <g>
        <g fill="#7A858E">
          <path d="M256.59 82.59a2 2 0 013.27 2.14.5.5 0 10.93.37 3 3 0 10-1.7 1.7.5.5 0 10-.36-.94 2 2 0 01-2.14-3.27z" />
          <path
            fillRule="evenodd"
            d="M251.94 83.53c.13.12.19.3.18.46 0 .17-.05.34-.18.47l-.94.93c.19.94.55 1.81 1.07 2.58h1.32c.18 0 .34.07.46.2.12.11.2.27.2.45v1.32c.76.51 1.62.88 2.55 1.06l.94-.94a.63.63 0 01.45-.19h.03c.16 0 .33.07.45.19l.94.94a7.1 7.1 0 002.55-1.06v-1.33c0-.18.07-.35.2-.46.11-.12.27-.2.45-.2h1.33A7.1 7.1 0 00265 85.4l-.95-.94a.63.63 0 01-.18-.47c0-.17.06-.34.18-.46l.95-.95a7.07 7.07 0 00-1.05-2.52h-1.34a.63.63 0 01-.46-.2.63.63 0 01-.2-.46v-1.34a7.1 7.1 0 00-2.54-1.06l-.94.94a.63.63 0 01-.45.19H258a.63.63 0 01-.45-.19l-.94-.94a7.1 7.1 0 00-2.56 1.06v1.33c0 .18-.07.34-.2.46a.63.63 0 01-.45.2h-1.33c-.5.75-.87 1.62-1.06 2.54l.94.94zm.7 1.63c.33-.32.49-.75.49-1.17 0-.42-.16-.85-.48-1.17l-.54-.54c.12-.43.3-.85.51-1.23h.77c.46 0 .87-.2 1.17-.5.3-.29.48-.7.48-1.16v-.77c.4-.22.81-.39 1.25-.52l.54.55c.32.32.75.48 1.16.48h.03c.42 0 .84-.16 1.16-.48l.54-.54c.44.12.85.3 1.24.5v.8c0 .45.19.87.49 1.16.3.3.7.5 1.16.5h.78c.2.37.38.78.5 1.2l-.54.55c-.33.32-.49.75-.48 1.17 0 .42.15.85.48 1.17l.55.55c-.13.44-.3.85-.52 1.24h-.77c-.46 0-.87.2-1.16.5-.3.29-.5.7-.5 1.16v.77c-.38.21-.8.39-1.23.51l-.54-.54a1.64 1.64 0 00-1.16-.48H258c-.41 0-.84.16-1.16.48l-.54.55c-.44-.13-.85-.3-1.25-.52v-.76c0-.45-.19-.87-.48-1.16-.3-.3-.71-.5-1.17-.5h-.76c-.22-.39-.4-.81-.53-1.25l.55-.55z"
            clipRule="evenodd"
          />
        </g>
      </g>
    </g>
    <g>
      <g>
        <g>
          <g>
            <g>
              <path
                fill="#7A858E"
                fillRule="evenodd"
                d="M81.18 133.75a4.71 4.71 0 11.57-.57c.04.02.09.05.12.09l2.58 2.57a.43.43 0 11-.61.6l-2.57-2.57a.41.41 0 01-.09-.12zm.82-3.6a3.86 3.86 0 11-7.71 0 3.86 3.86 0 017.71 0z"
                clipRule="evenodd"
              />
            </g>
            <text
              fill="#7A858E"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="91" y="135.28">
                Find by name
              </tspan>
            </text>
          </g>
          <g>
            <rect width="16" height="16" x="240" y="123" fill="#000" fillOpacity="0.05" rx="3" />
            <text
              fill="#666"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Helvetica Neue"
              fontSize="10"
              letterSpacing="0"
            >
              <tspan x="246.34" y="134.69">
                /
              </tspan>
            </text>
          </g>
          <rect width="210" height="31" x="61.5" y="115.5" stroke="#E1E5E8" rx="15.5" />
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g fill="#FFAE00">
                  <path d="M65.57 177.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 000-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 010 .72h-2.86a.36.36 0 01-.36-.36z" />
                  <path
                    fillRule="evenodd"
                    d="M68.79 174.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H63.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="77" y="183.28">
                Introduction
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
                <g fill="#FFAE00">
                  <path d="M65.57 201.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 000-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 010 .72h-2.86a.36.36 0 01-.36-.36z" />
                  <path
                    fillRule="evenodd"
                    d="M68.79 198.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H63.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="77" y="207.28">
                Setup and configure
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
                <g fill="#FFAE00">
                  <path d="M65.57 225.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 000-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 010 .72h-2.86a.36.36 0 01-.36-.36z" />
                  <path
                    fillRule="evenodd"
                    d="M68.79 222.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H63.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="77" y="231.28">
                Changelog
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <text
              fill="#7A858E"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="11"
              fontWeight="800"
              letterSpacing=".38em"
            >
              <tspan x="62" y="272.62">
                LIBRARY
              </tspan>
            </text>
            <g>
              <g clipPath="url(#clip5_3666_63519)">
                <path
                  fill="#7A858E"
                  d="M267.2 265.08l2.29 2.29c.1.11.1.3 0 .4a.28.28 0 01-.4 0L267 265.7l-2.08 2.08a.28.28 0 01-.4 0 .29.29 0 010-.4l2.28-2.29c.1-.1.29-.1.4 0zm2.29 5.15c.1.1.1.29 0 .4l-2.29 2.29a.28.28 0 01-.4 0l-2.29-2.29a.29.29 0 010-.4c.11-.12.3-.12.4 0l2.09 2.08 2.08-2.08c.12-.12.3-.12.4 0z"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <path
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M53 297l3.5-3.5h-7L53 297z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#6F2CAC"
                  fillRule="evenodd"
                  d="M66.7 293.22l-1.07-1.07h-2.2v5.71h7.14v-4.64H66.7zm.3-.72l-.86-.86a.72.72 0 00-.5-.2h-2.57c-.2 0-.36.15-.36.35v6.43c0 .2.16.35.36.35h7.86c.2 0 .36-.16.36-.35v-5.36c0-.2-.16-.36-.36-.36H67z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="77" y="299.28">
                Charts
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M71.19 319l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#1EA7FD"
                  fillRule="evenodd"
                  d="M80.5 314.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="93" y="323.28">
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M71.19 343l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#1EA7FD"
                  fillRule="evenodd"
                  d="M80.5 338.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="93" y="347.28">
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
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M71.19 367l-3.5-3.5v7l3.5-3.5z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 362.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="371.28">
                  RangeSlider
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <path fill="#F6F9FC" d="M0 0h251v24H0z" transform="translate(41 355)" />
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M69 369l3.5-3.5h-7L69 369z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 362.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="371.28">
                  RangeSlider
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g fill="#FFAE00">
                    <path d="M98.57 389.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 110 .72h-2.86a.36.36 0 01-.36-.36z" />
                    <path
                      fillRule="evenodd"
                      d="M101.79 386.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H96.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="395.28">
                  Overview
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 411.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="419.28">
                  Default
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="rs-default-active" style={{ opacity: rpDefaultOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 403)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 411.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="419.28">
                  Default
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 435.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="443.28">
                  No selection
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="rs-no-selection-active" style={{ opacity: rpNoSelectionOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 427)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 435.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="443.28">
                  No selection
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 459.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="467.28">
                  Input range
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="rs-input-range-active" style={{ opacity: rpInputRangeOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 451)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 459.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="467.28">
                  Input range
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M71.19 487l-3.5-3.5v7l3.5-3.5z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 482.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="491.28">
                  TimeFrame
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <path fill="#F6F9FC" d="M0 0h251v24H0z" transform="translate(41 475)" />
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M69 489l3.5-3.5h-7L69 489z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 482.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="491.28">
                  TimeFrame
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g fill="#FFAE00">
                    <path d="M98.57 509.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 110 .72h-2.86a.36.36 0 01-.36-.36z" />
                    <path
                      fillRule="evenodd"
                      d="M101.79 506.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H96.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="515.28">
                  Overview
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="tf-overview" style={{ opacity: tfOverviewOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 499)" />
            <g>
              <g>
                <g>
                  <g fill="#fff">
                    <path d="M98.57 509.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 110 .72h-2.86a.36.36 0 01-.36-.36z" />
                    <path
                      fillRule="evenodd"
                      d="M101.79 506.72a.35.35 0 01.25.1l1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H96.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="515.28">
                  Overview
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 531.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="539.28">
                  No selection
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="tf-no-selection" style={{ opacity: tfNoSelectionOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 523)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 531.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="539.28">
                  No selection
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 555.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="563.28">
                  Afternoon
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="tf-afternoon" style={{ opacity: tfAfternoonOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 547)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 555.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="563.28">
                  Afternoon
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#37D5D3"
                    fillRule="evenodd"
                    d="M97.14 579.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="110" y="587.28">
                  All day
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <motion.g id="tm-all-day" style={{ opacity: tfAllDayOpacity }}>
          <g>
            <path fill="#1EA7FD" d="M0 0h251v24H0z" transform="translate(41 571)" />
            <g>
              <g>
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M97.14 579.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#fff"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                fontWeight="bold"
                letterSpacing="0em"
              >
                <tspan x="110" y="587.28">
                  All day
                </tspan>
              </text>
            </g>
          </g>
        </motion.g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M71.19 607l-3.5-3.5v7l3.5-3.5z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 602.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="611.28">
                  DatePicker
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g>
          <path fill="#F6F9FC" d="M0 0h251v24H0z" transform="translate(41 595)" />
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill="#7A858E"
                    fillOpacity="0.5"
                    fillRule="evenodd"
                    d="M69 609l3.5-3.5h-7L69 609z"
                    clipRule="evenodd"
                  />
                </g>
                <g>
                  <path
                    fill="#1EA7FD"
                    fillRule="evenodd"
                    d="M80.5 602.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H80.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
              <text
                fill="#333"
                xmlSpace="preserve"
                style={{ whiteSpace: 'pre' }}
                fontFamily="Nunito Sans"
                fontSize="13"
                letterSpacing="0em"
              >
                <tspan x="93" y="611.28">
                  DatePicker
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <g>
              <g>
                <g fill="#FFAE00">
                  <path d="M98.57 629.57a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm0 1.43a.36.36 0 000 .72h2.86a.36.36 0 100-.72h-2.86zm-.36 1.79c0-.2.16-.36.36-.36h2.86a.36.36 0 110 .72h-2.86a.36.36 0 01-.36-.36z" />
                  <path
                    fillRule="evenodd"
                    d="M101.79 626.72c.06 0 .12.01.17.04l.05.03.03.03 1.42 1.43c.07.06.11.15.11.25v6.43c0 .2-.16.36-.36.36H96.8a.36.36 0 01-.36-.36v-7.86c0-.2.16-.35.36-.35h5zm-4.65 7.85v-7.14h4.29v1.07c0 .2.16.36.36.36h1.07v5.71h-5.72z"
                    clipRule="evenodd"
                  />
                </g>
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="635.28">
                Overview
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
                  fill="#37D5D3"
                  fillRule="evenodd"
                  d="M97.14 651.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="659.28">
                No selection
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
                  fill="#37D5D3"
                  fillRule="evenodd"
                  d="M97.14 675.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="683.28">
                One week
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
                  fill="#37D5D3"
                  fillRule="evenodd"
                  d="M97.14 699.07c0-.2.16-.36.36-.36h5c.2 0 .36.16.36.36v8.57a.36.36 0 01-.36.36.35.35 0 01-.25-.1l-2.25-2.25-2.25 2.25a.35.35 0 01-.58-.12.36.36 0 01-.03-.14v-8.57zm2.6 5.82a.36.36 0 01.51 0l1.9 1.9v-7.36h-4.3v7.35l1.9-1.89z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="707.28">
                Last day
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M53 729l3.5-3.5h-7L53 729z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#6F2CAC"
                  fillRule="evenodd"
                  d="M66.7 725.22l-1.07-1.08h-2.2v5.72h7.14v-4.64H66.7zm.3-.72l-.86-.86a.71.71 0 00-.5-.2h-2.57c-.2 0-.36.15-.36.35v6.43c0 .2.16.35.36.35h7.86c.2 0 .36-.16.36-.35v-5.36c0-.2-.16-.36-.36-.36H67z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="77" y="731.28">
                Interstitial
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M71.19 751l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#6F2CAC"
                  fillRule="evenodd"
                  d="M82.7 749.22l-1.07-1.08h-2.2v5.72h7.14v-4.64H82.7zm.3-.72l-.86-.86a.71.71 0 00-.5-.2h-2.57c-.2 0-.36.15-.36.35v6.43c0 .2.16.35.36.35h7.86c.2 0 .36-.16.36-.35v-5.36c0-.2-.16-.36-.36-.36H83z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="93" y="755.28">
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M69 777l3.5-3.5h-7L69 777z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#6F2CAC"
                  fillRule="evenodd"
                  d="M82.7 773.22l-1.07-1.08h-2.2v5.72h7.14v-4.64H82.7zm.3-.72l-.86-.86a.71.71 0 00-.5-.2h-2.57c-.2 0-.36.15-.36.35v6.43c0 .2.16.35.36.35h7.86c.2 0 .36-.16.36-.35v-5.36c0-.2-.16-.36-.36-.36H83z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="93" y="779.28">
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M88.19 799l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#1EA7FD"
                  fillRule="evenodd"
                  d="M97.5 794.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H97.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="803.28">
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M88.19 823l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#1EA7FD"
                  fillRule="evenodd"
                  d="M97.5 818.72c-.99 0-1.79.8-1.79 1.78v5c0 .99.8 1.79 1.79 1.79h5c.99 0 1.79-.8 1.79-1.79v-5c0-.98-.8-1.78-1.79-1.78h-5zm6.07 3.93h-3.21v-3.22h2.14c.6 0 1.07.48 1.07 1.07v2.15zm0 .71v2.14c0 .6-.48 1.07-1.07 1.07h-2.14v-3.21h3.21zm-3.93 3.21v-3.21h-3.21v2.14c0 .6.48 1.07 1.07 1.07h2.14zm-3.21-3.92h3.21v-3.22H97.5c-.6 0-1.07.48-1.07 1.07v2.15z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="110" y="827.28">
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
                  fill="#7A858E"
                  fillOpacity="0.5"
                  fillRule="evenodd"
                  d="M71.19 847l-3.5-3.5v7l3.5-3.5z"
                  clipRule="evenodd"
                />
              </g>
              <g>
                <path
                  fill="#6F2CAC"
                  fillRule="evenodd"
                  d="M82.7 845.22l-1.07-1.08h-2.2v5.72h7.14v-4.64H82.7zm.3-.72l-.86-.86a.71.71 0 00-.5-.2h-2.57c-.2 0-.36.15-.36.35v6.43c0 .2.16.35.36.35h7.86c.2 0 .36-.16.36-.35v-5.36c0-.2-.16-.36-.36-.36H83z"
                  clipRule="evenodd"
                />
              </g>
            </g>
            <text
              fill="#333"
              xmlSpace="preserve"
              style={{ whiteSpace: 'pre' }}
              fontFamily="Nunito Sans"
              fontSize="13"
              letterSpacing="0em"
            >
              <tspan x="93" y="851.28">
                Modal
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </g>
  </g>
);
