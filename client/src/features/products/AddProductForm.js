import React, { useState } from 'react';
import axios from 'axios';
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
import { API_URL } from '../../constants';

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
}));

export default function AddProductForm() {
  const [productInfo, setProductInfo] = useState({
    name: '', description: '', price: 0, img: '',
  });

  const handleChange = (e) => setProductInfo({ ...productInfo, [e.target.name]: e.target.value });

  const handleImgChange = () => {
    // get s3 url from backend
    // upload to that url
    // get url
    const img = 'https://upload.wikimedia.org/wikipedia/'
      + 'commons/thumb/a/a1/Fragaria_%C3%97_ananassa.JPG/220px-Fragaria_%C3%97_ananassa.JPG';

    setProductInfo({ ...productInfo, img });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/products`, productInfo);
  };

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12} sm={6}>
              <Card elevation={2} className={classes.media}>
                {productInfo.img ? (
                  <CardMedia className={classes.media} image={productInfo.img} />
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
                    onChange={handleImgChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span" size="small">
                      {productInfo.img ? 'Change' : 'Choose'}
                      {' '}
                      image
                    </Button>
                  </label>
                </Grid>
                <Grid item />
                <Grid item />
              </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.submit}
                  >
                    Add
                  </Button>
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
