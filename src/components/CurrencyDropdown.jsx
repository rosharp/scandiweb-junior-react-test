import React, { Component } from "react";

class CurrencyDropdown extends Component {
  render() {
    const data = this.props.dataValue;
    return (
      <div className="currency-dropdown">
        <button onClick={this.props.toggleCurrency}>$</button>
        {this.props.showCurrencySwitch ? (
          <ul className="currency-dropdown-list">
            {data.categories[0].products[0].prices.map((p, index) => {
              return (
                <li key={index}>
                  {p.currency.symbol}
                  <span onClick={this.props.setCurrency}>
                    {p.currency.label}
                  </span>
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
