import React, { Component } from "react";
import { Link } from "react-router-dom";
import emptyCart from "../images/empty-cart.svg";
class Products extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.randomIndex = this.randomIndex.bind(this);

    this.state = {
      activeImg: 0,
      name: "",
      brand: "",
      prices: {},
      gallery: {},
      chars: {},
      index: 0,
      item: {},
      qty: 1,
    };
  }

  randomIndex() {
    return parseInt(Date.now() * Math.random() + Math.random());
  }

  handleAddToCart(e, item) {
    e.preventDefault();
    const chars = {};

    item.attributes.map((att) => {
      return Object.assign(this.state.chars, {
        [att.name]: att.items[0].value,
      });
    });

    const addItem = () => this.setState({...this.state, 
        activeImg: 0,
        name: item.name,
        brand: item.brand,
        prices: item.prices,
        gallery: item.gallery,
        chars: chars,
        index: this.randomIndex(),
      });

      addItem();

    if (this.state.name !== "") {
      this.props.onAdd(this.state);
    }
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
              >
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
                      <img src={emptyCart} />
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
                          {price.amount}
                          <span>{price.currency.symbol}</span>
                        </label>
                      );
                    })}
                </div>
              </Link>
            );
          })}
      </div>
    );
  }
}

export default Products;
