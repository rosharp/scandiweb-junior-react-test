import React, { Component, PureComponent } from "react";
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ALL_PRODUCTS } from "./apollo/products";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

export default function App() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  if (loading) {
    return <h2>Loading</h2>
  }

  if (error) {
    return <h2>Error</h2>
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

