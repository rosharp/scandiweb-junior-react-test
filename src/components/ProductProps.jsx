import { Component } from 'react'

class ProductProps extends Component {
  constructor(props) {
    super(props);

    this.handleSizeOrCapacity = this.handleSizeOrCapacity.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handlePorts = this.handlePorts.bind(this);
    this.handleTouchId = this.handleTouchId.bind(this);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      brand: this.props.brand,
      prices: this.props.prices,
      gallery: this.props.gallery,
      chars: {},
      item: {},
    };
  }

  randomIndex() {
    return parseInt(Date.now() * Math.random() + Math.random());
  }

  handleSizeOrCapacity(e) {
    this.setState({
      ...this.state,
      chars: { ...this.state.chars, Size: e.target.value },
    });
  }

  handleColor(e) {
    this.setState({
      ...this.state,
      chars: { ...this.state.chars, Color: e.target.value },
    });
  }

  handlePorts(e) {
    this.setState({
      ...this.state,
      chars: {
        ...this.state.chars,
        "USB-3 Ports":
          (e.target.name === "usb3") & (e.target.value === "Yes")
            ? "Yes"
            : "No",
      },
    });
  }

  handleTouchId(e) {
    if (e.target.name === "touchid") {
      this.setState({
        ...this.state,
        chars: {
          ...this.state.chars,
          TouchID:
            (e.target.name === "touchid") & (e.target.value === "Yes")
              ? "Yes"
              : "No",
        },
      });
      console.log(e.target);
    }
  }

  render () {
    const atts = this.props.attributes;
    const sizeCapacity = atts.filter((att) => att.name === "Size" || att.name === "Capacity");
    const color = atts.filter((att) => att.name === "Color");
    const ports = atts.filter((att) => att.name === "With USB 3 ports");
    const touchId = atts.filter((att) => att.name === "Touch ID in keyboard");

    return   (
        <div className="product-props">
         <h1>{this.props.brand}</h1>
          <h2>{this.props.name}</h2>
          {
    atts.map((att) => {
      return att.name === "Size" || att.name === "Capacity" ?

        <div className="size-capacity-att">
            <h3>
              {sizeCapacity
                .map((att) => att.name + ":")}
            </h3>
            {sizeCapacity
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

      :  att.name === "Color" ?

        <div className="color-att">
            <h3>
              {color
                .map((att) => att.name + ":")}
            </h3>
            {color
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-color button-clr">
                        <input
                          type="radio"
                          id={att.id}
                          name="color"
                          value={att.value}
                          onChange={this.handleColor}
                        />
                        <label
                          htmlFor={att.id}
                          style={{ backgroundColor: `${att.value}` }}
                        ></label>
                      </div>
                    </div>
                  );
                })
              )}
          </div>

      : att.name === "With USB 3 ports" ?

         <div className="ports-att">
            <h3>
              {ports
                .map((att) => att.name + ":")}
            </h3>
            {ports
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

         : att.name === "Touch ID in keyboard" ?

         <div className="touchid-att">
            <h3>
              {touchId
                .map((att) => att.name + ":")}
            </h3>
            {touchId
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-touchid button">
                        <input
                          type="radio"
                          id="touchid"
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

        : <></>
    })


          }
       {this.props.prices
            .filter((price) => price.currency.label === this.props.currency)
            .map((price, index) => {
              return (
                <div key={index}>
                  <h3>Price:</h3>
                  <p key={index} className="price-tag">
                    <span>{price.currency.symbol}</span>
                    {price.amount}
                  </p>
                </div>
              );
            })}

          <button
            onClick={() =>
              this.setState({ index: this.randomIndex() }) &
              this.props.onAdd(this.state)
            }
            className="button-submit"
          >
            Add To Cart
          </button>
        </div>
   ) 
 
    
  }
}

export default ProductProps; 
