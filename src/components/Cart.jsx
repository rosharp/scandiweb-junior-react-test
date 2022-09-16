import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: "",
    };
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
                {Object.entries(item.chars).map(([char, value], index) => {
                  return (
                    <div key={index}>
                      {
                          <p>{char}: {value}</p>
                      }
                    </div>
                  );
                })}
              </div>
              <div className="qty-container">
                <button className="decrease-qty" onClick={() => this.props.onQtyDecrease(item)}>-</button>
                <p>{item.qty}</p>
                <button className="increase-qty" onClick={() => this.props.onQtyIncrease(item)}>+</button>
                <br />
                <button className="remove-cart-item" onClick={() => this.props.onCartItemDelete(item)}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
