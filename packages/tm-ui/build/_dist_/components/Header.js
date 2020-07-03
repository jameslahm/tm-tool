/**@jsx jsx */
import { jsx, css } from '/web_modules/@emotion/core.js';
import { colors } from '../assets/colors/index.js';
import { Icon } from '../assets/icons/index.js';
import { navigate } from '/web_modules/@reach/router.js';

const Header = () => {
  return jsx(
    'header',
    {
      css: css`
        display: flex;
        justify-content: center;
        padding: 1rem 2rem;
        background-color: ${colors.primary};
        color: ${colors.textOnPrimary};
        align-items: center;
      `,
    },
    jsx(
      'h1',
      {
        css: css`
          margin: 0;
          flex: 1;
          text-align: center;
        `,
      },
      'Templates',
    ),
    jsx(
      'div',
      {
        css: css`
          display: flex;
          justify-content: end;
          cursor: pointer;
        `,
        onClick: () => {
          navigate('/');
        },
      },
      jsx(Icon, {
        name: 'house-user',
      }),
    ),
  );
};

export default Header;
