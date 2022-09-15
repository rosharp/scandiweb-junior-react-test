import React, { Component } from 'react'
import withQuery from "../apollo/data";

class CurrencyDropdown extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showCurrencySwitch: false,
        };
    }

    handleChange() {
        this.setState({ showCurrencySwitch: this.state.showCurrencySwitch ? false : true })
    }

    render() {
        const data = this.props.dataValue;
        return (
            <div>
                <p onClick={this.handleChange}>$</p>
                {this.state.showCurrencySwitch ?
                    (
                        <ul>
                            {data.categories[0].products[0].prices.map((p, index) => {
                                return (
                                    <li key={index}>
                                        {p.currency.symbol}<span onClick={this.props.setCurrency}>{p.currency.label}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : null
                }
            </div>
        )
    }
}

export default withQuery(CurrencyDropdown);
