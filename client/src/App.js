import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Drawer,
  ListItemIcon,
  ListItemText,
  InputBase,
  Paper,
  withStyles,
  makeStyles,
  Button,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  Badge,
  ButtonGroup,
  Divider,
} from '@material-ui/core'
import {
  ShoppingCartOutlined,
  AddCircle,
  Menu,
  Search,
  Store,
  AccountCircle,
  Email,
  Settings,
} from '@material-ui/icons'
import {
  amber,
} from '@material-ui/core/colors';
import Products from './Products';
import AddProductForm from './AddProductForm';
import ProductInfo from './ProductInfo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    color: 'unset',
  },
  list: {
    width: 250,
  },
  cart: {
    color: amber[300],
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginLeft: theme.spacing(3),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
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
    <BrowserRouter>
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
            <Menu />
          </IconButton>
          <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            <List className={classes.list}>
              <Typography variant="h6">
                Online store
              </Typography>
              <Divider />
              <ListItem button key="home" component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <Divider />
              <ListItem button key="profile" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <Divider />
              <ListItem button key="inbox" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <Divider />
              <ListItem button key="add-product" component={Link} to="/add-product" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Add product" />
              </ListItem>
              <Divider />
              <ListItem button key="settings" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <Divider />
            </List>
          </Drawer>
          <Typography className={classes.title} variant="h6" component={Link} to="/">
              Online store
          </Typography>
          <Paper component="form" className={classes.root} variant="outlined">
            <InputBase
              className={classes.input}
              placeholder="Search..."
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
          <div className={classes.grow}/>
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
              <ShoppingCartOutlined fontSize="large" aria-label="cart" className={classes.cart} />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

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
