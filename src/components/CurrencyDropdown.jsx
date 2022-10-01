import React, { Component } from "react";
import toggleArrow from "../images/toggleArrow.svg";

class CurrencyDropdown extends Component {
  render() {
    const data = this.props.dataValue;
    return (
      <div className="currency-dropdown">
        <button onClick={this.props.toggleCurrency} className="currency-button">
          <span style={{ fontSize: "18px" }}>{this.props.currencySymbol}</span>
          <img
            className={
              this.props.showCurrencySwitch
                ? "toggleArrow img-reversed"
                : "toggleArrow"
            }
            src={toggleArrow}
            alt="toggle-arrow"
          />
        </button>
        {this.props.showCurrencySwitch ? (
          <ul className="currency-dropdown-list">
            {data.categories[0].products[0].prices.map((p, index) => {
              return (
                <li
                  key={index}
                  onClick={() =>
                    this.props.setCurrency(p.currency.label, p.currency.symbol) &
                    this.props.toggleCurrency()
                  }
                >
                  {p.currency.symbol}
                  <span>{p.currency.label}</span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default CurrencyDropdown;
