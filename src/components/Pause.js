/* eslint-disable react/self-closing-comp */
import React from 'react';

const Pause = ({ onPlayerClick }) => (
  <svg width="66px" height="66px" viewBox="0 0 66 66" onClick={onPlayerClick}>
    <g id="Timer---Main-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="pause-button" transform="translate(0.833333, 0.833333)">
        <circle id="Oval" stroke="#FB8484" strokeWidth="6" cx="32.5" cy="32.5" r="29.5"></circle>
        <rect id="Rectangle" fill="#FB8484" x="21.6666667" y="17.3333333" width="7.22222222" height="30.3333333" rx="3.61111111"></rect>
        <rect id="Rectangle" fill="#FB8484" x="36.1111111" y="17.3333333" width="7.22222222" height="30.3333333" rx="3.61111111"></rect>
      </g>
    </g>
  </svg>
);

export default Pause;
