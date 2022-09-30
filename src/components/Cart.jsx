import React, { Component } from "react";
import ImagesSlider from "./ImagesSlider";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: {},
    };
  }

  totalPrice() {
    let totalPrice = 0;
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
                      <h4>{char}:</h4>
                      <div style={{ display: "flex" }}>
                        {item.attributes
                          .filter((att) => att.name === char)[0]
                          ?.items.map((i, index) => {
                            return (
                              <div key={index}>
                                {char !== "Color" ? (
                                  <div className="button">
                                    {i.value === value ? (
                                      <label
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                      >
                                        {i.value}
                                      </label>
                                    ) : (
                                      <label>{i.value}</label>
                                    )}
                                  </div>
                                ) : (
                                  <div className="button-clr">
                                    {i.value === value ? (
                                      <label
                                        style={{
                                          backgroundColor: i.value,
                                          outline: "2px solid #5ece7b",
                                        }}
                                      ></label>
                                    ) : (
                                      <label
                                        style={{ backgroundColor: i.value }}
                                      ></label>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="qty-container">
                <button
                  className="increase-qty"
                  onClick={() => this.props.onQtyIncrease(item)}
                >
                  <img src={plus} alt="plus" />
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
                  <img src={minus} alt="minus" />
                </button>
              </div>

              <ImagesSlider item={item} index={index} cart={this.props.cart} />
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

export default Cart;
