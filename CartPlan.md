1. Send cart as props to Product.jsx:
App.jsx => cart, setCart => Product.jsx

2. Return the new cart items from Product.jsx local state back to App.jsx as props:
Product.jsx => this.props.cart = this.state.cart[...items, newItem] => App.jsx 

3. Send the cart items to Cart.jsx component as props
App.jsx => this.state.cart => Cart.jsx 

4. Save the cart to local storage
Cart.jsx => this.props.cart => window.localStorage
