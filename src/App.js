import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Basket from './components/Basket';
import Order from './components/Order';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  /**
   * Initializing state of the App component
   * @products : Products in the store
   * @cartItems : Items added to the cart
   */
  UNSAFE_componentWillMount() {
    this.setState(
      {
        products: [],
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
      }
    );
  }

  /**
   * React routing to switch between Product, Cart and Order pages
   */
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/products" ></Redirect>
            <Route path="/products"
              render={(props) => (
                <Products {...props} products={this.state.products} />
              )}>
            </Route>

            <Route
              path="/basket"
              render={(props) => (
                <Basket {...props} cartItems={this.state.cartItems} />
              )}>
            </Route>
            <Route
              path="/order"
              render={(props) => (
                <Order {...props} cartItems={this.state.cartItems} />
              )}>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;