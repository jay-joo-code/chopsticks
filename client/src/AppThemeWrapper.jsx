import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'src/styles/Normalise.scss';
import 'src/styles/Publishing.scss';
import theme from 'src/theme';
import AppReduxWrapper from './AppReduxWrapper';

const AppThemeWrapper = () => (
  <ThemeProvider theme={theme}>
    <AppReduxWrapper />
  </ThemeProvider>
);

export default AppThemeWrapper;
