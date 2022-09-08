import React, { Component } from "react";
import withQuery from "../apollo/data";
class Products extends Component {
    render() {
        const data = this.props.dataValue;
        return (
            <div className="products" >
                {data.categories[0].products.map((product) => {
                    return (
                        <div key={product.id} >
                            <img src={product.gallery[0]} alt="" />
                            <h2>{product.name}</h2>
                            <p>{product.prices[0].amount}{product.prices[0].currency.label}</p>
                        </div>
                    )
                })}
            </div>
        );

    }
}

export default withQuery(Products)