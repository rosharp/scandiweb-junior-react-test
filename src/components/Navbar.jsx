import React, { Component } from "react";
import { Link } from 'react-router-dom'
import withQuery from "../apollo/data";
import { ProductsContext } from "./ProductsContext";

class Navbar extends Component {

    static contextType = ProductsContext

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { category: this.props.category };
    }

    handleChange(e) {
        this.context = e.target.innerHTML;
        this.setState(e.target.innerHTML);
    }

    render() {
        const data = this.props.dataValue;
        const category = this.state.category;

        return (
            <nav>
                <p>{this.props.category}</p>
                {data.categories.map((item, index) => {
                    return (
                        <Link key={index} to="/" value={item.name} onClick={this.props.setCategory}>{item.name}</Link>
                    )
                })}
            </nav>


        );
    }
}

export default withQuery(Navbar);