import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { API_URL } from './constants';
import Product from './Product';
import image from './1588745514029.jpeg';

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
    setProducts([{id: 1, name: 'Paso', price: 4.32, image: image}])
    // axios.get(`${API_URL}/products`).then((res) => setProducts(res.data));
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
            id, name, price, image,
          }) => {
            // const image = String.fromCharCode.apply(null, new Uint8Array(img.data));
            return <Product key={id} id={id} name={name} price={price} image={image} />;
          })}
        </Grid>
      </div>
    </Container>
  );
}
