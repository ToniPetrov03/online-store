import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import {
  fetchProducts, selectAll, selectStatus, selectError,
} from './productsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
  },
}));

export default function ProductList() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const products = useSelector(selectAll);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (status === 'succeeded') {
    content = products.map(({
      id, name, price, img,
    }) => <Product key={id} id={id} name={name} price={price} image={img} />);
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Grid
          container
          className={classes.root}
          justify="center"
        >
          {content}
        </Grid>
      </div>
    </Container>
  );
}
