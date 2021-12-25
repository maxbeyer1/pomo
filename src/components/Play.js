/* eslint-disable react/self-closing-comp */
import React from 'react';

const Play = ({ onPlayerClick }) => (
  <svg width="67px" height="67px" viewBox="0 0 67 67" onClick={onPlayerClick}>
    <defs>
      <path d="M35.5,2.95833333 C53.4722662,2.95833333 68.0416667,17.5277338 68.0416667,35.5 C68.0416667,53.4722662 53.4722662,68.0416667 35.5,68.0416667 C17.5277338,68.0416667 2.95833333,53.4722662 2.95833333,35.5 C2.95833333,17.5277338 17.5277338,2.95833333 35.5,2.95833333 Z M35.5,8.875 C20.7954185,8.875 8.875,20.7954185 8.875,35.5 C8.875,50.2045815 20.7954185,62.125 35.5,62.125 C50.2045815,62.125 62.125,50.2045815 62.125,35.5 C62.125,20.7954185 50.2045815,8.875 35.5,8.875 Z M31.2243214,21.2051845 L48.9743214,33.0385179 C50.7307818,34.2094914 50.7307818,36.7905086 48.9743214,37.9614821 L31.2243214,49.7948155 C29.258347,51.1054651 26.625,49.6961405 26.625,47.3333333 L26.625,23.6666667 C26.625,21.3038595 29.258347,19.8945349 31.2243214,21.2051845 Z M32.5416667,29.1943631 L32.5416667,41.8056369 L42.0001221,35.5 L32.5416667,29.1943631 Z" id="path-nkgpntseex-1"></path>
    </defs>
    <g id="Timer---Main-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="play-circle" transform="translate(-2.000000, -2.000000)">
        <mask id="mask-nkgpntseex-2" fill="white">
          <use xlinkHref="#path-nkgpntseex-1"></use>
        </mask>
        <use id="Combined-Shape" fill="#FB8484" fillRule="nonzero" xlinkHref="#path-nkgpntseex-1"></use>
        <g id="Group" mask="url(#mask-nkgpntseex-2)" fill="#FB8484">
          <g id="COLOR/-black">
            <rect id="Rectangle" x="0" y="0" width="71" height="71"></rect>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default Play;
