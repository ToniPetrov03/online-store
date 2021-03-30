import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import {
  CssBaseline,
} from '@material-ui/core';
import Navbar from './components/Navbar';
import Products from './features/products/Products';
import AddProductForm from './features/products/AddProductForm';
import ProductInfo from './features/products/ProductInfo';
import SignInForm from './features/registration/SignInForm';
import SignUpForm from './features/registration/SignUpForm';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />

      <Switch>
        <Route path="/sign-in" component={SignInForm} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/add-product" component={AddProductForm} />
        <Route path="/product-info/:id" component={ProductInfo} />
        <Route path="/" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}
