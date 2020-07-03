/** @jsx jsx */
import Header from './components/Header.js';
import React from '/web_modules/react.js';
import { jsx, Global } from '/web_modules/@emotion/core.js';
import { globalStyles } from './assets/css/global.js';
import { Router } from '/web_modules/@reach/router.js';
import Home from './components/Home.js';
import EditTemplate from './components/EditTemplate.js';

const App = ({}) => {
  return jsx(
    React.Fragment,
    null,
    jsx(Global, {
      styles: globalStyles,
    }),
    jsx(Header, null),
    jsx(
      Router,
      null,
      jsx(Home, {
        path: '/',
      }),
      jsx(EditTemplate, {
        path: ':template',
      }),
      jsx(EditTemplate, {
        path: 'add',
      }),
    ),
  );
};

export default App;
