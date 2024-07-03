// src/App.js
import React from 'react'
import './App.css';
import ProductList from './Components/ProductList';
import AddProductForm from './Components/addProductForm';

function App() {
  return (
    <div className="App">
      <h1>CRUD Application with React</h1>
      <AddProductForm fetchProducts={ProductList.fetchProducts} />
      <ProductList />
    </div>
  );
}

export default App;
