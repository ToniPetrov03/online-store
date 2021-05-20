import React from 'react';
import {
  Container,
  Typography,
  makeStyles,
} from '../ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Footer</Typography>
        <Typography variant="body2" color="textSecondary" component={Link} to="/" className={classes.link}>
          Online store
        </Typography>
      </Container>
    </footer>
  );
}
