import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { CircularProgress } from '@material-ui/core';
import { addNewProduct, selectStatus } from './productsSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2.6),
  },
  input: {
    display: 'none',
  },
  media: {
    height: 253,
    width: 215,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  style: {
    color: lightGreen,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: 'relative',
  },
}));

export default function AddProductForm() {
  const loading = useSelector(selectStatus) === 'loading';
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        addNewProduct({
          name, description, price, img,
        }),
      );
      unwrapResult(resultAction);
      setName('');
      setDescription('');
      setPrice('');
      setImg('');
    } catch (err) {
      // TODO: toaster
      console.error('Failed to add product: ', err);
    }
  };

  const onImgChanged = () => {
    // get s3 url from backend
    // upload to that url
    // get url

    setImg('https://upload.wikimedia.org/wikipedia/'
      + 'commons/thumb/a/a1/Fragaria_%C3%97_ananassa.JPG/220px-Fragaria_%C3%97_ananassa.JPG');
  };

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);

  const onCancelBtnClick = () => window.history.back();

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add product
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                id="name"
                label="Name"
                variant="outlined"
                required
                fullWidth
                name="name"
                onChange={onNameChanged}
                value={name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="price"
                id="price"
                label="Price"
                variant="outlined"
                required
                fullWidth
                type="number"
                name="price"
                onChange={onPriceChanged}
                value={price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="description"
                multiline
                id="description"
                label="Description"
                rows={3}
                required
                fullWidth
                variant="outlined"
                name="description"
                onChange={onDescriptionChanged}
                value={description}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12} sm={6}>
              <Card elevation={2} className={classes.media}>
                {img ? (
                  <CardMedia className={classes.media} image={img} />
                ) : (
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      No image
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={10}>
                <Grid item>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={onImgChanged}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span" size="small">
                      {img ? 'Change' : 'Choose'}
                      {' '}
                      image
                    </Button>
                  </label>
                </Grid>
                <Grid item />
                <Grid item />
              </Grid>
              <Grid container spacing={1} className={classes.root}>
                <Grid item className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                  >
                    Add
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} color="primary" />}
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={onCancelBtnClick}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
