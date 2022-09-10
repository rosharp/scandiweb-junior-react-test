import React, { Component, createContext } from "react";

export const ProductsContext = createContext({
    category: "all",
    setCategory: () => { }
});
