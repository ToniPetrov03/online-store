import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
import { Button } from '../../components';
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
  titleImgZone: {
    // eslint-disable-next-line max-len
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;',
  },
}));

export default function AddProductForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const loading = useSelector(selectStatus) === 'loading';
  const dispatch = useDispatch();

  const maxExtraImages = 4;
  const fancyUpload = '<em style="color: blue; text-decoration: underline; cursor: pointer">upload</em>';
  const initialLabelIdle = `You can ${fancyUpload} ${maxExtraImages} more extra image${maxExtraImages > 1 ? 's' : ''}.`;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [labelIdle, setLabelIdle] = useState(initialLabelIdle);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = enqueueSnackbar('Please wait...', { variant: 'info', persist: true });

    try {
      const resultAction = await dispatch(
        addNewProduct({
          name, description, price, images: [...mainImage, ...extraImages],
        }),
      );
      unwrapResult(resultAction);
      enqueueSnackbar('Successfully added product', { variant: 'success' });
      setName('');
      setDescription('');
      setPrice('');
      setMainImage([]);
      setExtraImages([]);
    } catch (err) {
      enqueueSnackbar('Failed to add product', { variant: 'error' });
    }

    closeSnackbar(key);
  };

  const onNameChanged = (e) => setName(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onUpdateMainImage = (files) => {
    if (files.length) {
      files[0].main = true;
    }

    setMainImage(files);
  };
  const onReorderExtraImages = (images) => setExtraImages(images);
  const onUpdateExtraImages = (images) => {
    setExtraImages(images);

    const leftImages = maxExtraImages - images.length;

    setLabelIdle(images.length
      ? `You can ${fancyUpload} ${leftImages} more extra image${leftImages === 1 ? '' : 's'}.`
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
              <Typography className={classes.titleImgZone}>Main image:</Typography>
              <FilePond
                id="MainImage"
                dropOnPage
                required
                credits
                maxFiles={1}
                files={mainImage}
                className={classes.filepond}
                onupdatefiles={onUpdateMainImage}
                acceptedFileTypes={['image/*']}
                labelIdle={`<span style="color: #f50057">Main image is required.</span> ${fancyUpload}`}
                imagePreviewHeight={256}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.titleImgZone}>Extra images:</Typography>
              <FilePond
                id="ExtraImages"
                allowMultiple
                allowReorder
                dropOnPage
                credits
                maxFiles={maxExtraImages}
                files={extraImages}
                className={classes.filepond}
                onupdatefiles={onUpdateExtraImages}
                onreorderfiles={onReorderExtraImages}
                acceptedFileTypes={['image/*']}
                labelIdle={labelIdle}
                imagePreviewHeight={128}
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
