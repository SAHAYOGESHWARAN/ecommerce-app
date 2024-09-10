import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import ProductUpload from './components/Product/ProductUpload';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/products" component={ProductList} exact />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/upload" component={ProductUpload} />
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
};

export default App;
