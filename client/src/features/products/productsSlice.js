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
  },
});

export default productsSlice.reducer;

export const selectAll = (state) => state.products.items;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
