// TODO:
// increment/decrement img-index in state onClick
// and display each cart item component's image depending on the state

import React, { Component } from "react";
import withQuery from "../apollo/data.js";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handlePrevImg = this.handlePrevImg.bind(this);
    this.handleNextImg = this.handleNextImg.bind(this);
    this.state = {
      images: [],
      cart: "",
    };
  }

  handlePrevImg(index, item) {
    let images = [...this.state.images];
    let image = { ...images[index] };
    if (item.gallery[parseInt(Object.values(this.state.images[index])) - 1]) {
      image = parseInt(Object.values(image)) - 1;
    } else {
      image = item.gallery.length - 1;
    }
    console.log(item.gallery.length);
    images[index] = { imgIndex: image };
    this.setState({ images });
  }

  handleNextImg(index, item) {
    let images = [...this.state.images];
    let image = { ...images[index] };
    if (item.gallery[parseInt(Object.values(this.state.images[index])) + 1]) {
      image = parseInt(Object.values(image)) + 1;
    } else {
      image = 0;
    }
    images[index] = { imgIndex: image };
    this.setState({ images });
  }

  totalPrice() {
    let totalPrice = 0;
    let currentCurrency = this.props.cart[0]?.prices.filter(
      (price) => price.currency.label === this.props.currency
    )[0].currency.symbol;

    this.props.cart.forEach((item) => {
      totalPrice +=
        item.prices.filter(
          (price) => price.currency.label === this.props.currency
        )[0].amount * item.qty;
    });
    return parseFloat(totalPrice.toFixed(2)) + " " + this.props.currency;
  }

  componentWillUnmount() {
    this.setState({ images: [] });
  }

  render() {
    const data = this.props.dataValue;
    this.props.cart.forEach((item, index) => {
      this.state.images.push({ imgIndex: 0 });
    });

    return (
      <div className="cart">
        <h1>Cart</h1>
        {this.props.cart.map((item, index) => {
          return (
            <div key={index} className="cart-items-container">
              <div className="cart-chars">
                <h2>{item.brand}</h2>
                <h3>{item.name}</h3>
                {item.prices
                  .filter(
                    (price) => price.currency.label === this.props.currency
                  )
                  .map((price, index) => {
                    return (
                      <p key={index}>
                        <span>{price.currency.symbol}</span>
                        {parseFloat((price.amount * item.qty).toFixed(2))}
                      </p>
                    );
                  })}
                {Object.entries(item.chars).map(([char, value], index) => {
                  return (
                    <div key={index}>
                      {
                        <p>
                          {char}: {value}
                        </p>
                      }
                    </div>
                  );
                })}
              </div>
              <div className="qty-container">
                <button
                  className="increase-qty"
                  onClick={() => this.props.onQtyIncrease(item)}
                >
                  <span className="plus-x"></span>
                  <span className="plus-y"></span>
                </button>
                <p>{item.qty}</p>
                <button
                  className="decrease-qty"
                  onClick={() =>
                    item.qty > 1
                      ? this.props.onQtyDecrease(item)
                      : this.props.onCartItemDelete(item)
                  }
                >
                  <span></span>
                </button>
              </div>
              <div>
                <img
                  src={
                    item.gallery[
                      parseInt(Object.values(this.state.images[index]))
                    ]
                  }
                  style={{ maxWidth: "10rem" }}
                />
                <div>
                  <button onClick={() => this.handlePrevImg(index, item)}>
                    Prev
                  </button>
                  <button onClick={() => this.handleNextImg(index, item)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="cart-total-container">
          <p>Total:</p>
          {<p>{this.totalPrice()}</p>}
        </div>
      </div>
    );
  }
}

export default withQuery(Cart);
