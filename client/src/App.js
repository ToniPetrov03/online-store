import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import {
  CssBaseline,
} from '@material-ui/core'
import Navbar from './Navbar';
import Products from './Products';
import AddProductForm from './AddProductForm';
import ProductInfo from './ProductInfo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Footer from './Footer';

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
