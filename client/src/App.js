import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import amber from '@material-ui/core/colors/amber';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Products from './Products';
import AddProductForm from './AddProductForm';
import ProductInfo from './ProductInfo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'unset',
  },
  list: {
    width: 250,
  },
  cart: {
    color: amber[300],
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: 7,
    right: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function App() {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            <List className={classes.list}>
              <ListItem button key="add-product" component={Link} to="/add-product" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Add product" />
              </ListItem>
            </List>
          </Drawer>
          <Typography variant="h6" className={classes.title} component={Link} to="/products">
            Online store
          </Typography>
          <ButtonGroup color="inherit">
            <Button component={Link} to="/sign-in">
              Sign in
            </Button>
            <Button component={Link} to="/sign-up">
              Sign up
            </Button>
          </ButtonGroup>
          <IconButton>
            <StyledBadge badgeContent={0} max={99} color="secondary" showZero>
              <ShoppingCartOutlinedIcon fontSize="large" aria-label="cart" className={classes.cart} />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/sign-in" component={SignInForm} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/add-product" component={AddProductForm} />
        <Route path="/product-info/:id" component={ProductInfo} />
      </Switch>
    </Router>
  );
}
