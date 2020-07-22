import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { API_URL } from './constants';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

function Products() {
  const [products, setProducts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((res) => setProducts(res.data));
  }, []);

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
    >
      {products.map(({
        id, name, price, img,
      }) => {
        const arr = new Uint8Array(img.data);
        const image = String.fromCharCode.apply(null, arr);

        return <Product key={id} id={id} name={name} price={price} image={image} />;
      })}
    </Grid>
  );
}

export default Products;
