import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import Minicart from "./Minicart";

import CurrencyDropdown from "./CurrencyDropdown";

class Navbar extends Component {
  static contextType = ProductsContext;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { category: this.props.category };
  }

  handleChange(e) {
    this.context = e.target.innerHTML;
    this.setState(e.target.innerHTML);
  }

  render() {
    const data = this.props.dataValue;

    return (
      <nav>
        {data.categories.map((item, index) => {
          return (
            <ul key={index}>
              <li>
                <Link
                  key={index}
                  to="/"
                  value={item.name}
                  onClick={this.props.setCategory}
                  className={
                    this.props.category === item.name ? "active-nav" : ""
                  }
                >
                  {item.name}
                </Link>
              </li>
            </ul>
          );
        })}

        <ul>
          <li>
            <CurrencyDropdown
              currency={this.props.currency}
              setCurrency={this.props.setCurrency}
              dataValue={this.props.dataValue}
            />
          </li>
          <li>
            <Minicart
              currency={this.props.currency}
              dataValue={this.props.dataValue}
              cart={this.props.cart}
              onAdd={this.props.onAdd}
              onQtyDecrease={this.props.onQtyDecrease}
              onQtyIncrease={this.props.onQtyIncrease}
              onCartItemDelete={this.props.onCartItemDelete}
            />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
