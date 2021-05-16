import { Button as MaterialButton } from '@material-ui/core';

export const Button = (props) => <MaterialButton {...props}>{props.children}</MaterialButton>;
