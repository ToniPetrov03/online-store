import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedItemId: null,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
    },
    selectItemId: {
      reducer(state, action) {
        state.selectedItemId = action.payload;
      },
    },
  },
});

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products;

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
