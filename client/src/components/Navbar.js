import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Drawer,
  ListItemIcon,
  ListItemText,
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
  TextField,
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
import useDebounce from '../hooks/use-debounce';
import { API_URL } from '../constants';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    display: 'flex',
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
  search: {
    cursor: 'pointer',
    padding: '17px'
  }
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
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios.get(`${API_URL}/products?name=${searchTerm}`).then(results => setResults(results.data));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
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
          <Menu/>
        </IconButton>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <List className={classes.list}>
            <Typography variant="h6">
              Online store
            </Typography>
            <Divider/>
            <ListItem button key="home" component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <Store/>
              </ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItem>
            <Divider/>
            <ListItem button key="profile" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <AccountCircle/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItem>
            <Divider/>
            <ListItem button key="inbox" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <Email/>
              </ListItemIcon>
              <ListItemText primary="Inbox"/>
            </ListItem>
            <Divider/>
            <ListItem button key="add-product" component={Link} to="/add-product" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <AddCircle/>
              </ListItemIcon>
              <ListItemText primary="Add product"/>
            </ListItem>
            <Divider/>
            <ListItem button key="settings" onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <Settings/>
              </ListItemIcon>
              <ListItemText primary="Settings"/>
            </ListItem>
            <Divider/>
          </List>
        </Drawer>
        <Typography className={classes.title} variant="h6" component={Link} to="/">
          Online store
        </Typography>
        <div className={classes.root}>
          <Autocomplete
            freeSolo
            style={{ width: 300 }}
            options={results.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search..."
                margin="normal"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}

              />
            )}
          />
          <Search className={classes.search}/>
        </div>
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
            <ShoppingCartOutlined fontSize="large" aria-label="cart" className={classes.cart}/>
          </StyledBadge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
