import React, {useState, useEffect} from 'react'
import './App.css';
import Home from './Home';
import Catalog from './Catalog';
import Item from './Item';
import Error from './Error';
import Footer from "./components/Footer";
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';

export default function App() {
  const [temp, setTemp] = useState(true)
  useEffect(() => {
    if (typeof Node === 'function' && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function(child) {
        if (child.parentNode !== this) {
          if (console) {
            console.error('Cannot remove a child from a different parent', child, this);
          }
          return child;
        }
        return originalRemoveChild.apply(this, arguments);
      }
    
      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.error('Cannot insert before a reference node from a different parent', referenceNode, this);
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments);
      }
    }
  }, [temp])

  return (
    <div className="app">
      <div className="page">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/item/:slug" component={Item}/>
            <Route exact path="/shop/:collection" component={Catalog}/>
            <Route exact path="/shop/:collection/:category" component={Catalog}/>
            <Route exact path="/shop/:collection/:category/:subcategory" component={Catalog}/>
            <Route component={Error}/>
          </Switch>
        </Router>
      </div>
      <Footer/>
    </div>
  )
}