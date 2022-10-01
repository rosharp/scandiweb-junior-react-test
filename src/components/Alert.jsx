import { Component } from 'react'

class Alert extends Component {
  render () {
    return (
      <div style={{ 
        position: "fixed", 
        textAlign: "center",
        bottom: ".5rem",
        transform: "translate(-50%, 120%)",
        left: "50%",
        padding: ".7rem 2rem",
        borderRadius: "10px",
        backgroundColor: "#5ece7b",
        color: "#ffffff",
        fontFamily: "Raleway",
        textTransform: "uppercase",
        fontWeight: "400",
        animation: "moveToTop 2000ms",
        zIndex: 9991,
      }}>
          Added item to cart
      </div>
    )
  }
}

export default Alert;
