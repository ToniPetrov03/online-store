import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import { amber, lightGreen } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 345,
    width: 260,
  },
  cardHeader: {
    margin: theme.spacing(2),
    width: 200,
  },
  media: {
    height: 0,
    paddingTop: '67%',
  },
  price: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  details: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  title: {
    whiteSpace: 'nowrap',
    width: '140px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: amber[300],
    '&$checked': {
      color: lightGreen[300],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Product({
  id, name, price, image,
}) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.root}>
      <CardHeader
        title={name}
        action={(
          <Button
            size="small"
            color="secondary"
            variant="outlined"
          >
            Buy now
          </Button>
        )}
        titleTypographyProps={{
          className: classes.title,
        }}
      />
      <CardMedia
        className={classes.media}
        title={name}
        image={image}
      />
      <Typography variant="h5" paragraph className={classes.price}>
        $
        {price}
      </Typography>
      <Divider variant="middle" />
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        <GreenCheckbox
          icon={<RemoveShoppingCartIcon />}
          checkedIcon={<AddShoppingCartIcon />}
        />
        <Button
          size="small"
          color="primary"
          variant="outlined"
          component={Link}
          to={`/product-info/${id}`}
          className={classes.details}
        >
          Details
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
