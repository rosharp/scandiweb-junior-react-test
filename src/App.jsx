import React, { Component, PureComponent, useState, useContext } from "react";
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ALL_PRODUCTS } from "./apollo/products";
import { ProductsContext } from "./components/ProductsContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";

export default function App() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);
  const context = useContext(ProductsContext);
  const [category, setCategory] = useState("all");
  const [currency, setCurrency] = useState("USD");

  function handleClick(e) {
    setCategory(e.target.innerHTML);
  }

  function handleCurrency(e) {
    setCurrency(e.target.innerHTML);
  }

  if (loading) {
    return <h2>Loading</h2>
  }

  if (error) {
    return <h2>Error</h2>
  }

  console.log("app-data:", data)

  return (
    <Router>
      <Navbar
        setCategory={handleClick}
        category={category}
        setCurrency={handleCurrency}
        currency={currency}
      />

      <Routes>
        <Route path="/" element={<Home category={category} currency={currency} />} />

        {data.categories.filter(category => category.name === "all")[0].products.map((product, index) => {
          return (
            <Route
              key={index}
              path={"/products/" + product.id}
              element={
                <Product
                  name={product.name}
                  brand={product.brand}
                  category={product.category}
                  description={product.description}
                  gallery={product.gallery}
                />
              }
            />
          );
        })}
      </Routes>
    </Router>
  )
}
