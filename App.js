//Shivansh Singh
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=10&page=${page}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="App">
      <h1>Infinite Scroll with React</h1>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
