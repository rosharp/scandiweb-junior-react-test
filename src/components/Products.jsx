import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import withQuery from "../apollo/data";
import { ProductsContext } from "./ProductsContext";
class Products extends Component {
    static contextType = ProductsContext

    render() {
        const data = this.props.dataValue;

        return (
            <div className="products" >
                {data.categories.filter(category => category.name === this.props.category)[0].products.map(product => {
                    return (
                        <Link to={"/products/" + product.id}>
                            <div key={product.id} >
                                <img src={product.gallery[0]} alt="" />
                                <h2>{product.name}</h2>
                                {product.prices.filter(price => price.currency.label === this.props.currency).map(price => {
                                    return (
                                        <p>{price.amount}<span>{price.currency.symbol}</span></p>
                                    )
                                })}
                            </div>
                        </Link>

                    );
                })}
            </div>
        );

    }
}

export default withQuery(Products)