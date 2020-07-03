import { css } from '/web_modules/@emotion/core.js';
import { colors } from '../colors/index.js';
import { fonts } from '../fonts/index.js';
const globalStyles = css`
  html body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Lato', sans-serif;
  }

  h1 {
    font-size: ${fonts.h1};
  }
  h2 {
    font-size: ${fonts.h2};
  }
  h3 {
    font-size: ${fonts.h3};
  }
  h4 {
    font-size: ${fonts.h4};
  }
  h5 {
    font-size: ${fonts.h5};
  }

  p.span {
    font-size: ${fonts.paragraph};
  }
  #root {
    background-color: ${colors.background};
    margin: 0 0;
    width: 100%;
  }
`;
export { globalStyles };
