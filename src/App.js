import React from 'react';
import './App.css';
import Home from './Home';
import Catalog from './Catalog';
import Piece from './Item';
import Cart from './Cart';
import Error from './Error';
import Footer from "./components/Footer";
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

/* End Pages */ 

function App() {
  return (
    <div className="app">
      <div className="page">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/shop/:slug" component={Catalog}/>
            <Route exact path="/:slug" component={Piece}/>
            <Route exact path="/cart" component={Cart}/>
            <Route component={Error}/>
          </Switch>
        </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;