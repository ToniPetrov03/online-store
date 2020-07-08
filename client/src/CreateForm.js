import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CardMedia from '@material-ui/core/CardMedia';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Card from '@material-ui/core/Card';
import { API_URL } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  media: {
    width: 180,
    height: 210,
  },
  area: {
    width: 437,
  },
  style: {
    fontSize: 45,
  },
}));

function CreateForm() {
  const classes = useStyles();

  const [productInfo, setProductInfo] = useState({
    name: '', description: '', price: 0, img: '',
  });

  const handleNameChange = (e) => setProductInfo({ ...productInfo, name: e.target.value });
  const handleDescriptionChange = (e) => setProductInfo({ ...productInfo, description: e.target.value });
  const handlePriceChange = (e) => setProductInfo({ ...productInfo, price: e.target.value });
  const handleUploadClick = (e) => {
    const [file] = e.target.files;

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => setProductInfo({ ...productInfo, img: reader.result }));
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/products`, productInfo);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleNameChange}
        className={classes.area}
      />
      <TextField
        id="outlined-textarea"
        label="Description"
        multiline
        rowsMax={3}
        variant="outlined"
        onChange={handleDescriptionChange}
        className={classes.area}
      />
      <TextField
        id="outlined-textarea"
        label="Price"
        variant="outlined"
        type="number"
        onChange={handlePriceChange}
        className={classes.area}
      />
      <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadClick}
        />
        {productInfo.img ? (
          <>
            <CardMedia className={classes.media} image={productInfo.img} />
            <label htmlFor="contained-button-file">
              <SwapHorizIcon className={classes.style} />
            </label>
          </>
        ) : (
          <>
            <Card elevation={3} className={classes.media}>
              No image
            </Card>
            <label htmlFor="contained-button-file">
              <AddPhotoAlternateIcon className={classes.style} />
            </label>
          </>
        )}
      </div>
      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}

export default CreateForm;
