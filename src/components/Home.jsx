import React, { Component } from 'react'
import Products from './Products'
import { ProductsContext } from './ProductsContext';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="category-title">{this.props.category}</h1>
                <Products dataValue={this.props.dataValue} category={this.props.category} currency={this.props.currency} />
            </div>
        )
    }
}
