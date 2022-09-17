import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: "",
    };
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

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.props.cart.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <h2>{item.brand}</h2>
                <h3>{item.name}</h3>
                {item.prices
                  .filter(
                    (price) => price.currency.label === this.props.currency
                  )
                  .map((price, index) => {
                    return (
                      <p key={index}>
                        {parseFloat((price.amount * item.qty).toFixed(2))}
                        <span>{price.currency.symbol}</span>
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
                  className="decrease-qty"
                  onClick={() => this.props.onQtyDecrease(item)}
                >
                  -
                </button>
                <p>{item.qty}</p>
                <button
                  className="increase-qty"
                  onClick={() => this.props.onQtyIncrease(item)}
                >
                  +
                </button>
                <br />
                <button
                  className="remove-cart-item"
                  onClick={() => this.props.onCartItemDelete(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <div>
          <p>Total:</p>
          {<p>{this.totalPrice()}</p>}
        </div>
      </div>
    );
  }
}
