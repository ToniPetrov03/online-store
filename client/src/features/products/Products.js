import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { API_URL } from '../../constants';
import Product from './components/Product';

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

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((res) => setProducts(res.data));
  }, []);

  const classes = useStyles();
  return (
    <Container component="main">
      <div className={classes.paper}>
        <Grid
          container
          className={classes.root}
          justify="center"
        >
          {products.map(({
            id, name, price, img,
          }) => <Product key={id} id={id} name={name} price={price} image={img} />)}
        </Grid>
      </div>
    </Container>
  );
}
