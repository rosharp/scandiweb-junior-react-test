import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: "",
    };
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
        {this.props.cart.map((item, index) => {
          console.log("chars:", item.chars)
          return (
            <div key={index}>
              <div>
                <h2>{item.brand}</h2>
                <h3>{item.name}</h3>
                {Object.keys(item.chars).map((char) => {
                  return (
                    <div>
                      {
                        char === "color"
                        ? <p>Color: {char}</p>
                        : char === "sizeCapacity"
                        ? <p>Capacity/Size: {char}</p>
                        : char === "ports"
                        ? <p>Ports: {char}</p> 
                        : char === "touchId"
                        ? <p>TouchID: {char}</p>
                        : <p>Some other char: {char}</p>
                      }
                    </div>
                  );
                })}
              </div>
              <div>
                <p>{item.qty}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
