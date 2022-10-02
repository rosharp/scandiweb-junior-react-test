import React, { Component } from "react";
import prev from "../images/prev.svg";
import next from "../images/next.svg";

export default class ImagesSlider extends Component {
  constructor(props) {
    super(props);
    this.handlePrevImg = this.handlePrevImg.bind(this);
    this.handleNextImg = this.handleNextImg.bind(this);
    this.state = {
      images: [],
    };
  }

  handlePrevImg(index, item) {
    let images = [...this.state.images];
    let image = { ...images[index] };
    if (item.gallery[parseInt(Object.values(this.state.images[index])) - 1]) {
      image = parseInt(Object.values(image)) - 1;
    } else {
      image = item.gallery.length - 1;
    }
    images[index] = { imgIndex: image };
    this.setState({ images });
  }

  handleNextImg(index, item) {
    let images = [...this.state.images];
    let image = { ...images[index] };
    if (item.gallery[parseInt(Object.values(this.state.images[index])) + 1]) {
      image = parseInt(Object.values(image)) + 1;
    } else {
      image = 0;
    }
    images[index] = { imgIndex: image };
    this.setState({ images });
  }

  componentWillUnmount() {
    this.setState({ images: [] });
  }

  render() {
    const item = this.props.item;
    const index = this.props.index;

    this.props.cart.forEach((item, index) => {
      this.state.images.push({ imgIndex: 0 });
    });

    return (
      <div className="cart-img-container">
        <img
          className="cart-product-img"
          src={item.gallery[parseInt(Object.values(this.state.images[index]))]}
          alt="product"
        />
        {this.props.sliderButtons && item.gallery.length > 1 ? (
          <div className="cart-img-btn">
            <button onClick={() => this.handlePrevImg(index, item)}>
              <img src={prev} alt="previous" />
            </button>
            <button onClick={() => this.handleNextImg(index, item)}>
              <img src={next} alt="next" />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
