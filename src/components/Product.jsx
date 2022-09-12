import React, { Component } from 'react'
import parse from "html-react-parser";
import { isTypeSystemDefinitionNode } from 'graphql';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.toggleActive = this.toggleActive.bind(this);
        this.state = { 
            activeImg: 0,
        }
    }

    toggleActive(e) {
        this.setState({ activeImg: parseInt(e.target.id) });
    }

    render() {

        return (
            <div>
                <div className="product-img-container">
                    <div className="inactive-img-container">
                        {this.props.gallery.map((item, index) => {
                            return (
                                <img
                                    id={index}
                                    src={item}
                                    alt="product"
                                    key={index}
                                    className="product-img img-inactive"
                                    onClick={this.toggleActive}
                                />
                            );
                        })}
                    </div>
                    <div className="active-img-container">
                        {this.props.gallery.filter((e, i) => i === this.state.activeImg).map((item, index) => {
                            return (
                                <img
                                    id={this.state.activeImg}
                                    src={item}
                                    alt="product"
                                    key={index}
                                    className="product-img img-active"
                                    onClick={this.toggleActive}
                                />
                            );
                        })}
                    </div>
                </div>
                 
                <h1>{this.props.name} - {this.props.brand}</h1>
                {parse(this.props.description)}
            </div>
        );
    }
}
