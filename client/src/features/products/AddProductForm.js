import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { CircularProgress } from '@material-ui/core';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useSnackbar } from 'notistack';
import { addNewProduct, selectStatus } from './productsSlice';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

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
  filepond: {
    marginBottom: 0,
  },
}));

export default function AddProductForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const loading = useSelector(selectStatus) === 'loading';
  const dispatch = useDispatch();

  const maxFiles = 5;
  const labelIdleHtml = '<em style="color: blue; text-decoration: underline; cursor: pointer">upload</em>';
  const initialLabelIdle = `You have to ${labelIdleHtml} at least one image.`;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [labelIdle, setLabelIdle] = useState(initialLabelIdle);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = enqueueSnackbar('Please wait...', { variant: 'info', persist: true });

    try {
      const resultAction = await dispatch(
        addNewProduct({
          name, description, price, files,
        }),
      );
      unwrapResult(resultAction);
      enqueueSnackbar('Successfully added product', { variant: 'success' });
      setName('');
      setDescription('');
      setPrice('');
      setFiles([]);
    } catch (err) {
      enqueueSnackbar('Failed to add product', { variant: 'error' });
      console.error(err);
    }

    closeSnackbar(key);
  };

  const onNameChanged = (e) => setName(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onUpdateFiles = (fileItems) => {
    setFiles(fileItems.map(({ file }) => file));

    const leftFiles = maxFiles - fileItems.length;

    setLabelIdle(fileItems.length
      ? `You can ${labelIdleHtml} ${leftFiles} more extra image${leftFiles > 1 ? 's' : ''}.`
      : initialLabelIdle);
  };

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
            <Grid item xs={12}>
              <FilePond
                allowMultiple
                allowReorder
                dropOnPage
                required
                credits
                maxFiles={maxFiles}
                files={files}
                className={classes.filepond}
                onupdatefiles={onUpdateFiles}
                acceptedFileTypes={['image/*']}
                labelIdle={labelIdle}
                labelFileProcessing
                labelFileLoading
                imagePreviewHeight={156}
              />
            </Grid>
            <Grid item container justify="flex-end">
              <Button
                className={classes.buttonWrapper}
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
              >
                Add product
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
