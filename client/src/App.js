import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Products from './Products';
import CreateForm from './CreateForm';
import ProductInfo from './ProductInfo';


function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to="/create">create</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/create" component={CreateForm} />
        <Route path="/product-info/:id" component={ProductInfo} />
      </Switch>
    </Router>
  );
}

export default App;
