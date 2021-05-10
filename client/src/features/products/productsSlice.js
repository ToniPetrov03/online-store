import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../constants';
import uploadFile from '../../utils/uploadFile';

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
  const imageUploads = product.images.map(async (image) => {
    const uploadedImage = await uploadFile(image, 'products');
    return { ...uploadedImage, main: image.main };
  });

  product.images = await Promise.all(imageUploads);

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
      state.items.push(...action.payload);
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
      state.items.unshift(action.payload);
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
