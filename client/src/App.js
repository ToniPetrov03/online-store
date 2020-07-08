import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import StoreIcon from '@material-ui/icons/Store';
import Tooltip from '@material-ui/core/Tooltip';
import Products from './Products';
import CreateForm from './CreateForm';
import ProductInfo from './ProductInfo';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.5),
  },
  style: {
    fill: 'white',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Show products" aria-label="products" className={classes.margin}>
            <IconButton component={Link} to="/products">
              <StoreIcon className={classes.style} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create product" aria-label="create" className={classes.margin}>
            <IconButton component={Link} to="/create">
              <AddBoxSharpIcon className={classes.style} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/create" component={CreateForm} />
        <Route path="/product-info/:id" component={ProductInfo} />
      </Switch>
    </Router>
  );
}

export default App;
