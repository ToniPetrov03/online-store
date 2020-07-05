import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { API_URL } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function CreateForm() {
  const classes = useStyles();

  const [productInfo, setProductInfo] = useState({ name: '', description: '', price: 0 });

  const handleNameChange = (e) => setProductInfo({ ...productInfo, name: e.target.value });
  const handleDescriptionChange = (e) => setProductInfo({ ...productInfo, description: e.target.value });
  const handlePriceChange = (e) => setProductInfo({ ...productInfo, price: e.target.value });
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
      />
      <TextField
        id="outlined-textarea"
        label="Description"
        multiline
        variant="outlined"
        onChange={handleDescriptionChange}
      />
      <TextField
        id="outlined-textarea"
        label="Price"
        variant="outlined"
        type="number"
        onChange={handlePriceChange}
      />
      <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload image
          </Button>
        </label>
      </div>
      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}

export default CreateForm;
