import React, { Component } from "react";
import { Link } from "react-router-dom";
import withQuery from "../apollo/data";
import { ProductsContext } from "./ProductsContext";

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
            <Link
              key={index}
              to="/"
              value={item.name}
              onClick={this.props.setCategory}
            >
              {item.name}
            </Link>
          );
        })}

        <div className="nav-end">
          <CurrencyDropdown
            currency={this.props.currency}
            setCurrency={this.props.setCurrency}
          />
          <Link to="cart">Cart</Link>
        </div>
      </nav>
    );
  }
}

export default withQuery(Navbar);

