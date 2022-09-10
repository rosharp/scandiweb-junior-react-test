import React, { Component } from 'react'
import withQuery from "../apollo/data";

class CurrencyDropdown extends Component {
    render() {
        const data = this.props.dataValue;
        return (
            <div>
                <ul>
                    {console.log(data)}
                    {data.categories[0].products[0].prices.map((p, index) => {
                        return (
                            <li key={index}>
                                {p.currency.symbol}<span onClick={this.props.setCurrency}>{p.currency.label}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

export default withQuery(CurrencyDropdown);