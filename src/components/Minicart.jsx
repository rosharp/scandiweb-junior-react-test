import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import ImagesSlider from "./ImagesSlider";
import Overlay from "./Overlay";
import emptyCartDark from "../images/empty-cart-dark.svg";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";

export default class Minicart extends Cart {
  constructor(props) {
    super(props);
    this.totalPrice = this.totalPrice.bind(this);
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
        <button onClick={this.props.toggleMinicart}>
          <img src={emptyCartDark} alt="empty-cart" />
        </button>
        {this.props.showMinicart ? (
          <div className="cart minicart">
            <div>
              <h2>Items in bag: {this.props.cart.length}</h2>
            </div>
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
                      <img src={plus} />
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
                      <img src={minus} />
                    </button>
                  </div>

                  <ImagesSlider item={item} index={index} cart={this.props.cart} />
                </div>
              );
            })}

            <div className="cart-total-container">
              <p>Total:</p>
              {<p>{this.totalPrice()}</p>}
              <Link to="/cart">
                <button onClick={this.props.toggleMinicart}>View Bag</button>
              </Link>
              <Link to="/checkout">
                <button onClick={this.props.toggleMinicart}>Checkout</button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
