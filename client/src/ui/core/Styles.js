import React from 'react';
import {
  makeStyles as materialMakeStyles,
  withStyles as materialWithStyles,
  createMuiTheme as materialCreateMuiTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core/styles';

export const makeStyles = (props) => materialMakeStyles(props);
export const withStyles = (props) => materialWithStyles(props);
export const createMuiTheme = (props) => materialCreateMuiTheme(props);
export const ThemeProvider = (props) => <MaterialThemeProvider {...props} />;
