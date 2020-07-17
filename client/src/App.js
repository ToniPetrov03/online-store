import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import StoreIcon from '@material-ui/icons/Store';
import Tooltip from '@material-ui/core/Tooltip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Products from './Products';
import AddProductForm from './AddProductForm';
import ProductInfo from './ProductInfo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.5),
  },
  style: {
    fill: 'white',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Tooltip title="Show products" aria-label="products" className={classes.margin}>
            <IconButton component={Link} to="/products">
              <StoreIcon className={classes.style} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add product" aria-label="add" className={classes.margin}>
            <IconButton component={Link} to="/add-product">
              <AddCircleOutlineIcon className={classes.style} />
            </IconButton>
          </Tooltip>
          <Button variant="outlined" color="inherit" className={classes.margin} component={Link} to="/sign-in">
            Sign in
          </Button>
          <Button variant="outlined" color="inherit" className={classes.margin} component={Link} to="/sign-up">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/sign-in" component={SignInForm} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/products" component={Products} />
        <Route path="/add-product" component={AddProductForm} />
        <Route path="/product-info/:id" component={ProductInfo} />
      </Switch>
    </Router>
  );
}
