import React, { Component } from "react";
import { Link } from "react-router-dom";
import emptyCart from "../images/empty-cart.svg";
import Alert from "./Alert";
import Overlay from "./Overlay";

class Products extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.randomIndex = this.randomIndex.bind(this);

    this.state = {
      id: "",
      name: "",
      brand: "",
      prices: {},
      gallery: {},
      chars: {},
      index: 0,
      attributes: {},
    };
  }

  randomIndex() {
    return parseInt(Date.now() * Math.random() + Math.random());
  }

  handleAddToCart(e, item) {
    e.preventDefault();
    const chars = {};

    const addItem = () =>
      this.setState(
        {
          id: item.id,
          name: item.name,
          brand: item.brand,
          prices: item.prices,
          gallery: item.gallery,
          chars: chars,
          index: this.randomIndex(),
          attributes: item.attributes,
        },
        () => {
          item.attributes.map((att) => {
            return Object.assign(this.state.chars, {
              [att.name]: att.items[0].value,
            });
          });
          this.props.onAdd(this.state);
        }
      );

    addItem();
  }

  render() {
    const data = this.props.dataValue;

    return (
      <div className="products">
        {data.categories
          .filter((category) => category.name === this.props.category)[0]
          .products.map((product, index) => {
            return (
              <Link
                key={index}
                to={"/products/" + product.id}
                className="product"
                style={(!product.inStock) ? {pointerEvents: "none"} : {}}
              >

                {!product.inStock && <div className="product-overlay"><p>Out of stock</p></div>}

                <div>
                  <div className="home-img-container">
                    <img
                      src={product.gallery[0]}
                      alt=""
                      className="product-img-home"
                    />
                    <button
                      className="empty-cart-btn"
                      onClick={(e) => this.handleAddToCart(e, product)}
                    >
                      <img src={emptyCart} alt="cart" />
                    </button>
                  </div>
                  <h3>{product.name}</h3>
                  {product.prices
                    .filter(
                      (price) => price.currency.label === this.props.currency
                    )
                    .map((price, index) => {
                      return (
                        <label key={index}>
                          <span>{price.currency.symbol}</span>
                          {price.amount}
                        </label>
                      );
                    })}
                </div>
                {this.props.showMessage ? <Alert /> : null}
              </Link>
            );
          })}
      </div>
    );
  }
}

export default Products;
