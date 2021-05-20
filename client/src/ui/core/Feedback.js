import React from 'react';
import {
  CircularProgress as MaterialCircularProgress,
  Dialog as MaterialDialog,
  DialogActions as MaterialDialogActions,
  DialogContent as MaterialDialogContent,
  DialogContentText as MaterialDialogContentText,
  DialogTitle as MaterialDialogTitle,
} from '@material-ui/core';

export const CircularProgress = (props) => <MaterialCircularProgress {...props} />;
export const Dialog = (props) => <MaterialDialog {...props} />;
export const DialogActions = (props) => <MaterialDialogActions {...props} />;
export const DialogContent = (props) => <MaterialDialogContent {...props} />;
export const DialogContentText = (props) => <MaterialDialogContentText {...props} />;
export const DialogTitle = (props) => <MaterialDialogTitle {...props} />;
