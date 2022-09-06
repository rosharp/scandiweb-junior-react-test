import React, { Component, PureComponent } from "react";
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from "./appolo/products";

export default function App() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  if (loading) {
    return <h2>Loading</h2>
  }

  if (error) {
    return <h2>Error</h2>
  }

  console.log(data.categories[0].products)

  return (
    <div>
      {data.categories[0].products.map((product) => {
        return (
          <div key={product.id}>
            <img src={product.gallery[0]} alt="" />
            <h2>{product.name}</h2>
            <p>{product.prices[0].amount}{product.prices[0].currency.label}</p>

          </div>
        )
      })}
    </div>
  );
}

