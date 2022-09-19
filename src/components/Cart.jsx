// TODO:
// increment/decrement img-index in state onClick
// and display each cart item component's image depending on the state

import React, { Component } from "react";
import withQuery from "../apollo/data.js"; 

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
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

  componentDidMount() {
    this.props.cart.forEach((item, index) => {
      this.state.images.push({"img-index": 0})
    })
  }


  render() {
    const data = this.props.dataValue;
    console.log(data)

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
                  onClick={() => item.qty > 1 ? this.props.onQtyDecrease(item) : this.props.onCartItemDelete(item)}
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
              </div>
              <div >
                <img src={item.gallery[0]} style={{ maxWidth: "10rem" }}/>
                <div>
                  <button>Prev</button>
                  <button>Next</button>
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
