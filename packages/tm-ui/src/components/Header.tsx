/**@jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { colors } from '../assets/colors';
import { Icon } from '../assets/icons';
import { navigate } from '@reach/router';

const Header = () => {
  return (
    <header
      css={css`
        display: flex;
        justify-content: center;
        padding: 1rem 2rem;
        background-color: ${colors.primary};
        color: ${colors.textOnPrimary};
        align-items: center;
      `}
    >
      <h1
        css={css`
          margin: 0;
          flex: 1;
          text-align: center;
        `}
      >
        Templates
      </h1>
      <div
        css={css`
          display: flex;
          justify-content: end;
          cursor: pointer;
        `}
        onClick={() => {
          navigate('/');
        }}
      >
        <Icon name="house-user"></Icon>
      </div>
    </header>
  );
};

export default Header;
