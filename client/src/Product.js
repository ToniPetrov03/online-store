import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    height: 350,
    width: 270,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function Product({
  id, name, price,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
      />
      {/* <CardMedia */}
      {/*  className={classes.media} */}
      {/*  title={name} */}
      {/* /> */}
      <CardContent>
        <Typography paragraph>
          Price:
          {' '}
          {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          component={Link}
          to={`/product-info/${id}`}
        >
          Show more
        </Button>
      </CardActions>
    </Card>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
