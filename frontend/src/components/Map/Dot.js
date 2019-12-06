import React, { PureComponent } from 'react';

class Dot extends PureComponent {
  render() {
    return (
      <svg class="pulse-svg" width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink">
        <circle cx="20" cy="20" fill="#1da1f2" r="5" stroke="#1da1f2" stroke-width="2">
          <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
        </circle>
        <circle cx="20" cy="20" fill="#4badeb" r="10"/>
      </svg>
    );
  }
}

export default Dot;