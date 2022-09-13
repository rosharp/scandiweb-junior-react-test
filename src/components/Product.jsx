import React, { Component } from "react";
import parse from "html-react-parser";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.toggleActive = this.toggleActive.bind(this);
    this.state = {
      activeImg: 0,
    };
  }

  toggleActive(e) {
    this.setState({ activeImg: parseInt(e.target.id) });
  }

//   fetchAtt(char, addChar) {
//     return (
//       <div className={`${char} ${addChar ? "-" + {addChar} : ""}att`}>
//         <h3>
//           {this.props.attributes
//             .filter((att) => att.name === {char})
//             .map((att) => att.name)}
//         </h3>
//         {this.props.attributes
//           .filter((att) => att.name === "Size" || att.name === "Capacity")
//           .map((att) =>
//             att.items.map((att) => {
//               return (
//                 <div key={att.id} className="product-chars">
//                   <div className="product-size">
//                     <input
//                       type="radio"
//                       id={att.id}
//                       name="size-capacity"
//                       value={att.value}
//                     />
//                     <label htmlFor={att.id}>{att.value}</label>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//       </div>
//     );
//   }

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
            {this.props.gallery
              .filter((e, i) => i === this.state.activeImg)
              .map((item, index) => {
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

        <div className="product-props">
          <h1>{this.props.brand}</h1>
          <h2>{this.props.name}</h2>

          <div className="size-capacity-att">
            <h3>
              {this.props.attributes
                .filter((att) => att.name === "Size" || att.name === "Capacity")
                .map((att) => att.name)}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Size" || att.name === "Capacity")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-size">
                        <input
                          type="radio"
                          id={att.id}
                          name="size-capacity"
                          value={att.value}
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
                .map((att) => att.name)}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Color")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-color">
                        <input
                          type="radio"
                          id={att.id}
                          name="color"
                          value={att.value}
                        />
                        <label htmlFor={att.id}>{att.value}</label>
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
                .map((att) => att.name)}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "With USB 3 ports")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-usb3">
                        <input
                          type="radio"
                          id={att.id}
                          name="usb3"
                          value={att.value}
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
                .map((att) => att.name)}
            </h3>
            {this.props.attributes
              .filter((att) => att.name === "Touch ID in keyboard")
              .map((att) =>
                att.items.map((att) => {
                  return (
                    <div key={att.id} className="product-chars">
                      <div className="product-touchid">
                        <input
                          type="radio"
                          id={att.id}
                          name="touchid"
                          value={att.value}
                        />
                        <label htmlFor={att.id}>{att.value}</label>
                      </div>
                    </div>
                  );
                })
              )}
          </div>

          {parse(this.props.description)}
        </div>
      </div>
    );
  }
}
