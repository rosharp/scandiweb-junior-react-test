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
                                <p>{product.prices[0].amount}{product.prices[0].currency.label}</p>
                            </div>
                        </Link>

                    );
                })}

                {/* {console.log(data.categories.filter(category => this.props.category === category.name)[0].products)} */}

            </div>
        );

    }
}

export default withQuery(Products)