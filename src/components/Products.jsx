import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import withQuery from "../apollo/data";
import { ProductsContext } from "./ProductsContext";
class Products extends Component {
  static contextType = ProductsContext;

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
                  <img
                    src={product.gallery[0]}
                    alt=""
                    className="product-img-home"
                  />
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

export default withQuery(Products);
