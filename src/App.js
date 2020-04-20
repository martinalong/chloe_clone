import React, { Component } from 'react'
import './App.css';
import Home from './Home';
import Catalog from './Catalog';
import Item from './Item';
import Cart from './Cart';
import Error from './Error';
import Footer from "./components/Footer";
import {Switch, BrowserRouter as Router, Route, useParams} from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <div className="page">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/item/:slug" component={Item}/>
            {/*inWishlist={this.inWishlist} inCart={this.inCart} addToWishlist={this.addToWishlist} addToCart={this.addToCart}*/}
            <Route exact path="/shop/:collection/:category" component={Catalog}/>
            <Route exact path="/shop/:collection/:category/:subcategory" component={Catalog}/>
            {/*<Route exact path="/cart" component={Cart}/>*/}
            <Route component={Error}/>
          </Switch>
        </Router>
      </div>
      <Footer/>
    </div>
  )
}
/*
export default class App extends Component {
  constructor(props) {
    super(props);
    this.inWishlist = this.inWishlist.bind(this);
    this.state = {
      cart: {},
      wishlist: [],
    }
  }

  inWishlist({code}) {
    return this.state.wishlist.includes(code);
  }

  inCart({code}) {
    return this.state.cart.includes(code);
  }

  addToWishlist({code}) {
    let wished = this.state.wishlist;
    if (this.state.wishlist.includes(code)) {
      wished.remove(code);
    } else {
      wished.append(code);
    }
    this.setState({wishlist: wished})
  }

  addToCart({code}) {
    let currCart = this.state.cart;
    currCart[code] = currCart.hasOwnProperty(code) ? currCart[code] + 1 : 1;
    this.setState({cart: currCart})
  }


  render() {
    return (
      <div className="app">
        <div className="page">
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/item/:slug">
                <Item inWishlist={this.inWishlist} inCart={this.inCart} addToWishlist={this.addToWishlist} addToCart={this.addToCart} code={slug}/>
              </Route> 
              <Route exact path="/shop/:slug" component={Catalog}/>
              <Route exact path="/cart" component={Cart}/>
              <Route component={Error}/>
            </Switch>
          </Router>
        </div>
        <Footer/>
      </div>
    );
  }
  
}
*/