import React, { Component } from "react";
import { Link } from "react-router-dom";
import Minicart from "./Minicart";
import ClickOutsideWrapper from "./ClickOutsideWrapper";
import aLogo from "../images/a-logo.svg";

import CurrencyDropdown from "./CurrencyDropdown";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { category: this.props.category };
  }

  handleChange(e) {
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

        <img className="a-logo" src={aLogo} alt="a-logo"/>

        <ul className="nav-end">
          <li>
            <ClickOutsideWrapper
              method={this.props.toggleCurrency}
              status={this.props.showCurrencySwitch}
            >
              <CurrencyDropdown
                currency={this.props.currency}
                currencySymbol={this.props.currencySymbol}
                setCurrency={this.props.setCurrency}
                toggleCurrency={this.props.toggleCurrency}
                showCurrencySwitch={this.props.showCurrencySwitch}
                dataValue={this.props.dataValue}
              />
            </ClickOutsideWrapper>
          </li>
          <li>
            <ClickOutsideWrapper
                method={this.props.toggleMinicart}
                status={this.props.showMinicart}
            >
              <Minicart
                currency={this.props.currency}
                currencySymbol={this.props.currencySymbol}
                dataValue={this.props.dataValue}
                cart={this.props.cart}
                showMinicart={this.props.showMinicart}
                toggleMinicart={this.props.toggleMinicart}
                onAdd={this.props.onAdd}
                onQtyDecrease={this.props.onQtyDecrease}
                onQtyIncrease={this.props.onQtyIncrease}
                onCartItemDelete={this.props.onCartItemDelete}
              />
            </ClickOutsideWrapper>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
