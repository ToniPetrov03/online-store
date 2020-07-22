import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { amber, green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';

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

const GreenCheckbox = withStyles({
  root: {
    color: amber[300],
    '&$checked': {
      color: green[700],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Product({
  id, name, price, image,
}) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.root}>
      <CardHeader
        title={name}
      />
      <CardMedia
        className={classes.media}
        title={name}
        image={image}
      />
      <CardContent>
        <Typography paragraph>
          Price:
          {' '}
          {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <GreenCheckbox icon={<AddShoppingCartIcon />} checkedIcon={<RemoveShoppingCartIcon />} />
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
  image: PropTypes.string.isRequired,
};

export default Product;
