import React, { Component } from 'react'
import Products from './Products'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Category name</h1>
                <Products />
            </div>
        )
    }
}
