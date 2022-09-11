import React, { Component } from 'react'
import parse from "html-react-parser";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.toggleActive = this.toggleActive.bind(this);
        this.state = { imageActive: false }
    }

    toggleActive() {
        this.setState(prevState => ({
            imageActive: !prevState.imageActive
        }));
    }

    render() {

        return (
            <div>
                <div>
                    {this.props.gallery.filter((e, i) => i === 0).map((url, index) => {
                        return (
                            <img
                                id={`img-${index}`}
                                src={url}
                                alt="product"
                                key={index}
                                className={`product-img ${this.state.imageActive ? "img-active" : ""}`}
                                onClick={this.toggleActive}
                            />
                        );
                    })}

                    {this.props.gallery.filter((e, i) => i !== 0).map((url, index) => {
                        return (
                            <img
                                id={`img-${index + 1}`}
                                src={url}
                                alt="product"
                                key={index + 1}
                                className={`product-img ${this.state.imageActive ? "img-active" : ""}`}
                                onClick={this.toggleActive}
                            />
                        );
                    })}
                </div>
                <h1>{this.props.name} - {this.props.brand}</h1>
                {parse(this.props.description)}
            </div>
        );
    }
}
