import { Component } from 'react'

class Overlay extends Component {
  render () {
    return (
      <div onClick={this.props.toggle} className={this.props.trigger ? "overlay" : ""}>{this.props.children}</div>
    ) 
  }
}

export default Overlay; 
