import React from 'react';
import {
  AppBar as MaterialAppBar,
  Toolbar as MaterialToolbar,
  Card as MaterialCard,
  CardHeader as MaterialCardHeader,
  CardMedia as MaterialCardMedia,
  CardActions as MaterialCardActions,
} from '@material-ui/core';

export const AppBar = (props) => <MaterialAppBar {...props} />;
export const Toolbar = (props) => <MaterialToolbar {...props} />;
export const Card = (props) => <MaterialCard {...props} />;
export const CardHeader = (props) => <MaterialCardHeader {...props} />;
export const CardMedia = (props) => <MaterialCardMedia {...props} />;
export const CardActions = (props) => <MaterialCardActions {...props} />;
