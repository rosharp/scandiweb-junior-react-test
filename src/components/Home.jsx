import React, { Component } from 'react'
import Products from './Products'
import { ProductsContext } from './ProductsContext';

export default class Home extends Component {
    static contextType = ProductsContext

    constructor(props) {
        super(props)
        this.state = { category: "all" };
    }

    render() {
        console.log("home-context:", this.context)

        return (
            <div>
                <h1>{this.props.category}</h1>
                <Products category={this.props.category} />
            </div>
        )
    }
}
