import React from 'react';
import { ThemeProvider } from 'styled-components';
// import AppRouter from 'src/AppRouter';
import './Normalise.scss';
import theme from 'src/theme';
import AppReduxWrapper from './AppReduxWrapper';

const AppThemeWrapper = () => (
  <ThemeProvider theme={theme}>
    <AppReduxWrapper />
  </ThemeProvider>
);

export default AppThemeWrapper;
