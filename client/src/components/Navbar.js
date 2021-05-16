import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Drawer,
  ListItemIcon,
  ListItemText,
  withStyles,
  makeStyles,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  Badge,
  ButtonGroup,
  Divider,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import {
  ShoppingCartOutlined,
  AddCircle,
  Menu,
  Search,
  Store,
  AccountCircle,
  Email,
  Settings,
} from '@material-ui/icons';
import {
  amber,
} from '@material-ui/core/colors';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from './Button';
import useDebounce from '../hooks/use-debounce';
import { API_URL } from '../constants';

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
  search: {
    width: 300,
    marginLeft: theme.spacing(3),
  },
  searchField: {
    backgroundColor: 'white',
    marginTop: -8,
  },
  searchIcon: {
    cursor: 'pointer',
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios.get(`${API_URL}/products?name=${searchTerm}`).then((r) => setResults(r.data));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(open);
  };

  const classes = useStyles();
  return (
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
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
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
        <Autocomplete
          freeSolo
          disableClearable
          size="small"
          className={classes.search}
          options={results.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search..."
              margin="normal"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                ...params.InputProps,
                className: classes.searchField,
                endAdornment: (
                  <InputAdornment position="end">
                    <Search className={classes.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <div className={classes.grow} />
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
  );
}
