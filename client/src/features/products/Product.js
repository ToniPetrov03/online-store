import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Skeleton,
} from '../../ui/lab';
import {
  Card,
  Button,
  Divider,
  Checkbox,
  CardMedia,
  CardHeader,
  makeStyles,
  Typography,
  CardActions,
} from '../../ui/core';
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
} from '../../ui/icons';
import noImageAvailable from '../../images/no-image-available.jpg';

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
  priceSkeleton: {
    margin: '0 auto',
  },
  iconSkeleton: {
    margin: theme.spacing(1),
  },
  imagePreloader: {
    display: 'none',
    height: 0,
    width: 0,
  },
}));

export default function Product({
  id, name, price, image, loading,
}) {
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState(true);

  return loading
    ? (
      <Card elevation={3} className={classes.root}>
        <CardHeader
          title={<Skeleton animation="wave" />}
          action={(
            <Skeleton variant="rect" width={84.48} height={30} />
        )}
          titleTypographyProps={{
            className: classes.title,
          }}
        />
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <Typography variant="h5" className={classes.price}>
          <Skeleton animation="wave" width="40%" className={classes.priceSkeleton} />
        </Typography>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <Skeleton variant="circle" width={24} height={24} className={classes.iconSkeleton} />
          <Skeleton variant="circle" width={24} height={24} className={classes.iconSkeleton} />
          <Skeleton variant="rect" width={84.48} height={30} className={classes.details} />
        </CardActions>
      </Card>
    )
    : (
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
        <div className={classes.imagePreloader}>
          <img
            alt="preloader"
            src={image || noImageAvailable}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        {imageLoading
          ? <Skeleton animation="wave" variant="rect" className={classes.media} />
          : (
            <CardMedia
              className={classes.media}
              title={name}
              image={image || noImageAvailable}
            />
          )}
        <Typography variant="h5" paragraph className={classes.price}>
          $
          {price.toFixed(2)}
        </Typography>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <Checkbox icon={<FavoriteBorder color="secondary" />} checkedIcon={<Favorite />} />
          <Checkbox
            icon={<AddShoppingCart color="primary" />}
            checkedIcon={<RemoveShoppingCart color="action" />}
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
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
