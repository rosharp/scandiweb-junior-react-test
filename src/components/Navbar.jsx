import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <ul key={index}>
              <li>
                <Link
                  key={index}
                  to="/"
                  value={item.name}
                  onClick={this.props.setCategory}
                  className={this.props.category === item.name ? "active-nav" : ""}
                >
                  {item.name}
                </Link>
              </li>
            </ul>
          );
        })}

        <div className="nav-end">
          <CurrencyDropdown
            currency={this.props.currency}
            setCurrency={this.props.setCurrency}
            dataValue={this.props.dataValue}
          />
          <Link to="cart">Cart</Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;

