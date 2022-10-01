import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./components/Cart";
import withQuery from "./apollo/data";

class App extends Component {
  constructor() {
    super();

    this.setState = this.setState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.toggleCurrency = this.toggleCurrency.bind(this);
    this.toggleMinicart = this.toggleMinicart.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onQtyIncrease = this.onQtyIncrease.bind(this);
    this.onQtyDecrease = this.onQtyDecrease.bind(this);
    this.onCartItemDelete = this.onCartItemDelete.bind(this);

    this.state = JSON.parse(window.localStorage.getItem('scandiweb-state')) || {
      category: "all",
      currency: "USD",
      currencySymbol: "$",
      showCurrencySwitch: false,
      cartItems: [],
      showMessage: false,
      showMinicart: false,
    };
  }


  componentDidUpdate() {
    window.localStorage.setItem('scandiweb-state', JSON.stringify(this.state));
    if (this.state.showMessage) {
      setTimeout(() => this.setState({ showMessage: false }), 5000);
    }
  }

  setState(state) {
    window.localStorage.setItem('scandiweb-state', JSON.stringify({...this.state, state}));
    super.setState(state);
  }

  handleClick(e) {
    this.setState({ category: e.target.innerHTML });
  }

  toggleCurrency() {
    this.setState({
      showCurrencySwitch: this.state.showCurrencySwitch ? false : true,
    });
  }

  handleCurrency(currency, currencySymbol) {
    this.setState({ currency: currency, currencySymbol: currencySymbol });
  }

  toggleMinicart() {
    this.setState({ showMinicart: this.state.showMinicart ? false : true });
    this.state.showMinicart ? document.body.style.overflow = 'unset': document.body.style.overflow = 'hidden'
  }

  onAdd(product) {
    const exist = this.state.cartItems.find(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.chars) === JSON.stringify(product.chars)
    );

    if (exist) {
      this.setState({
        cartItems: this.state.cartItems.map((item) =>
          item.id === product.id &&
            JSON.stringify(item.chars) === JSON.stringify(product.chars)
            ? { ...exist, qty: exist.qty + 1 }
            : item
        ),
      });
    } else {
      this.setState({
        cartItems: [...this.state.cartItems, { ...product, qty: 1 }],
      });
    }

    this.setState({ showMessage: true });

    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 2000);
  }

  onQtyIncrease(product) {
    const exist = this.state.cartItems.find(
      (item) => item.name === product.name && item.chars === product.chars
    );

    if (exist) {
      this.setState({
        cartItems: this.state.cartItems.map((item) =>
          item.name === product.name && item.chars === product.chars
            ? { ...exist, qty: exist.qty + 1 }
            : item
        ),
      });
    }
  }

  onQtyDecrease(product) {
    const exist = this.state.cartItems.find(
      (item) => item.name === product.name && item.chars === product.chars
    );

    if (exist) {
      this.setState({
        cartItems: this.state.cartItems.map((item) =>
          item.name === product.name && item.chars === product.chars
            ? {
              ...exist,
              qty: exist.qty > 1 ? exist.qty - 1 : 1,
            }
            : item
        ),
      });
    }
  }

  onCartItemDelete(product) {
    this.setState({
      cartItems: this.state.cartItems.filter((item) => {
        return item.index !== product.index;
      }),
    });
  }

  render() {
    const data = this.props.dataValue;
    return (
        <div className="main">
          {data ? (
            <Router>
              <Navbar
                setCategory={this.handleClick}
                category={this.state.category}
                setCurrency={this.handleCurrency}
                toggleCurrency={this.toggleCurrency}
                showCurrencySwitch={this.state.showCurrencySwitch}
                currency={this.state.currency}
                currencySymbol={this.state.currencySymbol}
                dataValue={data}
                cart={this.state.cartItems}
                showMinicart={this.state.showMinicart}
                toggleMinicart={this.toggleMinicart}
                onAdd={this.onAdd}
                onQtyDecrease={this.onQtyDecrease}
                onQtyIncrease={this.onQtyIncrease}
                onCartItemDelete={this.onCartItemDelete}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      category={this.state.category}
                      currency={this.state.currency}
                      dataValue={this.props.dataValue}
                      onAdd={this.onAdd}
                      showMessage={this.state.showMessage}
                    />
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <Cart
                      dataValue={this.props.dataValue}
                      cart={this.state.cartItems}
                      onAdd={this.onAdd}
                      currency={this.state.currency}
                      currencySymbol={this.state.currencySymbol}
                      onQtyDecrease={this.onQtyDecrease}
                      onQtyIncrease={this.onQtyIncrease}
                      onCartItemDelete={this.onCartItemDelete}
                    />
                  }
                />

                {data.categories
                  .filter((category) => category.name === "all")[0]
                  .products.map((product, index) => {
                    return (
                      <Route
                        key={index}
                        path={"/products/" + product.id}
                        element={
                          <Product
                            id={product.id}
                            name={product.name}
                            brand={product.brand}
                            category={product.category}
                            attributes={product.attributes}
                            description={product.description}
                            gallery={product.gallery}
                            inStock={product.inStock}
                            currency={this.state.currency}
                            prices={product.prices}
                            cart={this.state.cartItems}
                            onAdd={this.onAdd}
                            showMessage={this.state.showMessage}
                          />
                        }
                      />
                    );
                  })}
              </Routes>
            </Router>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
    );
  }
}

export default withQuery(App);
