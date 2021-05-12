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

  if (status === 'failed') {
    content = <div>{error}</div>;
  } else {
    content = (products.length ? products : [...new Array(12)])
      .map((product, index) => (
        <Product
          key={product?.id || index}
          id={product?.id}
          name={product?.name}
          price={+product?.price}
          image={product?.images?.find((img) => img.main)?.url}
          loading={status === 'loading'}
        />
      ));
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
