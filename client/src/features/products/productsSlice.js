import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../constants';

const initialState = {
  items: [],
  selectedProductId: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
});

export const addToCart = createAsyncThunk('products/addToCart', () => axios.get(`${API_URL}/products`));

export const addNewProduct = createAsyncThunk('posts/addNewProduct', async (product) => {
  const { files } = product;
  console.log(files);
  product.imgs = files.map((file) => {
    // get s3 url from backend
    // upload to that url
    // get url
    const url = 'https://upload.wikimedia.org/wikipedia/'
      + 'commons/thumb/a/a1/Fragaria_%C3%97_ananassa.JPG/220px-Fragaria_%C3%97_ananassa.JPG';
    const { name } = file;
    return { url, name };
  });
  delete product.files;

  const res = await axios.post(`${API_URL}/products`, product);
  return res.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = state.items.concat(action.payload);
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [addNewProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = state.items.unshift(action.payload);
    },
    [addNewProduct.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default productsSlice.reducer;

export const selectAll = (state) => state.products.items;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
