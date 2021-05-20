import React from 'react';
import {
  Button as MaterialButton,
  ButtonGroup as MaterialButtonGroup,
  IconButton as MaterialIconButton,
  Checkbox as MaterialCheckbox,
  TextField as MaterialTextField,
  InputAdornment as MaterialInputAdornment,
  FormControlLabel as MaterialFormControlLabel,
} from '@material-ui/core';

export const Button = (props) => <MaterialButton {...props} />;
export const ButtonGroup = (props) => <MaterialButtonGroup {...props} />;
export const IconButton = (props) => <MaterialIconButton {...props} />;
export const Checkbox = (props) => <MaterialCheckbox {...props} />;
export const TextField = (props) => <MaterialTextField {...props} />;
export const InputAdornment = (props) => <MaterialInputAdornment {...props} />;
export const FormControlLabel = (props) => <MaterialFormControlLabel {...props} />;
