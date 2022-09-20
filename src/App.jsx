import React, { Component, PureComponent, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ALL_PRODUCTS } from "./apollo/products";
import { ProductsContext } from "./components/ProductsContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./components/Cart";

export default function App() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);
  const context = useContext(ProductsContext);
  const [category, setCategory] = useState("all");
  const [currency, setCurrency] = useState("USD");
  const [cartItems, setCartItems] = useState([]);

  function handleClick(e) {
    setCategory(e.target.innerHTML);
  }

  function handleCurrency(e) {
    setCurrency(e.target.innerHTML);
  }

  function onAdd(product) {
    const exist = cartItems.find(
      (item) => item.name === product.name && item.chars === product.chars
    );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name && item.chars === product.chars
            ? { ...exist, qty: exist.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  function onQtyIncrease(product) {
    const exist = cartItems.find(
      (item) => item.name === product.name && item.chars === product.chars
    );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name && item.chars === product.chars
            ? { ...exist, qty: exist.qty + 1 }
            : item
        )
      );
    }
  }

  function onQtyDecrease(product) {
    const exist = cartItems.find(
      (item) => item.name === product.name && item.chars === product.chars
    );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.name === product.name && item.chars === product.chars
            ? {
                ...exist,
                qty: exist.qty > 1 ? exist.qty - 1 : 1,
              }
            : item
        )
      );
    }
  }

  function onCartItemDelete(product) {
    setCartItems(
      cartItems.filter((item) => {
        return item.index !== product.index;
      })
    );
  }

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <Router>
      <Navbar
        setCategory={handleClick}
        category={category}
        setCurrency={handleCurrency}
        currency={currency}
      />

      <Routes>
        <Route
          path="/"
          element={<Home category={category} currency={currency} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cartItems}
              onAdd={onAdd}
              currency={currency}
              onQtyDecrease={onQtyDecrease}
              onQtyIncrease={onQtyIncrease}
              onCartItemDelete={onCartItemDelete}
            />
          }
        />

        {data.categories
          .filter((category) => category.name === "all")[0]
          .products.map((product, index) => {
            return (
              <Route
                key={index}
                path={"/products/" + product.id}
                element={
                  <Product
                    name={product.name}
                    brand={product.brand}
                    category={product.category}
                    attributes={product.attributes}
                    description={product.description}
                    gallery={product.gallery}
                    inStock={product.inStock}
                    currency={currency}
                    prices={product.prices}
                    cart={cartItems}
                    onAdd={onAdd}
                  />
                }
              />
            );
          })}
      </Routes>
    </Router>
  );
}
