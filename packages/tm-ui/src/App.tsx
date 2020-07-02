/** @jsx jsx */
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import { jsx, css, Global } from '@emotion/core';
import { globalStyles } from './assets/css/global';
import { Router } from '@reach/router';
import Home from './components/Home';
import EditTemplate from './components/EditTemplate';

interface AppProps {}

const App: React.FC<AppProps> = ({}: AppProps) => {
  return (
    <React.Fragment>
      <Global styles={globalStyles}></Global>
      <Header />
      <Router>
        <Home path="/"></Home>
        <EditTemplate path=":template"></EditTemplate>
        <EditTemplate path="add"></EditTemplate>
      </Router>
    </React.Fragment>
  );
};

export default App;
