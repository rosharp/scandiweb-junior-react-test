import { Component } from 'react'
import ReactDOM from 'react-dom';

class Overlay extends Component {
  render () {
    const modal = document.getElementById("modal");
    return (
      <div className={this.props.trigger ? "overlay" : ""}>{this.props.children}</div>
    ) 
  }
}

export default Overlay; 
