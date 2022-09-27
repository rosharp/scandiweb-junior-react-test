import React, { Component } from "react";
import parse from "html-react-parser";
import Alert from "./Alert";
import ProductImg from "./ProductImg";

class Product extends Component {
  constructor(props) {
    super(props);

    this.toggleActive = this.toggleActive.bind(this);
    this.handleSizeOrCapacity = this.handleSizeOrCapacity.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePorts = this.handlePorts.bind(this);
    this.handleTouchId = this.handleTouchId.bind(this);

    this.state = {
      activeImg: 0,
      id: this.props.id,
      name: this.props.name,
      brand: this.props.brand,
      prices: this.props.prices,
      gallery: this.props.gallery,
      chars: {},
      index: this.randomIndex(),
      item: {},
    };
  }


  randomIndex() {
    return parseInt(Date.now() * Math.random() + Math.random());
  }

  toggleActive(e) {
    this.setState({ activeImg: parseInt(e.target.id) });
  }

  handleSizeOrCapacity(e) {
    this.setState({
      ...this.state,
      chars: { ...this.state.chars, "Size": e.target.value },
    });
  }

  handleColor(e) {
    this.setState({
      ...this.state,
      chars: { ...this.state.chars, "Color": e.target.value },
    });
  }

  handlePorts(e) {
    this.setState({
      ...this.state,
      chars: {
        ...this.state.chars,
        "USB-3 Ports": e.target.value === "Yes" ? "Yes" : "No",
      },
    });
  }

  handleTouchId(e) {
    this.setState({
      ...this.state,
      chars: {
        ...this.state.chars,
        "TouchID": e.target.value === "Yes" ? "Yes" : "No",
      },
    });
  }

  render() {
    return (
      <div className="product-container">
       <ProductImg gallery={this.props.gallery} /> 

        <div className="product-props">
          <h1>{this.props.brand}</h1>
          <h2>{this.props.name}</h2>
          <div className="size-capacity-att">
            <h3>
              {this.props.attributes
                .filter((att) => att.name === "Size" || att.name === "Capacity")
                .map((att) => att.name + ":")}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Size" || att.name === "Capacity")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-size button">
                        <input
                          type="radio"
                          id={att.id}
                          name="size-capacity"
                          value={att.value}
                          onChange={this.handleSizeOrCapacity}
                        />
                        <label htmlFor={att.id}>{att.value}</label>
                      </div>
                    </div>
                  );
                })
              )}
          </div>
          <div className="color-att">
            <h3>
              {this.props.attributes
                .filter((att) => att.name === "Color")
                .map((att) => att.name + ":")}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Color")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars" >
                      <div className="product-color button-clr">
                        <input
                          type="radio"
                          id={att.id}
                          name="color"
                          value={att.value}
                          onChange={this.handleColor}

                        />
                        <label htmlFor={att.id} style={{ backgroundColor: `${att.value}`}}></label>
                          
                      </div>
                    </div>
                  );
                })
              )}
          </div>

          <div className="ports-att">
            <h3>
              {this.props.attributes
                .filter((att) => att.name === "With USB 3 ports")
                .map((att) => att.name + ":")}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "With USB 3 ports")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-usb3 button">
                        <input
                          type="radio"
                          id={att.id}
                          name="usb3"
                          value={att.value}
                          onChange={this.handlePorts}
                        />
                        <label htmlFor={att.id}>{att.value}</label>
                      </div>
                    </div>
                  );
                })
              )}
          </div>

          <div className="touchid-att">
            <h3>
              {this.props.attributes
                .filter((att) => att.name === "Touch ID in keyboard")
                .map((att) => att.name + ":")}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Touch ID in keyboard")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-touchid button">
                        <input
                          type="radio"
                          id={att.id}
                          name="touchid"
                          value={att.value}
                          onChange={this.handleTouchId}
                        />
                        <label htmlFor={att.id}>{att.value}</label>
                      </div>
                    </div>
                  );
                })
              )}
          </div>

          {this.props.prices
            .filter((price) => price.currency.label === this.props.currency)
            .map((price, index) => {
              return (
              <div key={index}>
                <h3>Price:</h3>
                <p key={index} className="price-tag">
                  <span>{price.currency.symbol}</span>
                  {parseFloat(price.amount)}
                </p>
              </div>
              );
            })}



          <button 
            onClick={() => this.setState({ index: this.randomIndex() }) 
              & this.props.onAdd(this.state)} 
            className="button-submit"
          >
            Add To Cart
          </button>

          {parse(this.props.description)}
        </div>
          { this.props.showMessage ? <Alert /> : null }
      </div>
    );
  }
}

export default Product
