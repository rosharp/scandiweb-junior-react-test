import React, { Component } from 'react'
import parse from "html-react-parser";

export default class Product extends Component {

    render() {

        return (
            <div>
                <h1>{this.props.name} - {this.props.brand}</h1>
                {parse(this.props.description)}
            </div>
        );
    }
}
