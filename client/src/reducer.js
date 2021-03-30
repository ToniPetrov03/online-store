import { combineReducers } from 'redux';
import shoppingCartReducer from './features/shoppingCart/cartSlice';

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
});

export default rootReducer;
